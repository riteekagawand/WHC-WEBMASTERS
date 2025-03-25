"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const seoController_1 = require("./controllers/seoController");
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const PORT = process.env.PORT || 5000;
if (!SERPAPI_KEY) {
    console.error('Error: SERPAPI_KEY is not defined in the .env file.');
    process.exit(1);
}
// Initialize the controller with the SerpApi key
const seoController = new seoController_1.SeoController(SERPAPI_KEY);
// Define routes
app.post('/analyze', (req, res) => seoController.analyze(req, res));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
