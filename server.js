const express = require('express');
const path = require('path');
const cors = require('cors');

const createServers = port => {
  const app = express();
  const server = require('http').createServer(app);

  const dir = path.resolve(__dirname, './build');

  app.use(cors());
  app.options('*', cors());
  app.use(express.static(dir));

  app.get('*', (req, res) => {
    res.sendFile(`${dir}/index.html`);
  });

  server.listen(port, () => {
    console.log('🥁 server and sockets connected ');
  });
};

module.exports = createServers;
