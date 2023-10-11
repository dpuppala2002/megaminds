const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = 3001;

// In-memory user store
const users = [
  { username: 'testuser', password: 'testpassword' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // Home Page
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home Page');
  } else if (pathname === '/login' && req.method === 'POST') {
    // Login Page
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const params = querystring.parse(body);
      const username = params.username;
      const password = params.password;

      // Check if the user exists
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        res.writeHead(302, { 'Location': '/' });
        res.end();
      } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized');
      }
    });
  } else {
    // Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
