import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { Box, Paper, Typography, ButtonBase } from "@mui/material";
import Header from "../components/Header";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    console.log("user", user);

    const handleRequestLeave = () => {
        navigate('/leave-request');
    };

    const handleLeaveHistory = () => {
        navigate('/leave-history');
    };

    const handleLeaveRequest = () => {
        navigate('/manage-leaves');
    };

    const handleAdminLeaveHistory = () => {
        navigate('/admin-leave-history');
    };

    return (
        <>
            <div>
            <Header />
            </div>
            <div
                className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex flex-col items-center justify-center'
                style={{ padding: '20px' }}
            >
                
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>
                    Welcome to Your Dashboard, {user.name}
                </Typography>
                <Typography variant="h6" align="center" sx={{ color: '#ddd', marginBottom: 8 }}>
                    {new Date().getFullYear()} - Manage your leave requests and history
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
                    {user.role === "user" ? (
                        <>
                            <Grid2>
                                <ButtonBase onClick={handleRequestLeave} style={{ width: '100%' }}>
                                    <Paper 
                                        elevation={8} 
                                        sx={{
                                            padding: 6,
                                            backgroundColor: '#ff7043',
                                            color: '#fff',
                                            width: 300,
                                            height: 180,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            '&:hover': {
                                                backgroundColor: '#e64a19',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                    >
                                        <Typography variant="h5" align="center">Request Leave</Typography>
                                    </Paper>
                                </ButtonBase>
                            </Grid2>
                            <Grid2>
                                <ButtonBase onClick={handleLeaveHistory} style={{ width: '100%' }}>
                                    <Paper 
                                        elevation={8} 
                                        sx={{
                                            padding: 6,
                                            backgroundColor: '#42a5f5',
                                            color: '#fff',
                                            width: 300,
                                            height: 180,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            '&:hover': {
                                                backgroundColor: '#1e88e5',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                    >
                                        <Typography variant="h5" align="center">Leave History</Typography>
                                    </Paper>
                                </ButtonBase>
                            </Grid2>
                        </>
                    ) : (
                        <>
                            <Grid2>
                                <ButtonBase onClick={handleLeaveRequest} style={{ width: '100%' }}>
                                    <Paper 
                                        elevation={8} 
                                        sx={{
                                            padding: 6,
                                            backgroundColor: '#66bb6a',
                                            color: '#fff',
                                            width: 300,
                                            height: 180,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            '&:hover': {
                                                backgroundColor: '#43a047',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                    >
                                        <Typography variant="h5" align="center">Manage Leave Requests</Typography>
                                    </Paper>
                                </ButtonBase>
                            </Grid2>
                            <Grid2>
                                <ButtonBase onClick={handleAdminLeaveHistory} style={{ width: '100%' }}>
                                    <Paper 
                                        elevation={8} 
                                        sx={{
                                            padding: 6,
                                            backgroundColor: '#ab47bc',
                                            color: '#fff',
                                            width: 300,
                                            height: 180,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            '&:hover': {
                                                backgroundColor: '#8e24aa',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                    >
                                        <Typography variant="h5" align="center">Leave History</Typography>
                                    </Paper>
                                </ButtonBase>
                            </Grid2>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
