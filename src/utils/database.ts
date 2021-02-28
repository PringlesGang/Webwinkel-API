import * as mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(`${process.env.DATABASE_PORT}`)
});

pool.getConnection(async (err) => {
    if (err) return console.error("Failed to connect to the database!\n" + err);

    console.log("Connected to the database!")
});

export default pool.promise();