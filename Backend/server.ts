import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { SeoController } from './controllers/seoController';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const SERPAPI_KEY: string | undefined = process.env.SERPAPI_KEY;
const PORT: string | number = process.env.PORT || 5000;

if (!SERPAPI_KEY) {
  console.error('Error: SERPAPI_KEY is not defined in the .env file.');
  process.exit(1);
}

// Initialize the controller with the SerpApi key
const seoController = new SeoController(SERPAPI_KEY);

// Define routes
app.post('/analyze', (req, res) => seoController.analyze(req, res));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));