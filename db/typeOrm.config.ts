import { DataSource, DataSourceOptions } from 'typeorm';

export const DataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'social_test',
  entities: ['dist/**/*.entity{ .ts,.js}'],
  synchronize: true,
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_history',
  migrationsRun: true,
};

const dataSource = new DataSource(DataSourceOption);
export default dataSource;
