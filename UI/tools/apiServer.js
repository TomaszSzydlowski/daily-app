/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const mockJWT = require('./mockJWT');

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: 'node_modules/json-server/dist'
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/notes/': '/notes/',
    '/api/projects/': '/projects/'
  })
);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function(req, res, next) {
  setTimeout(next, 200);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.post('/notes/', function(req, res, next) {
  const error = validateNote(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    // req.body.slug = createSlug(req.body.title); // Generate a slug for new courses.
    next();
  }
});

server.post('/api/auth/login/', (req, res) => {
  if (req.body.email === 'bad') {
    res.status(401);
    res.end();
  } else {
    const { jwt } = mockJWT;
    res.status(200).jsonp(jwt);
    res.end();
  }
});

server.post('/api/auth/register/', (req, res) => {
  if (req.body.email === 'bad') {
    res.status(400);
    res.end();
  } else {
    const { jwt } = mockJWT;
    res.setHeader('Access-Control-Expose-Headers', 'Authorization, Content-Type');
    res.setHeader('Authorization', jwt);
    res.status(200);
    res.end();
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

function validateNote(note) {
  if (!note.content) return 'Content is required.';
  if (!note.projectId) return 'Project is required.';
  if (!note.date) return 'Date is required.';
  return '';
}
