import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [process.env.TYPEORM_MIGRATIONS],
        cli: {
          migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
          entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
        },
      }),
  },
];
