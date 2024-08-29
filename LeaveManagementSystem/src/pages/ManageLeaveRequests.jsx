import React, { useEffect } from "react";
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Breadcrumbs, Link, IconButton, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { useAdminStore } from "../store/authStore";

const ManageLeaveRequests = () => {
    const { getPendingRequests, pendingRequests, approveRequest, rejectRequest, isLoading, error } = useAdminStore();
    const navigate = useNavigate();
    console.log("pending requests",pendingRequests)
    useEffect(() => {
        getPendingRequests();
    }, [getPendingRequests]);

    const handleBackToDashboard = () => {
        navigate('/admin-dashboard');
    };

    const handleApprove = async (requestId) => {
        console.log("request id",requestId)
        await approveRequest(requestId,"approve");
        getPendingRequests();
    };

    const handleReject = async (requestId) => {
        await rejectRequest(requestId,"reject");
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
                        <Typography color="text.primary" sx={{ color: '#fff' }}>Approve Leave Requests</Typography>
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
                            Pending Leave Requests
                        </Typography>
                        <IconButton onClick={handleBackToDashboard} sx={{ color: '#fff' }}>
                            <ArrowBigLeftDashIcon />
                        </IconButton>
                    </Box>
                    {isLoading ? (
                        <Typography sx={{ color: '#fff', textAlign: 'center' }}>Loading...</Typography>
                    ) : error ? (
                        <Typography sx={{ color: '#ff0000', textAlign: 'center' }}>Error: {error}</Typography>
                    ) : pendingRequests.length === 0 ? (
                        <Typography sx={{ color: '#fff', textAlign: 'center' }}>No pending requests.</Typography>
                    ) : (
                        <TableContainer component={Paper} sx={{ backgroundColor: '#1f2937', color: '#fff' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#fff' }}>Employee Name</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Leave Type</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Start Date</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>End Date</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Reason</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pendingRequests.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell sx={{ color: '#fff' }}>{request.employeeName}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.leaveType}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.startDate}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.endDate}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{request.reason}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>
                                                <Grid container spacing={1}>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                background: 'linear-gradient(to right, #48c774, #2d3748)',
                                                                color: '#fff',
                                                                '&:hover': {
                                                                    background: 'linear-gradient(to right, #36cfc9, #2d3748)',
                                                                }
                                                            }}
                                                            onClick={() => handleApprove(request._id)}
                                                        >
                                                            Approve
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{
                                                                color: '#ff0000',
                                                                borderColor: '#ff0000',
                                                                '&:hover': {
                                                                    color: '#d40000',
                                                                    borderColor: '#d40000',
                                                                }
                                                            }}
                                                            onClick={() => handleReject(request.id)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
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

export default ManageLeaveRequests;