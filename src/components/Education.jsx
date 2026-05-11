import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, GraduationCap, ShieldCheck, ExternalLink, Loader2 } from 'lucide-react';

const CREDLY_USERNAME = 'e-a-n-t-edirisinghe';
const CREDLY_PROFILE = `https://www.credly.com/users/${CREDLY_USERNAME}`;
const CREDLY_DIRECT = `https://www.credly.com/users/${CREDLY_USERNAME}/badges.json`;

// Multiple CORS proxies tried in order — first one that works wins
const PROXY_ENDPOINTS = [
  `https://api.allorigins.win/raw?url=${encodeURIComponent(CREDLY_DIRECT)}`,
  `https://corsproxy.io/?url=${encodeURIComponent(CREDLY_DIRECT)}`,
  `https://thingproxy.freeboard.io/fetch/${CREDLY_DIRECT}`,
  `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(CREDLY_DIRECT)}`,
];

// Color palette for badges — cycles through these for visual variety
const BADGE_COLORS = ['#00b373', '#00c8e0', '#ff6b6b', '#a78bfa', '#f59e0b', '#ec4899', '#14b8a6'];

// Fallback badges — kept in sync with the live Credly profile
const FALLBACK_BADGES = [
  {
    id: '4c5f4295-59e1-416a-b9ce-83f59bba1ab5',
    name: 'Introduction to the Threat Landscape 3.0',
    issuer: 'Fortinet',
    issued: 'May 10, 2026',
    expires: null,
    image: 'https://images.credly.com/images/a06a4e98-21bf-49ab-ad70-c61641f26fc8/blob',
    color: '#f59e0b',
    link: 'https://www.credly.com/badges/4c5f4295-59e1-416a-b9ce-83f59bba1ab5',
  },
  {
    id: '41dc9f93-867b-40a6-9a8f-889ed57496a4',
    name: 'ISC2 Candidate',
    issuer: 'ISC2',
    issued: 'Apr 15, 2026',
    expires: 'Apr 30, 2027',
    image: 'https://images.credly.com/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png',
    color: '#00c8e0',
    link: 'https://www.credly.com/badges/41dc9f93-867b-40a6-9a8f-889ed57496a4',
  },
  {
    id: '01a4a519-2ee8-40d0-aa73-9f764b78b910',
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    issued: 'Nov 2, 2024',
    expires: null,
    image: 'https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
    color: '#00b373',
    link: 'https://www.credly.com/badges/01a4a519-2ee8-40d0-aa73-9f764b78b910',
  },
];

/** Format ISO date string (e.g. "2024-11-02") to readable format (e.g. "Nov 2, 2024") */
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/** Transform Credly API badge object → our internal badge shape. */
const transformBadge = (raw, index) => {
  // Prefer entities[0].entity.name → gives clean "Cisco", "ISC2" etc.
  // Fall back to summary only if entities is missing
  const issuer =
    raw.issuer?.entities?.[0]?.entity?.name ||
    raw.badge_template?.issuer?.entities?.[0]?.entity?.name ||
    raw.badge_template?.issuer?.name ||
    'Unknown';

  // Image URL: prefer direct, fall back to template
  const image =
    raw.image?.url ||
    raw.image_url ||
    raw.badge_template?.image?.url ||
    raw.badge_template?.image_url;

  // Map specific brands to their colors so they don't randomly get red/pink
  const getBrandColor = (issuerName, i) => {
    const name = issuerName.toLowerCase();
    if (name.includes('cisco')) return '#00b373';    // Cisco Green
    if (name.includes('isc2')) return '#00c8e0';     // ISC2 Cyan
    if (name.includes('fortinet')) return '#f59e0b'; // Fortinet Orange
    return BADGE_COLORS[i % BADGE_COLORS.length];
  };

  return {
    id: raw.id,
    name: raw.badge_template?.name || raw.name || 'Badge',
    issuer,
    issued: formatDate(raw.issued_at_date || raw.issued_at),
    expires: formatDate(raw.expires_at_date || raw.expires_at),
    image,
    color: getBrandColor(issuer, index),
    link: raw.public_url || `https://www.credly.com/badges/${raw.id}`,
  };
};

