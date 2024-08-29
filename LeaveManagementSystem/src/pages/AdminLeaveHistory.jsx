import React, { useEffect } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Breadcrumbs, Link, IconButton } from "@mui/material";
import Header from "../components/Header";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../store/authStore"; // Assuming you have an admin store for handling admin-specific data

const AdminLeaveHistory = () => {
    const { getPendingRequests, pendingRequests, isLoading, error } = useAdminStore();
    const navigate = useNavigate();

    useEffect(() => {
        getPendingRequests(); // Fetch all leave requests when the component mounts
    }, [getPendingRequests]);

    const handleBackToDashboard = () => {
        navigate('/dashboard'); // Navigate back to the admin dashboard
    };

    return (
        <>
            <Header />
            <div
                className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex flex-col items-center justify-center'
                style={{ padding: '20px' }}
            >
                <Box sx={{ width: '100%', maxWidth: 800, padding: 2 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            onClick={handleBackToDashboard}
                            sx={{ cursor: 'pointer', color: '#fff' }}
                        >
                            Admin Dashboard
                        </Link>
                        <Typography color="text.primary" sx={{ color: '#fff' }}>All Leave Requests</Typography>
                    </Breadcrumbs>
                </Box>
                <Paper
                    elevation={8}
                    sx={{
                        padding: 4,
                        width: '100%',
                        maxWidth: 800,
                        backgroundColor: '#1f2937',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        borderRadius: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', flexGrow: 1 }}>
                            All Leave Requests
                        </Typography>
                        <IconButton onClick={handleBackToDashboard} sx={{ color: '#fff' }}>
                            <ArrowBigLeftDashIcon />
                        </IconButton>
                    </Box>
                    {isLoading ? (
                        <Typography sx={{ color: '#fff', textAlign: 'center' }}>Loading...</Typography>
                    ) : error ? (
                        <Typography sx={{ color: '#ff0000', textAlign: 'center' }}>Error: {error}</Typography>
                    ) : (
                        <TableContainer component={Paper} sx={{ backgroundColor: '#1f2937', color: '#fff' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#fff' }}>Employee Name</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Leave Type</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Start Date</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>End Date</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Reason</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pendingRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell sx={{ color: '#fff' }}>{request.employeeName}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.leaveType}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.startDate}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.endDate}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.status}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.reason}</TableCell>
                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </div>
        </>
    );
};

export default AdminLeaveHistory;