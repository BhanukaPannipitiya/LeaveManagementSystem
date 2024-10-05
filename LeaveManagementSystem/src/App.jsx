import { Navigate, Route, Routes } from "react-router-dom";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import LeaveRequestPage from "./pages/LeaveRequestPage";
import LeaveHistoryPage from "./pages/LeaveHistoryPage";
import ManageLeaveRequests from "./pages/ManageLeaveRequests";
import AdminLeaveHistory from "./pages/AdminLeaveHistory";
import LoginPageOTP from "./pages/LoginPageOTP";

// protect routes that require authentication
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (!user?.isVerified) {
        return <Navigate to='/verify-email' replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to='/' replace />; // Redirect to the dashboard or an error page
    }

    return children;
};


// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user?.isVerified) {
		return <Navigate to='/verify-email' />
		// return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;

    return (
        <div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/leave-request'
                    element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <LeaveRequestPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/leave-history'
                    element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <LeaveHistoryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin-leave-history'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminLeaveHistory />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/manage-leaves'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManageLeaveRequests />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <RedirectAuthenticatedUser>
                            <SignUpPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <RedirectAuthenticatedUser>
                            <LoginPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route path='/verify-email' element={<EmailVerificationPage />} />
                <Route
                    path='/forgot-password'
                    element={
                        <RedirectAuthenticatedUser>
                            <ForgotPasswordPage />
                        </RedirectAuthenticatedUser>
                    }
                />

                <Route
                    path='/reset-password/:token'
                    element={
                        <RedirectAuthenticatedUser>
                            <ResetPasswordPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                {/* catch all routes */}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
