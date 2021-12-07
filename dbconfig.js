const mysql = require("mysql");

const database = "iot";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: database,
});

connection.connect(function (err) {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log("Connection to database was successful");
    }

    var sql =
        "CREATE TABLE IF NOT EXISTS history (id INT AUTO_INCREMENT PRIMARY KEY, status ENUM('1','0'),ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, description VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
});

module.exports = {
    getConnection() {
        return connection;
    },
};
