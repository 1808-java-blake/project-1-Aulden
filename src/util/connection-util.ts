import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
    user: process.env["AWS_POSTGRES_USERNAME"],
    host: 'revature-1808.clnjocmokdqy.us-west-2.rds.amazonaws.com',
    database: 'postgres',
    password: process.env["AWS_POSTGRES_PASSWORD"],
    port: 5432,
    max: 100
});