export default async function (fastify, opts) {
  fastify.get('/', async (req, res) => {
    res.code(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authentication</title>
        </head>
        <body>
          <h1>Authentication</h1>
          <p>
            This is the authentication page.
          </p>
        </body>
      </html>
    `);
  });
}