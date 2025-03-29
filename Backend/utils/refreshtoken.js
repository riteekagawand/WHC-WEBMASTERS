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
exports.refreshAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const refreshAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken)
            throw new Error("No refresh token found");
        const response = yield axios_1.default.post("http://localhost:5000/api/refresh", { refreshToken });
        if ((_a = response.data) === null || _a === void 0 ? void 0 : _a.accessToken) {
            return response.data.accessToken;
        }
        return null;
    }
    catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
});
exports.refreshAccessToken = refreshAccessToken;
