import { useState, useEffect } from 'react';
import axios from 'axios';

function Claims({ user }) {
    const [claims, setClaims] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [newClaim, setNewClaim] = useState({ policyId: '', description: '' });

    useEffect(() => {
        fetchClaims();
        fetchPolicies();
    }, [user]);

    const fetchClaims = async () => {
        try {
            const res = await axios.get(`/api/claims/user/${user.id}`);
            setClaims(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPolicies = async () => {
        try {
            const res = await axios.get(`/api/policies/user/${user.id}`);
            setPolicies(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitClaim = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/claims', { ...newClaim, userId: user.id });
            setNewClaim({ policyId: '', description: '' });
            fetchClaims();

            // Send notification
            try {
                await axios.post(`/api/notifications?to=${user.email || user.username}&message=Claim Submitted`);
            } catch (err) { }

        } catch (error) {
            console.error(error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED': return 'green';
            case 'REJECTED': return 'red';
            default: return 'orange';
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>My Claims</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                <div className="card">
                    <h3>File New Claim</h3>
                    <form onSubmit={submitClaim} style={{ marginTop: '1rem' }}>
                        <div>
                            <label>Select Policy</label>
                            <select
                                value={newClaim.policyId}
                                onChange={e => setNewClaim({ ...newClaim, policyId: e.target.value })}
                                required
                            >
                                <option value="">Select a policy</option>
                                {policies.map(p => (
                                    <option key={p.id} value={p.id}>{p.type} - {p.policyNumber}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                value={newClaim.description}
                                onChange={e => setNewClaim({ ...newClaim, description: e.target.value })}
                                required
                            />
                        </div>
                        <button className="btn" style={{ width: '100%' }}>Submit Claim</button>
                    </form>
                </div>

                <div>
                    {claims.map(claim => (
                        <div key={claim.id} className="card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4>Policy #{claim.policyId}</h4>
                                <p>{claim.description}</p>
                                <small>{claim.submitDate}</small>
                            </div>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '999px',
                                backgroundColor: getStatusColor(claim.status),
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}>
                                {claim.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Claims;
