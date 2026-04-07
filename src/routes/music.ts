import { Hono } from 'hono';
import { getMusicData } from '../controllers/musicController.js';

const music = new Hono();

// 匹配根路径 /?server=...
music.get('/', getMusicData);

export default music;