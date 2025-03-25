import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { SeoModel } from '../models/seoModel';

interface AnalyzeRequestBody {
  url: string;
  category: string;
}

export class SeoController {
  private seoModel: SeoModel;

  constructor(serpApiKey: string) {
    this.seoModel = new SeoModel(serpApiKey);
  }

  // Handle the /analyze endpoint with validation
  analyze = [
    // Validation middleware
    body('url').isURL().withMessage('Invalid URL'),
    body('category').notEmpty().withMessage('Category is required'),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { url, category }: AnalyzeRequestBody = req.body;
      try {
        const { keywords, blogs } = await this.seoModel.fetchSeoData(category);
        console.log('API Response:', { keywords, blogs }); // Debug log
        res.json({ keywords, blogs });
      } catch (error: any) {
        console.error('Error in SeoController:', error.message);
        res.status(500).json({ error: 'Failed to analyze with SerpApi' });
      }
    },
  ];
}