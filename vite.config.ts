import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'virtual-favicon',
          configureServer(server) {
            // 存储用户设置的 favicon
            let userFavicon: string | null = null;
            
            // 处理 /api/favicon 端点，用于接收用户设置的 favicon
            server.middlewares.use('/api/favicon', (req, res) => {
              if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                  body += chunk.toString();
                });
                req.on('end', () => {
                  try {
                    const data = JSON.parse(body);
                    if (data.favicon) {
                      userFavicon = data.favicon;
                      res.statusCode = 200;
                      res.end(JSON.stringify({ success: true }));
                    } else {
                      res.statusCode = 400;
                      res.end(JSON.stringify({ success: false, error: 'No favicon provided' }));
                    }
                  } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
                  }
                });
              } else {
                res.statusCode = 404;
                res.end();
              }
            });
            
            // 处理 /favicon.ico 请求
            server.middlewares.use('/favicon.ico', (req, res) => {
              // 1. 优先使用用户设置的 favicon
              if (userFavicon) {
                if (userFavicon.startsWith('data:')) {
                  const parts = userFavicon.split(',');
                  if (parts.length >= 2) {
                    const header = parts[0];
                    const base64Data = parts[1];
                    const mimeType = header.split(':')[1].split(';')[0];
                    const binaryData = Buffer.from(base64Data, 'base64');
                    
                    res.setHeader('Content-Type', mimeType);
                    res.setHeader('Cache-Control', 'public, max-age=3600');
                    res.end(binaryData);
                    return;
                  }
                } else {
                  // 如果是 URL，重定向到该 URL
                  res.statusCode = 302;
                  res.setHeader('Location', userFavicon);
                  res.end();
                  return;
                }
              }
              
              // 2. 尝试从 public/favicon.ico 文件读取图标
              const faviconPath = path.resolve(__dirname, 'public', 'favicon.ico');
              
              try {
                if (fs.existsSync(faviconPath)) {
                  const faviconContent = fs.readFileSync(faviconPath);
                  res.setHeader('Content-Type', 'image/x-icon');
                  res.setHeader('Cache-Control', 'public, max-age=3600');
                  res.end(faviconContent);
                  return;
                }
              } catch (error) {
                console.error('Error reading favicon.ico:', error);
              }
              
              // 3. 返回默认图标
              const defaultFavicon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" fill="#3b82f6" rx="18"/><text x="50%" y="52%" dy=".32em" fill="white" font-family="sans-serif" font-size="32" text-anchor="middle">Nav</text></svg>`;
              
              res.setHeader('Content-Type', 'image/svg+xml');
              res.setHeader('Cache-Control', 'public, max-age=3600');
              res.end(defaultFavicon);
            });
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.PASSWORD': JSON.stringify(env.PASSWORD || 'admin')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
