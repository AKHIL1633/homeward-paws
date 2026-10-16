import { createServer } from 'node:net';

const ports = [3000, 5000];

function assertPortAvailable(port) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.once('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        reject(
          new Error(
            `Port ${port} is already in use. Stop the existing development server before running npm run dev again.`,
          ),
        );
        return;
      }
      reject(error);
    });
    server.listen({ host: '0.0.0.0', port }, () => {
      server.close(resolve);
    });
  });
}

try {
  await Promise.all(ports.map(assertPortAvailable));
  console.log('Development ports 3000 and 5000 are available.');
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
