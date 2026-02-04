import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                // Use the new /auth/register endpoint
                await axios.post('/api/auth/register', { username, password, email: username + '@example.com', role: 'CUSTOMER' });
                setIsRegistering(false);
                alert('Registration successful! Please login.');
            } else {
                // Use the new /auth/token endpoint
                try {
                    const res = await axios.post('/api/auth/token', { username, password });
                    if (res.data) {
                        const token = res.data;
                        localStorage.setItem('jwt', token);

                        // Fetch profile using the token
                        try {
                            const profileRes = await axios.get(`/api/users/${username}`, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            setUser(profileRes.data);
                        } catch (e) {
                            // Fallback
                            setUser({ username, id: 1 });
                        }
                        navigate('/');
                    } else {
                        alert('Invalid credentials');
                    }
                } catch (err) {
                    console.error(err);
                    alert('Login failed. Check credentials.');
                }
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <div className="card" style={{ width: '400px' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>
                        {isRegistering ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
                    <span
                        style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? 'Login' : 'Register'}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
