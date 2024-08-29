import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Breadcrumbs, Link, IconButton } from "@mui/material";
import Header from "../components/Header";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useUserStore } from "../store/authStore"; 

const LeaveHistoryPage = () => {
    const { getLeaveHistory, leaveHistory, isLoading, error } = useUserStore();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore(); 
    const userId = user._id;

    useEffect(() => {
        const fetchLeaveHistory = async () => {
             await getLeaveHistory(userId);
            console.log("history", leaveHistory);
        };

        fetchLeaveHistory();
    }, [getLeaveHistory, userId]);

    const handleBackToDashboard = () => {
        navigate('/'); 
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
                            Dashboard
                        </Link>
                        <Typography color="text.primary" sx={{ color: '#fff' }}>Leave History</Typography>
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
                            Leave History
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
                                        <TableCell sx={{ color: '#fff' }}>Leave Type</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Start Date</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>End Date</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Reason</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leaveHistory.map((leave) => (
                                        <TableRow key={leave.id}>
                                            <TableCell sx={{ color: '#fff' }}>{leave.leaveType}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{leave.startDate}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{leave.endDate}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{leave.status}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{leave.reason}</TableCell>
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

export default LeaveHistoryPage;
