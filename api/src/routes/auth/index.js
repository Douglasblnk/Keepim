module.exports = async (fastify, opts) => {
  fastify.get('/', async (req, res) => {
    res.code(200).send({ msg: 'OK' });
  });
}