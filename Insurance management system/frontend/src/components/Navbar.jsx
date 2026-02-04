import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                <Link to="/" className="nav-logo">InsureTech</Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    {user ? (
                        <>
                            <Link to="/policies" className="nav-link">Policies</Link>
                            <Link to="/claims" className="nav-link">Claims</Link>
                            <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem' }}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
