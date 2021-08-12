/*jshint sub:true*/
/*jshint esversion: 9 */

var http = require("http");
const AWS = require('aws-sdk'),
    path = require('path'),
    express = require('express'),
    app = express(),
    config = require('./config.js'),
    { v4: uuidv4 } = require('uuid');


require('dotenv').config({ path: path.resolve(__dirname, './.env') });

app.use(express.json());

app.get("/rows/all", (req, res) => {
    AWS.config.update(config.aws_remote_config);
    const client = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: process.env.TABLE,
        region: process.env.REGION
    };

    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]);

            res.contentType = 'application/json';
            res.send(items);
        }
    });
});

app.post('/marketingevent', (req, res) => {

    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.MarketingEventId = uuidv4();
    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: 'Added event',
                movie: data
            });
        }
    });

});


app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});
 