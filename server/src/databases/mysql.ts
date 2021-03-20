import mysql, {PoolConfig} from "mysql";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({path: path.join(__dirname, "../../.env")});

const connection = mysql.createPool(<PoolConfig>{
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10
})

connection.getConnection(err => {
    if (err) return console.log(err)

    console.log("MySQL Connected mi pana :D")
})

export default connection