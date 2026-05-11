import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, ExternalLink, BookOpen, Microscope,
  ChevronDown, ChevronUp, Tag, Clock, Sparkles
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
//  ✏️  HOW TO ADD A PUBLICATION
//  When you publish a paper, add an object to this array below.
//  The "Coming Soon" screen will automatically disappear once there
//  is at least one entry here.
//
//  Required fields:
//    id        – unique number
//    type      – e.g. 'Journal Article' | 'Conference Paper' | 'Preprint'
//    title     – full paper title
//    venue     – journal / conference name + year
//    year      – publication year  (number)
//    abstract  – short abstract text
//    tags      – array of keyword strings
//    doi       – DOI string or null  (e.g. '10.1234/example')
//    link      – full URL or null  (Google Scholar / publisher page)
//    citations – number (0 if brand new)
// ═══════════════════════════════════════════════════════════════════
const publications = [
  // ── Add your published paper here when ready ─────────────────────
  // Example:
  // {
  //   id: 1,
  //   type: 'Conference Paper',          // 'Journal Article' | 'Conference Paper' | 'Preprint' | 'Technical Report'
  //   title: 'Your Paper Title',
  //   venue: 'Conference / Journal Name, Year',
  //   year: 2026,
  //   abstract: 'Your abstract here...',
  //   tags: ['Tag1', 'Tag2'],
  //   doi: null,                          // e.g. '10.1234/example' or null
  //   link: 'https://scholar.google.com/your-paper-link',
  //   citations: 0,
  // },
];

// ── Your Google Scholar profile URL ─────────────────────────────
const GOOGLE_SCHOLAR_URL = 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=jkx5VTgAAAAJ';

// ── Research interests shown in the "coming soon" state ──────────
const researchInterests = [
  { label: 'Cybersecurity', icon: '🔒' },
  { label: 'Network Security', icon: '🌐' },
  { label: 'Web Security', icon: '🛡️' },
  { label: 'Ethical Hacking', icon: '💻' },
  { label: 'Machine Learning', icon: '🤖' },
];

// ─────────────────────────────────────────────────────────────────

const typeColors = {
  'Conference Paper':  { color: 'var(--primary)',  bg: 'rgba(0,255,157,0.08)'  },
  'Journal Article':   { color: 'var(--secondary)', bg: 'rgba(0,229,255,0.08)' },
  'Preprint':          { color: '#ffd166',          bg: 'rgba(255,209,102,0.08)'},
  'Technical Report':  { color: '#b983ff',          bg: 'rgba(185,131,255,0.08)'},
};

