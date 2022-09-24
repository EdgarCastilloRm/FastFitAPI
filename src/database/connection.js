import mysql from "promise-mysql";
import config from "../config";

var connection = mysql.createConnection({
    host: config.dbServer,
    database: config.dbDatabase,
    port: 3306,
    user: config.dbUser,
    password: config.dbPassword
});
 
const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
}