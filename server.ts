import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { generateSevenDayDiet, getMealAlternatives, generateGroceryList } from './src/services/dietGeneratorEngine';
import { FOOD_DATABASE } from './src/data/nutritionDatabase';
import { DietType, CuisineType } from './src/types';
import { extractDriveFolderId, crawlGoogleDriveFolder } from './src/services/driveExtractor';
import { DEFAULT_DRIVE_VIDEOS, ORIGINAL_DRIVE_FOLDER_URL } from './src/data/driveVideoBankData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Google Search Console Site Verification
  app.get('/google7f0e06c043119c9b.html', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send('google-site-verification: google7f0e06c043119c9b.html');
  });

  // Dynamic Sitemap.xml
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    // Canonical domain for Google Search Console is https://www.fitnetheist.com
    const baseUrl = 'https://www.fitnetheist.com';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>2026-10-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/pricing</loc>
    <lastmod>2026-10-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>2026-10-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/coach</loc>
    <lastmod>2026-10-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/transformations</loc>
    <lastmod>2026-10-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/challenges</loc>
    <lastmod>2026-10-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/policy</loc>
    <lastmod>2026-10-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  });

  // Robots.txt
  app.get('/robots.txt', (_req: Request, res: Response) => {
    const baseUrl = 'https://www.fitnetheist.com';

    const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(robots);
  });

  // Diet Generator Endpoint
  app.post('/api/diet/generate', (req: Request, res: Response) => {
    try {
      const {
        targetCalories = 2050,
        dietType = 'NON-VEGETARIAN',
        cuisine = 'INDIAN_INTERNATIONAL',
        mealsPerDay = 4,
        budget = 'STANDARD',
        preferences = [],
        avoidances = [],
        goal = 'BUILD_MUSCLE'
      } = req.body;

      // Validate inputs
      const validatedCalories = Math.max(1000, Math.min(6000, Number(targetCalories) || 2050));
      const validDietTypes: DietType[] = ['NON-VEGETARIAN', 'VEGETARIAN', 'VEGAN'];
      const validatedDietType: DietType = validDietTypes.includes(dietType) ? dietType : 'NON-VEGETARIAN';
      const validatedMealsPerDay = Math.max(3, Math.min(6, Number(mealsPerDay) || 4));

      // Generate 7-day meal plan
      const plan = generateSevenDayDiet({
        targetCalories: validatedCalories,
        dietType: validatedDietType,
        cuisine: cuisine as CuisineType,
        mealsPerDay: validatedMealsPerDay,
        budget,
        preferences: Array.isArray(preferences) ? preferences : [],
        avoidances: Array.isArray(avoidances) ? avoidances : [],
        goal
      });

      // Generate grocery list
      const groceryList = generateGroceryList(plan);

      res.json({
        success: true,
        plan,
        groceryList,
        meta: {
          targetCalories: validatedCalories,
          dietType: validatedDietType,
          mealsPerDay: validatedMealsPerDay,
          totalDays: plan.days.length,
          generatedAt: plan.createdAt
        }
      });
    } catch (error: any) {
      console.error('Error in /api/diet/generate:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate 7-day diet plan'
      });
    }
  });

  // Meal Swap Alternatives Endpoint
  app.post('/api/diet/swap-alternatives', (req: Request, res: Response) => {
    try {
      const { currentMeal, dietType = 'NON-VEGETARIAN', cuisine = 'INDIAN_INTERNATIONAL', avoidances = [] } = req.body;

      if (!currentMeal || !currentMeal.category) {
        return res.status(400).json({ success: false, error: 'currentMeal with valid category is required' });
      }

      const alternatives = getMealAlternatives(
        currentMeal,
        dietType as DietType,
        cuisine as CuisineType,
        avoidances
      );

      res.json({
        success: true,
        alternatives
      });
    } catch (error: any) {
      console.error('Error in /api/diet/swap-alternatives:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to calculate meal alternatives'
      });
    }
  });

  // Food Database Query Endpoint
  app.get('/api/diet/foods', (req: Request, res: Response) => {
    try {
      const { dietType, category, cuisine } = req.query;
      let foods = [...FOOD_DATABASE];

      if (dietType) {
        if (dietType === 'VEGAN') {
          foods = foods.filter(f => f.dietType === 'VEGAN');
        } else if (dietType === 'VEGETARIAN') {
          foods = foods.filter(f => f.dietType === 'VEGETARIAN' || f.dietType === 'VEGAN');
        }
      }

      if (category) {
        foods = foods.filter(f => f.mealCategory === category);
      }

      if (cuisine && cuisine !== 'INDIAN_INTERNATIONAL') {
        foods = foods.filter(f => f.cuisine === cuisine);
      }

      res.json({
        success: true,
        count: foods.length,
        foods
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Google Drive Video Bank: Get all available videos
  app.get('/api/drive/videos', (req: Request, res: Response) => {
    try {
      res.json({
        success: true,
        count: DEFAULT_DRIVE_VIDEOS.length,
        sourceUrl: ORIGINAL_DRIVE_FOLDER_URL,
        videos: DEFAULT_DRIVE_VIDEOS
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Google Drive Video Bank: Crawl & Extract from any Google Drive Folder link
  app.post('/api/drive/sync-folder', async (req: Request, res: Response) => {
    try {
      const { folderUrl = ORIGINAL_DRIVE_FOLDER_URL } = req.body;
      const folderId = extractDriveFolderId(folderUrl);

      if (!folderId) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Google Drive folder link or folder ID. Please provide a valid drive.google.com/drive/folders/... link.'
        });
      }

      console.log(`[Drive Crawler] Syncing Google Drive folder: ${folderId}`);
      const extractedVideos = await crawlGoogleDriveFolder(folderId);

      // Group categories summary
      const categoriesSummary: Record<string, number> = {};
      extractedVideos.forEach(v => {
        const cat = v.subfolderCategory || 'General';
        categoriesSummary[cat] = (categoriesSummary[cat] || 0) + 1;
      });

      res.json({
        success: true,
        count: extractedVideos.length,
        folderId,
        folderUrl,
        categories: categoriesSummary,
        videos: extractedVideos
      });
    } catch (error: any) {
      console.error('[Drive Crawler] Error syncing folder:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to extract videos from Google Drive folder'
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fitnetheist server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
