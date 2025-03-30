"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const refreshtoken_1 = require("./refreshtoken");
const axiosInstance = axios_1.default.create({
    baseURL: "http://localhost:5000", // Update this with your backend URL
    headers: {
        "Content-Type": "application/json",
    },
});
// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));
// Response Interceptor: Handle Token Expiry & Refresh
axiosInstance.interceptors.response.use((response) => response, (error) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const originalRequest = error.config;
    // If 401 Unauthorized & first retry attempt
    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const newAccessToken = yield (0, refreshtoken_1.refreshAccessToken)();
            if (newAccessToken) {
                localStorage.setItem("accessToken", newAccessToken); // Store new token
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); // Retry request
            }
        }
        catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            localStorage.removeItem("accessToken"); // Clear token
            window.location.href = "/login"; // Redirect to login page
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
}));
exports.default = axiosInstance;
