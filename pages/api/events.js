const { Pool } = require("pg");
const config = {
  user: "ahmed",
  password: "n7IwOh6v-5XSMCNA",
  host: "free-tier5.gcp-europe-west1.cockroachlabs.cloud",
  database: "able-fox-821.socialeventsdb",
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
  //For secure connection:
  /*ssl: {
        ca: fs.readFileSync('/certs/ca.crt')
            .toString()
    }*/
};

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
module.exports = async (req, res) => {
    const events = [];
    const client = await pool.connect();
    console.log("Fetching events...");
    await client.query("SELECT id FROM events;", (err, res)=> {
        if (err) throw err;
        console.log("Rows: ");
        console.log(res.rows);

        if (res.rows.length > 0) {
          console.log("Events:");
          res.rows.forEach((row) => {
            console.log(row);
            events.push(row);
          });
        }
    });

    res.json({
      events: events
    });
};