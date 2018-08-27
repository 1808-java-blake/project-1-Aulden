import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
    user: 'postgres',
    host: 'revature-1808.clnjocmokdqy.us-west-2.rds.amazonaws.com',
    database: '',
    password: '',
    port: 5432,
    max: 100
});