import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true, // Trust the server certificate (useful for self-signed certificates)
    },

    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0,  // Minimum number of connections in the pool
        idleTimeoutMillis: 30000, // Time (in milliseconds) before an idle connection is closed
    },
};

const pool = new sql.ConnectionPool(config);

const poolConnect = pool.connect();

pool.on('error', (err) => {
    console.error('SQL Pool Error: ', err);
});


export { poolConnect, pool, sql };