"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoController = void 0;
const seoModel_1 = require("../models/seoModel");
class SeoController {
    constructor(serpApiKey) {
        this.seoModel = new seoModel_1.SeoModel(serpApiKey);
    }
    // Handle the /analyze endpoint
    async analyze(req, res) {
        const { url, category } = req.body;
        // Validate request body
        if (!url || !category) {
            res.status(400).json({ error: 'URL and category are required' });
            return;
        }
        try {
            const keywords = await this.seoModel.fetchSeoData(category);
            res.json(keywords);
        }
        catch (error) {
            console.error('Error in SeoController:', error.message);
            res.status(500).json({ error: 'Failed to analyze with SerpApi' });
        }
    }
}
exports.SeoController = SeoController;
