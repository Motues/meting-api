import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import musicRoutes from './routes/music.js';
import { incrementCounter, getStats } from './utils/counter.js';
import { createRateLimitMiddleware } from './utils/rateLimiter.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const port = Number(process.env.PORT) || 3000;
const allowedOrigins: string[] = process.env.ALLOW_ORIGIN?.split(",") ?? [];

const app = new Hono()

// 全局CORS中间件
app.use('*', cors({
  origin: (origin) => {
    if (!allowedOrigins || allowedOrigins.length === 0 || allowedOrigins.includes('*')) {
      return origin;
    }
    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset', 'Retry-After'],
  maxAge: 86400,
  credentials: true,
}));

// 全针对所有音乐相关接口限制流量
app.use('/music/*', createRateLimitMiddleware({
  maxRequests: 120,
  windowMs: 60 * 1000,
}));

app.use('/music/*', async (c, next) => {
  await incrementCounter();
  await next();
});

app.get('/', async (c) => {
  const stats = await getStats(); // 获取当前统计数据
  const readmePath = path.join(__dirname, '../doc/api.md');
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
      <div class="stats-card">
        <div class="stats-item">今日调用：<b>${stats.today}</b></div>
        <div class="stats-item">累计调用：<b>${stats.total}</b></div>
      </div>
      <hr>
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