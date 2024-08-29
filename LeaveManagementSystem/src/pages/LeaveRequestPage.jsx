import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem, Paper, Grid, Breadcrumbs, Link, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { useAuthStore, useUserStore } from "../store/authStore"
const LeaveRequestPage = () => {
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const { requestLeave, message, error, isLoading } = useUserStore((state) => ({
        requestLeave: state.requestLeave,
        message: state.message,
        error: state.error,
        isLoading: state.isLoading
    }));
    const { user, logout } = useAuthStore();
    const userId = user._id;
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await requestLeave({ leaveType, startDate, endDate, reason, userId });
            if (!error) {
                // Optionally, you can show a success message or redirect
                console.log("Leave request submitted successfully");
                navigate('/'); // Redirect or show success message
            }
        } catch (err) {
            console.error("Failed to submit leave request:", err);
        }
    };

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const handleBackToDashboard = () => {
        navigate('/'); // Navigate back to the dashboard page
    };

    const leaveTypes = [
        { value: "vacation", label: "Vacation" },
        { value: "sick", label: "Sick Leave" },
        { value: "casual", label: "Casual Leave" },
    ];

    return (
        <>
            <Header />
            <div
                className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex flex-col items-center justify-center'
                style={{ padding: '20px' }}
            >
                <Box sx={{ width: '100%', maxWidth: 600, marginBottom: 2 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            onClick={handleBackToDashboard}
                            sx={{ cursor: 'pointer', color: '#fff' }}
                        >
                            Dashboard
                        </Link>
                        <Typography color="text.primary" sx={{ color: '#fff' }}>Request Leave</Typography>
                    </Breadcrumbs>
                </Box>

                <Paper
                    elevation={8}
                    sx={{
                        padding: 6,
                        maxWidth: 600,
                        backgroundColor: 'white', // Dark background to match login page
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        borderRadius: 4,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <IconButton onClick={handleBackToDashboard} sx={{ marginRight: 2, color: 'black' }}>
                            <ArrowBigLeftDashIcon />
                        </IconButton>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'black', flexGrow: 1 }}>
                            Request Leave
                        </Typography>
                    </Box>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Leave Type"
                                    fullWidth
                                    value={leaveType}
                                    onChange={(e) => setLeaveType(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                >
                                    {leaveTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Reason for Leave"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 3 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(to right, #48c774, #2d3748)', // Gradient to match login page
                                        color: '#fff',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        '&:hover': {
                                            background: 'linear-gradient(to right, #36cfc9, #2d3748)', // Darker hover state
                                        }
                                    }}
                                    onClick={handleSubmit}
                                    // disabled={isLoading}
                                >
                                    {/* {isLoading ? 'Submitting...' : 'Submit'} */}submit
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleCancel}
                                    sx={{
                                        marginLeft: 2,
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        color: '#48c774',
                                        borderColor: '#48c774',
                                        '&:hover': {
                                            borderColor: '#36cfc9',
                                            color: '#36cfc9',
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {message && <Typography color="success.main" sx={{ marginTop: 2 }}>{message}</Typography>}
                    {error && <Typography color="error.main" sx={{ marginTop: 2 }}>{error}</Typography>}
                </Paper>
            </div>
        </>
    );
};

export default LeaveRequestPage;
