import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5005" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/api/auth/signup`, { email, password, name });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/api/auth/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/api/auth/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/api/auth/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
}));

export const useUserStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: true,
	error: null,
	message: null,

	requestLeave: async ({ leaveType, startDate, endDate, reason,userId }) => {
        try {
            // Set loading state
            set({ isLoading: true, error: null });

            // Make the POST request to request leave
            const response = await axios.post(`${API_URL}/api/user/request-leave`, {
                leaveType,
                startDate,
                endDate,
                reason,
				userId
            });

            // Handle success
            set({
                message: response.data.message,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            // Handle error
            set({
                error: error.response ? error.response.data.message : "Failed to request leave",
                isLoading: false,
            });
        }
    },

	getLeaveHistory: async (userId) => {
		try {
			console.log("user id is",userId)
			set({ isLoading: true, error: null });

			const response = await axios.post(`${API_URL}/api/user/leave-history`,{userId});

			set({
				leaveHistory: response.data.leaveHistory, 
				isLoading: false,
				error: null,
			});
		} catch (error) {
			// Handle error
			set({
				error: error.response ? error.response.data.message : "Failed to fetch leave history",
				isLoading: false,
			});
		}
	},
}));

export const useAdminStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: true,
	error: null,
	message: null,

	getPendingRequests: async () => {
		try {
			set({ isLoading: true, error: null });
			console.log("here at the pending requests")
			const response = await axios.get(`${API_URL}/api/admin/pending-requests`);
			console.log("response",response)
			set({
				pendingRequests: response.data.pendingLeaves,
				isLoading: false,
				error: null,
			});
		} catch (error) {
			// Handle error
			set({
				error: error.response ? error.response.data.message : "Failed to fetch pending requests",
				isLoading: false,
			});
		}
	},
	approveRequest: async (requestId,action) => {
		try {
			console.log("request id",requestId)
			console.log("action type",action)
			set({ isLoading: true, error: null });

			const response = await axios.post(`${API_URL}/api/admin/approve-request`, { leaveId:requestId ,action});

			set({
				message: response.data.message,
				isLoading: false,
				error: null,
			});
		} catch (error) {
			// Handle error
			set({
				error: error.response ? error.response.data.message : "Failed to approve request",
				isLoading: false,
			});
		}
	},
	rejectRequest: async (requestId) => {
		try {
			set({ isLoading: true, error: null });

			const response = await axios.post(`${API_URL}/api/admin/reject-request`, { requestId });

			set({
				message: response.data.message,
				isLoading: false,
				error: null,
			});
		} catch (error) {
			// Handle error
			set({
				error: error.response ? error.response.data.message : "Failed to reject request",
				isLoading: false,
			});
		}
	},
}));