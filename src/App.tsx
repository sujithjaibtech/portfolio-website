import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import { Toaster } from 'sonner';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/admin/login" replace />;

    return children;
};

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster position="bottom-right" theme="system" richColors />
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/admin/login" element={<Login />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
