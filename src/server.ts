import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = join(__dirname, '../browser');

const BACKEND = 'http://codeikoo-backend-dotnet-prod.eba-mqskcvmc.eu-central-1.elasticbeanstalk.com';

const app = express();
const angularApp = new AngularNodeAppEngine();

// ✅ Proxy للباك (بدون CORS)
app.use('/api', createProxyMiddleware({ target: BACKEND, changeOrigin: true }));
app.use('/swagger', createProxyMiddleware({ target: BACKEND, changeOrigin: true }));
app.use('/health', createProxyMiddleware({ target: BACKEND, changeOrigin: true }));
app.use('/hubs', createProxyMiddleware({ target: BACKEND, changeOrigin: true, ws: true }));

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number.parseInt(process.env['PORT'] ?? '4000', 10) || 4000;
  app.listen(port, '0.0.0.0', (error) => {
    if (error) throw error;
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