/** Custom hook: fetch live badges from Credly via multiple CORS proxies.
 *  Falls back to hardcoded data only when every proxy fails. */
const useCredlyBadges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('loading'); // 'api' | 'fallback'

  useEffect(() => {
    let cancelled = false;

    /** Fetch with a hard 6-second timeout so dead proxies don't block forever */
    const fetchWithTimeout = (url, ms = 6000) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), ms);
      return fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      }).finally(() => clearTimeout(timer));
    };

    const fetchBadges = async () => {
      // Try every proxy in order; stop as soon as one returns valid badge data
      for (const url of PROXY_ENDPOINTS) {
        try {
          const res = await fetchWithTimeout(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          const json = JSON.parse(text);
          if (cancelled) return;

          // allorigins wraps the real response in { contents: '...' }
          const payload = json.contents ? JSON.parse(json.contents) : json;
          const transformed = (payload.data || []).map(transformBadge);

          if (transformed.length > 0) {
            setBadges(transformed);
            setSource('api');
            setLoading(false);
            return; // ✅ success
          }
        } catch {
          // this proxy failed — try the next one
        }
      }

      // Every proxy failed → show fallback badges
      if (!cancelled) {
        setBadges(FALLBACK_BADGES);
        setSource('fallback');
        setLoading(false);
      }
    };

    fetchBadges();
    return () => { cancelled = true; };
  }, []);

  return { badges, loading, source };
};

