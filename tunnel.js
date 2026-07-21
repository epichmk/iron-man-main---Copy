const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 3000 });
  console.log('PUBLIC_URL:' + tunnel.url);

  tunnel.on('close', () => {
    console.log('tunnels are closed');
  });
})();
