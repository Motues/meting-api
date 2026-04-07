import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import musicRoutes from './routes/music.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const port = Number(process.env.PORT) || 3000;

const app = new Hono()

app.get('/', async (c) => {
  const readmePath = path.join(__dirname, '../README.md');
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const htmlContent = await marked(readmeContent);
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Meting API - README</title>
      <style>
        body { max-width: 900px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; }
        a { color: #0366d6; }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `);
})


// 挂载音乐路由
app.route('/music', musicRoutes);

// 错误处理
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ message: 'Internal Server Error' }, 500);
});

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server is running on http://localhost:${port}`);

export default app;