const PubCard = ({ pub, index }) => {
  const [open, setOpen] = useState(false);
  const tc = typeColors[pub.type] ?? { color: 'var(--primary)', bg: 'rgba(0,255,157,0.08)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.6rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        marginBottom: '1.2rem',
      }}
      whileHover={{ borderColor: tc.color, boxShadow: `0 8px 32px -8px ${tc.color}44` }}
    >
      {/* accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${tc.color}, transparent)`, opacity: 0.7 }} />

      {/* badges row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: tc.color, background: tc.bg, border: `1px solid ${tc.color}44`, borderRadius: '6px', padding: '3px 10px' }}>{pub.type}</span>
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '3px 10px' }}>{pub.year}</span>
          {pub.citations > 0 && (
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#ffd166', background: 'rgba(255,209,102,0.08)', border: '1px solid rgba(255,209,102,0.25)', borderRadius: '6px', padding: '3px 10px' }}>
              {pub.citations} citations
            </span>
          )}
        </div>
        {pub.link && (
          <a href={pub.link} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: tc.color, fontFamily: 'var(--font-mono)', textDecoration: 'none', opacity: 0.85 }}>
            <ExternalLink size={12} /> View Paper
          </a>
        )}
      </div>

      {/* title */}
      <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.45 }}>{pub.title}</h4>

      {/* venue */}
      <p style={{ fontSize: '0.78rem', color: tc.color, fontFamily: 'var(--font-mono)', marginBottom: '0.9rem', opacity: 0.85 }}>{pub.venue}</p>

      {/* DOI */}
      {pub.doi && (
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.9rem' }}>
          DOI: <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>{pub.doi}</a>
        </p>
      )}

      {/* tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '0.9rem' }}>
        {pub.tags.map(t => (
          <span key={t} style={{ fontSize: '0.68rem', padding: '2px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <Tag size={9} style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }} />{t}
          </span>
        ))}
      </div>

      {/* abstract toggle */}
      <button onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: tc.color, fontSize: '0.78rem', fontFamily: 'var(--font-mono)', cursor: 'none', padding: 0 }}>
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        {open ? 'Hide Abstract' : 'Read Abstract'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <div style={{ marginTop: '0.9rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', borderLeft: `3px solid ${tc.color}` }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.75 }}>{pub.abstract}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Coming Soon Screen ───────────────────────────────────────────
const ComingSoon = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{
      textAlign: 'center',
      padding: '6rem 2rem',
      background: 'rgba(255, 255, 255, 0.01)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.03)',
      borderRadius: '40px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* animated border glow */}
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '20px',
      background: 'linear-gradient(135deg, rgba(0,255,157,0.04), rgba(0,229,255,0.04))',
      pointerEvents: 'none',
    }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), var(--secondary), transparent)', opacity: 0.6 }} />

    {/* icon */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.2)', marginBottom: '1.5rem' }}
    >
      <Microscope size={36} color="var(--primary)" />
    </motion.div>

    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.8rem' }}>
      Research Underway
    </h3>
    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
      I'm currently working on my research in cybersecurity. Publications will appear here automatically once they go live — linked directly from Google Scholar.
    </p>

    {/* status badge */}
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,209,102,0.08)', border: '1px solid rgba(255,209,102,0.3)', borderRadius: '20px', padding: '8px 18px', marginBottom: '2.5rem' }}>
      <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
        <Clock size={14} color="#ffd166" />
      </motion.div>
      <span style={{ fontSize: '0.82rem', color: '#ffd166', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
        First publication expected 2027
      </span>
    </div>

    {/* Research interests */}
    <div style={{ marginBottom: '4rem' }}>
      <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>Active Protocols</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {researchInterests.map((ri, i) => (
          <motion.div
            key={ri.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '100px', padding: '10px 20px',
            }}
          >
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{ri.icon}</span>
            <span style={{ fontSize: '0.85rem', color: '#fff', opacity: 0.8 }}>{ri.label}</span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Google Scholar CTA */}
    <a
      href={GOOGLE_SCHOLAR_URL}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '0.75rem 1.8rem',
        background: 'rgba(0,255,157,0.08)',
        border: '1px solid rgba(0,255,157,0.3)',
        borderRadius: '10px',
        color: 'var(--primary)',
        fontSize: '0.9rem',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,157,0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,157,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,157,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <BookOpen size={18} />
      View Google Scholar Profile
      <ExternalLink size={14} />
    </a>
  </motion.div>
);

// ─── Main Section ────────────────────────────────────────────────
const Research = () => {
  const hasPublications = publications.length > 0;

  return (
    <section id="research" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '1rem', opacity: 0.5 }}>06.</span>
              Intellectual <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Inquiry</span>
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>

            {/* Google Scholar link pill — always visible */}
            <a
              href={GOOGLE_SCHOLAR_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(0,229,255,0.07)',
                border: '1px solid rgba(0,229,255,0.25)',
                borderRadius: '20px',
                padding: '5px 14px',
                color: 'var(--secondary)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,229,255,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,229,255,0.07)'}
            >
              <Sparkles size={12} />
              Google Scholar
              <ExternalLink size={10} />
            </a>
          </div>

          {/* Publication count pills — only shown when papers exist */}
          {hasPublications && (
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {[
                { v: publications.length, l: 'Total Papers', c: 'var(--primary)' },
                { v: publications.filter(p => p.citations > 0).reduce((a, p) => a + p.citations, 0), l: 'Total Citations', c: 'var(--secondary)' },
              ].map(s => (
                <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '5px 12px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: s.c, fontFamily: 'var(--font-display)' }}>{s.v}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.l}</span>
                </div>
              ))}
            </div>
          )}

          {/* Conditional render: papers list OR coming soon */}
          {hasPublications ? (
            <div>
              {publications.map((pub, i) => <PubCard key={pub.id} pub={pub} index={i} />)}
            </div>
          ) : (
            <ComingSoon />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
