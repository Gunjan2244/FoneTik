import React from 'react';

const features = [
    {
        title: "Expert Technicians",
        description: "Certified professionals with years of experience in mobile repair."
    },
    {
        title: "Genuine Parts",
        description: "We use only high-quality, original parts for all repairs."
    },
    {
        title: "90-Day Warranty",
        description: "Peace of mind with our comprehensive warranty on all services."
    },
    {
        title: "Same Day Service",
        description: "Most repairs are completed within hours, not days."
    }
];

const Features = () => {
    return (
        <section id="features" className="section" style={{ backgroundColor: 'white' }}>
            <div className="container">
                <div className="text-center mb-md">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose Us</h2>
                    <p style={{ color: 'var(--color-text-light)' }}>We provide the best service in the industry.</p>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {features.map((feature, index) => (
                        <div key={index} style={{
                            padding: '2rem',
                            borderRadius: 'var(--border-radius)',
                            border: '1px solid var(--color-border)',
                            transition: 'var(--transition)'
                        }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
