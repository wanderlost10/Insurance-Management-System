import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="app">
                <Navbar user={user} setUser={setUser} />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/policies" element={user ? <Policies user={user} /> : <Navigate to="/login" />} />
                        <Route path="/claims" element={user ? <Claims user={user} /> : <Navigate to="/login" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
