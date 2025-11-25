import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        alert('Thank you for contacting us! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page" style={{ padding: '4rem 0', backgroundColor: 'var(--color-background)' }}>
            <div className="container">
                <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: '800' }}>Get in Touch</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Send us a Message</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                            ></textarea>
                            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', cursor: 'pointer' }}>Send Message</button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info-section">
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Other Ways to Connect</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* Phone */}
                            <div className="contact-method">
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Call Us</h3>
                                <p style={{ color: '#666', marginBottom: '0.5rem' }}>Speak directly to our support team.</p>
                                <a href="tel:+1234567890" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem'
                                }}>
                                    📞 +1 (234) 567-890
                                </a>
                            </div>

                            {/* WhatsApp */}
                            <div className="contact-method">
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>WhatsApp</h3>
                                <p style={{ color: '#666', marginBottom: '0.5rem' }}>Chat with us on WhatsApp for quick queries.</p>
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#25D366',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem'
                                }}>
                                    💬 Chat on WhatsApp
                                </a>
                            </div>

                            {/* Email List */}
                            <div className="contact-method">
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Email Us</h3>
                                <p style={{ color: '#666', marginBottom: '0.5rem' }}>For specific inquiries, reach out to:</p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '0.5rem' }}>
                                        <strong>Support:</strong> <a href="mailto:support@fonetik.com" style={{ color: 'var(--color-primary)' }}>support@fonetik.com</a>
                                    </li>
                                    <li style={{ marginBottom: '0.5rem' }}>
                                        <strong>Sales:</strong> <a href="mailto:sales@fonetik.com" style={{ color: 'var(--color-primary)' }}>sales@fonetik.com</a>
                                    </li>
                                    <li>
                                        <strong>General:</strong> <a href="mailto:info@fonetik.com" style={{ color: 'var(--color-primary)' }}>info@fonetik.com</a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
