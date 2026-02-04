function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1f2937' }}>
                Next Gen Insurance Management
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
                Manage your policies, track claims, and get notified instantly.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem' }}>
                <div className="card" style={{ width: '300px' }}>
                    <h3>Fast Policies</h3>
                    <p>Get insured in minutes with our streamlined process.</p>
                </div>
                <div className="card" style={{ width: '300px' }}>
                    <h3>Easy Claims</h3>
                    <p>Submit and track claims with total transparency.</p>
                </div>
                <div className="card" style={{ width: '300px' }}>
                    <h3>24/7 Support</h3>
                    <p>We are here to help you whenever you need us.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
