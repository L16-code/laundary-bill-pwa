const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Middleware for PWA content type headers
app.use((req, res, next) => {
  // Set proper content type for manifest.json
  if (req.url === '/manifest.json') {
    res.set('Content-Type', 'application/manifest+json');
  }
  next();
});

// Certificate options - this will use self-signed certificates
// Note: You'll need to generate these certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running on https://localhost:${PORT}`);
  console.log(`To install the PWA, open https://localhost:${PORT} in Chrome or Edge`);
  console.log('You may need to accept the self-signed certificate warning');
});
