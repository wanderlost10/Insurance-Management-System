import { useState, useEffect } from 'react';
import axios from 'axios';

function Policies({ user }) {
    const [policies, setPolicies] = useState([]);
    const [newPolicy, setNewPolicy] = useState({ policyNumber: '', type: 'HEALTH', premiumAmount: 0 });

    useEffect(() => {
        fetchPolicies();
    }, [user]);

    const fetchPolicies = async () => {
        try {
            const res = await axios.get(`/api/policies/user/${user.id}`);
            setPolicies(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createPolicy = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/policies', { ...newPolicy, userId: user.id });
            setNewPolicy({ policyNumber: '', type: 'HEALTH', premiumAmount: 0 });
            fetchPolicies();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>My Policies</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                <div className="card">
                    <h3>Buy New Policy</h3>
                    <form onSubmit={createPolicy} style={{ marginTop: '1rem' }}>
                        <div>
                            <label>Policy Number</label>
                            <input
                                value={newPolicy.policyNumber}
                                onChange={e => setNewPolicy({ ...newPolicy, policyNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Type</label>
                            <select
                                value={newPolicy.type}
                                onChange={e => setNewPolicy({ ...newPolicy, type: e.target.value })}
                            >
                                <option value="HEALTH">Health</option>
                                <option value="VEHICLE">Vehicle</option>
                                <option value="HOME">Home</option>
                            </select>
                        </div>
                        <div>
                            <label>Premium Amount</label>
                            <input
                                type="number"
                                value={newPolicy.premiumAmount}
                                onChange={e => setNewPolicy({ ...newPolicy, premiumAmount: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                        <button className="btn" style={{ width: '100%' }}>Purchase Policy</button>
                    </form>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', alignContent: 'start' }}>
                    {policies.map(policy => (
                        <div key={policy.id} className="card">
                            <h4>{policy.type} Insurance</h4>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>#{policy.policyNumber}</p>
                            <h3 style={{ color: 'var(--primary-color)', marginTop: '0.5rem' }}>${policy.premiumAmount}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Policies;
