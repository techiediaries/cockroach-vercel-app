const { Pool } = require("pg");
const { config } = require("../../config");


const pool = new Pool(config);

/*
username =ahmed

host =free-tier5.gcp-europe-west1.cockroachlabs.cloud

port =26257

Copy
database =able-fox-821.defaultdb

password =n7IwOh6v-5XSMCNA

postgresql://ahmed:n7IwOh6v-5XSMCNA@free-tier5.gcp-europe-west1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=$HOME/.postgresql/root.crt&options=--cluster%3Dable-fox-821
*/
module.exports = async (request, response) => {
    const events = [];
    const client = await pool.connect();
    console.log("Fetching events...");
    await client.query("SELECT * FROM events;", (err, res)=> {
        if (err) throw err;
        if (res.rows.length > 0) {
          console.log("Events:");
          res.rows.forEach((row) => {
            console.log(row);
            events.push(row);
          });
        }

        response.json({
          events: events
        });
    });


};