const Education = () => {
  const { badges, loading, source } = useCredlyBadges();

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ margin: 0 }}>
              <span className="mono-text" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>07.</span>
              Education &amp; Activity
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', maxWidth: '300px' }}></div>
          </div>

          <div className="grid grid-cols-2">
            {/* Academic Background */}
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                <GraduationCap color="var(--primary)" /> Academic Background
              </h3>

              <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '2rem', position: 'relative' }}>
                <div style={{ position: 'relative', marginBottom: '3rem' }}>
                  <div style={{ position: 'absolute', left: '-2.5rem', top: '0', width: '1rem', height: '1rem', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>BSc (Hons) in Cybersecurity</h4>
                  <p className="mono-text" style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>SLTC Research University | 2023 - 2027</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Focused on advanced network security protocols, secure software engineering, and proactive threat modeling.</p>

                  <div style={{ marginBottom: '1rem' }}>
                    <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>CORE ACADEMIC MODULES:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['Cyber Security Domains & Tools','Cyber Law, Regulations & Policies','Network Security','Advanced Cryptography','Digital Forensics','Ethical Hacking','Intelligent Threat Management','Blockchain & Applications'].map(m => (
                        <span key={m} className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>{m}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', padding: '4px 10px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 600 }}>RESEARCH INTEREST:</span>
                    <span style={{ fontSize: '0.75rem', color: '#fff' }}>Automated Threat Detection in IoT</span>
                  </div>
                </div>

                <div style={{ position: 'relative', marginBottom: '3rem' }}>
                  <div style={{ position: 'absolute', left: '-2.5rem', top: '0', width: '1rem', height: '1rem', background: 'var(--border-color)', borderRadius: '50%' }}></div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>NVQ Level 4 Computer Technician Course</h4>
                  <p className="mono-text" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>National Vocational Qualification | Awaiting Results</p>
                  <p style={{ fontSize: '0.9rem' }}>Gained hands-on expertise in computer hardware troubleshooting, network configuration, operating system deployment, and IT infrastructure maintenance.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.5rem', top: '0', width: '1rem', height: '1rem', background: 'var(--border-color)', borderRadius: '50%' }}></div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>G.C.E A/L Examination</h4>
                  <p className="mono-text" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Passed with 3S in Technology Stream | 2022</p>
                  <p style={{ fontSize: '0.9rem' }}>Specialized in ICT, Engineering Technology, and Science for Technology.</p>
                </div>
              </div>
            </div>

            {/* Certifications & Events */}
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                <Award color="var(--secondary)" /> Certifications &amp; Events
              </h3>

              <div className="glass-panel" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Courses &amp; Certifications</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[
                    'Introduction to Cybersecurity - (Cisco Networking Academy)',
                    'Introduction to Cybersecurity Awareness - (Hp Life)',
                    'Data Science & Analytics - (Hp Life)',
                    'Fundamentals of Digital Marketing - (Google Digital Garage)',
                  ].map(c => (
                    <li key={c} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <BookOpen size={16} color="var(--primary)" style={{ marginTop: '4px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem' }}>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Event Participation</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--secondary)' }}>▹</span><span style={{ fontSize: '0.9rem' }}>Participated for Cybercon Workshop (2024) at SLTC premises</span></li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--secondary)' }}>▹</span><span style={{ fontSize: '0.9rem' }}>Participated for CodeMania 5.0 (2025) at SLTC premises</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── Earned Badges (Auto-fetched from Credly) ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginTop: '3rem' }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <ShieldCheck color="var(--primary)" /> Earned Badges
              {/* Live data indicator */}
              {!loading && source === 'api' && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
                  color: '#00ff9d', background: 'rgba(0,255,157,0.08)',
                  border: '1px solid rgba(0,255,157,0.25)', borderRadius: '20px',
                  padding: '3px 10px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff9d', animation: 'pulse 2s infinite' }} />
                  LIVE FROM CREDLY
                </span>
              )}
              <a
                href={CREDLY_PROFILE}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '0.75rem', color: 'var(--secondary)', fontFamily: 'var(--font-mono)',
                  textDecoration: 'none', background: 'rgba(0,229,255,0.07)',
                  border: '1px solid rgba(0,229,255,0.25)', borderRadius: '20px', padding: '4px 12px',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,229,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,229,255,0.07)'}
              >
                <ExternalLink size={11} /> View on Credly
              </a>
            </h3>

            {/* Loading skeleton */}
            {loading && (
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[1, 2].map(k => (
                  <div key={k} style={{
                    flex: '1 1 280px', maxWidth: '380px', height: '120px',
                    background: 'var(--bg-card)', borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Loader2 size={24} color="var(--text-muted)" style={{ animation: 'spin 1s linear infinite' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Badge cards */}
            {!loading && (
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {badges.map((badge, i) => (
                  <motion.a
                    key={badge.id}
                    href={badge.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -4, boxShadow: `0 12px 32px -8px ${badge.color}55` }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1.2rem',
                      background: 'var(--bg-card)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: `1px solid ${badge.color}33`,
                      borderRadius: '16px',
                      padding: '1.2rem 1.6rem',
                      textDecoration: 'none',
                      flex: '1 1 260px',
                      maxWidth: '420px',
                      cursor: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    {/* top accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${badge.color}, transparent)`, opacity: 0.7 }} />

                    {/* badge image */}
                    <img
                      src={badge.image}
                      alt={badge.name}
                      style={{ width: '72px', height: '72px', objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />

                    {/* info */}
                    <div>
                      <p style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: badge.color, marginBottom: '0.3rem', letterSpacing: '0.05em' }}>
                        {badge.issuer.toUpperCase()}
                      </p>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: 1.35 }}>
                        {badge.name}
                      </h4>
                      <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                        {badge.issued ? <span style={{ display: 'block' }}>Issued: {badge.issued}</span> : null}
                        {badge.expires ? <span style={{ display: 'block' }}>Expires: {badge.expires}</span> : null}
                      </p>
                    </div>

                    {/* verified chip */}
                    <div style={{
                      position: 'absolute', top: '0.8rem', right: '0.8rem',
                      display: 'flex', alignItems: 'center', gap: '4px',
                      background: 'rgba(0,255,157,0.12)', border: '1px solid rgba(0,255,157,0.4)',
                      borderRadius: '20px', padding: '2px 8px',
                    }}>
                      <ShieldCheck size={10} color="#00ff9d" />
                      <span style={{ fontSize: '0.62rem', color: '#00ff9d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>VERIFIED</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
