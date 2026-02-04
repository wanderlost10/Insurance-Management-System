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
                await axios.post('/api/users/register', { username, password, role: 'CUSTOMER' });
                setIsRegistering(false);
                alert('Registration successful! Please login.');
            } else {
                // In a real app, we would authenticate properly. 
                // For this demo, we just check if user exists in our DB or just fetch them.
                // Assuming the backend has a way to verify or we just fetch by username for partial demo.
                // The SRS didn't specify strict Auth flow details, so we'll simulate "Login" by fetching the user.
                // If it was real, we'd hit a /login endpoint returning a token.

                // Let's try to find the user. If they exist, we log them in.
                try {
                    const res = await axios.get(`/api/users/${username}`);
                    if (res.data) {
                        setUser(res.data);
                        navigate('/');
                    } else {
                        alert('User not found');
                    }
                } catch (err) {
                    alert('User not found or error connecting');
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
