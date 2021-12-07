const mqtt = require("mqtt");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const mqttHandler = require("./mqtt_handler");
const db = require("./dbconfig");
const conn = db.getConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mqttClient = new mqttHandler();
mqttClient.connect();

app.post("/key", (req, res) => {
    var data = req.body;
    mqttClient.sendMessage(JSON.stringify(data.key));

    var sql = `INSERT INTO history (status) VALUES ('${data.key}')`;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: "Message sent to mqtt & recorded", data: result });
    });
});
app.get("/key", (req, res) => {
    conn.query("SELECT * FROM history", (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000);
