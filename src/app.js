import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';

const app = Fastify({
  logger: true
});

// multipart — для загрузки файлов
app.register(fastifyMultipart);

// простой маршрут для проверки
app.get('/', async () => {
  return { status: 'OK', service: 'medical-labs' };
});

// загрузка файла
app.post('/upload', async (req, reply) => {
  const data = await req.file();
  const buffer = await data.toBuffer();

  return {
    status: 'ok',
    filename: data.filename,
    mimetype: data.mimetype,
    size: buffer.length
  };
});

// запуск сервера
app.listen({ port: process.env.PORT || 3005 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server running: ${address}`);
});
