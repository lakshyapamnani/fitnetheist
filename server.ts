import fs from 'fs';
import path from 'path';

// Entry point delegator supporting both production Cloud Run execution (node server.ts) and development mode (tsx server.ts).
const distServer = path.join(process.cwd(), 'dist', 'server.cjs');
const isTsx = process.execArgv.some(arg => arg.includes('tsx'));

if (!isTsx && fs.existsSync(distServer)) {
  // Production / Cloud Run mode: execute pre-bundled self-contained server
  process.env.NODE_ENV = 'production';
  await import('./dist/server.cjs');
} else {
  // Development mode: execute via tsx with Vite middleware support
  await import('./server.impl.ts');
}
