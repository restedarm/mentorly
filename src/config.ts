export default {
  orm: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'asdasd',
  },
};
