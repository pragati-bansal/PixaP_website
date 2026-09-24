import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Send, Sparkles } from 'lucide-react';

const serviceList = [
  'Website Development',
  'UI/UX Design',
  'Landing Pages',
  'Custom Projects'
];

const budgetRanges = [
  '< $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+'
];

export default function ProjectModal({ isOpen, onClose, preselectedService }) {
  const [services, setServices] = useState([]);
  const [budget, setBudget] = useState('$2,500 - $5,000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService && !services.includes(preselectedService)) {
      setServices([preselectedService]);
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleService = (item) => {
    if (services.includes(item)) {
      setServices(services.filter((s) => s !== item));
    } else {
      setServices([...services, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setDetails('');
    setServices([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div className="modal-header">
              <span className="label" style={{ color: 'var(--accent)' }}>Start a conversation</span>
              <h3 style={{ marginTop: '6px' }}>Let's build something unforgettable.</h3>
              <p>Tell us a bit about your vision and what you're looking to create.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Select Services Needed</label>
                <div className="service-selector">
                  {serviceList.map((srv) => {
                    const isSelected = services.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        className={`service-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleService(srv)}
                      >
                        <span>{srv}</span>
                        {isSelected && <CheckCircle2 size={16} color="var(--accent)" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Budget</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {budgetRanges.map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`service-option ${budget === b ? 'selected' : ''}`}
                      style={{ fontSize: '12px', padding: '8px 10px', justifyContent: 'center' }}
                      onClick={() => setBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="details">Project Details / Goals</label>
                <textarea
                  id="details"
                  rows={3}
                  placeholder="Share a link or short summary of what you want to achieve..."
                  className="form-textarea"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                className="pill pill-accent" 
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              >
                <span>Send Project Request</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className="modal-success-state">
            <div className="modal-success-icon">
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '26px', color: '#fff', marginBottom: '8px' }}>
              We received your message, {name || 'friend'}!
            </h3>
            <p style={{ color: 'var(--mute-d)', maxWidth: '400px', margin: '0 auto 28px' }}>
              We're reviewing your project inquiry and will reach out to <strong>{email}</strong> within 24 business hours with initial thoughts and next steps.
            </p>
            <button className="pill pill-solid" onClick={resetForm}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
