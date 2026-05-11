import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Import Custom Social Logos
import githubLogo from '../assets/social/github.png';
import whatsappLogo from '../assets/social/whatsapp.jpg';
import facebookLogo from '../assets/social/facebook.jpg';
import linkedinLogo from '../assets/social/linkedin.jpg';

// ─── EmailJS Config ────────────────────────────────────────────
// Replace these 3 values after setting up EmailJS (instructions below)
const EMAILJS_SERVICE_ID  = 'service_kna0y59';
const EMAILJS_TEMPLATE_ID = 'template_tzcqb0f';
const EMAILJS_PUBLIC_KEY  = 'VQeHfPmW3fp9qFo1j';
// ───────────────────────────────────────────────────────────────

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message too short (min 10 chars)';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.9rem 1.2rem',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${errors[field] ? 'rgba(255,80,80,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    marginBottom: errors[field] ? '0.3rem' : '1.2rem',
  });

  return (
    <section id="contact" className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', justifyContent: 'center' }}>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', maxWidth: '100px' }}></div>
            <h2 style={{ margin: 0, textAlign: 'center', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              <span className="mono-text" style={{ fontSize: '1rem', marginRight: '0.5rem', display: 'block', color: 'var(--primary)' }}>08. What's Next?</span>
              Get In Touch
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', maxWidth: '100px' }}></div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '4rem' }}>
            {/* Left — Contact Info */}
            <div>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                I'm currently looking for new opportunities to apply my cybersecurity skills and contribute to innovative projects.
                Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,255,157,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <Mail color="var(--primary)" size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 2px 0' }}>Email</h4>
                    <a href="mailto:10nilupulthisaranga@gmail.com" style={{ color: 'var(--text-main)' }}>10nilupulthisaranga@gmail.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,255,157,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <Phone color="var(--primary)" size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 2px 0' }}>Phone</h4>
                    <p style={{ margin: 0, color: 'var(--text-main)' }}>+94 716840617 / +94 769221311</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,255,157,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <MapPin color="var(--primary)" size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 2px 0' }}>Location</h4>
                    <p style={{ margin: 0, color: 'var(--text-main)' }}>Rathnapura, Sri Lanka</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://github.com/N3Edirisinghe" target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub">
                  <img src={githubLogo} alt="GitHub" style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'invert(1)' }} />
                </a>
                <a href="https://www.linkedin.com/in/nilupul-thisaranga-edirisinghe" target="_blank" rel="noreferrer" className="social-icon-btn" title="LinkedIn">
                  <img src={linkedinLogo} alt="LinkedIn" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '4px' }} />
                </a>
                <a href="https://api.whatsapp.com/send?phone=94716840617" target="_blank" rel="noreferrer" className="social-icon-btn" title="WhatsApp">
                  <img src={whatsappLogo} alt="WhatsApp" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '4px' }} />
                </a>
                <a href="https://www.facebook.com/share/18QtuaXwMU/" target="_blank" rel="noreferrer" className="social-icon-btn" title="Facebook">
                  <img src={facebookLogo} alt="Facebook" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '50%' }} />
                </a>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="glass-panel">
              <h3 style={{ marginBottom: '1.5rem' }}>Send a Message</h3>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '3rem 1rem', textAlign: 'center' }}
                  >
                    <CheckCircle size={56} color="var(--primary)" />
                    <h4 style={{ color: 'var(--primary)', margin: 0 }}>Message Sent!</h4>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Thanks for reaching out. I'll get back to you as soon as possible!</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '3rem 1rem', textAlign: 'center' }}
                  >
                    <AlertCircle size={56} color="#ff5050" />
                    <h4 style={{ color: '#ff5050', margin: 0 }}>Something went wrong</h4>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Please try again or email me directly.</p>
                  </motion.div>
                )}

                {(status === 'idle' || status === 'sending') && (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    {/* Name */}
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle('name')}
                      disabled={status === 'sending'}
                    />
                    {errors.name && <p style={{ color: '#ff5050', fontSize: '0.8rem', marginBottom: '1rem', marginTop: '-0.2rem' }}>{errors.name}</p>}

                    {/* Email */}
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle('email')}
                      disabled={status === 'sending'}
                    />
                    {errors.email && <p style={{ color: '#ff5050', fontSize: '0.8rem', marginBottom: '1rem', marginTop: '-0.2rem' }}>{errors.email}</p>}

                    {/* Message */}
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '130px' }}
                      disabled={status === 'sending'}
                    />
                    {errors.message && <p style={{ color: '#ff5050', fontSize: '0.8rem', marginBottom: '1rem', marginTop: '-0.2rem' }}>{errors.message}</p>}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center', gap: '10px', fontSize: '1rem', padding: '1rem' }}
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
