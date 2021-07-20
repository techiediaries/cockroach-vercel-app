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

module.exports = async (request, response) => {
    const people = [];
    const { eventId } = request.query;
    console.log("Query data:", request.query);

    const query = `SELECT * FROM people WHERE event_id=${eventId};`;
    const client = await pool.connect();    
    await client.query(query, (err, res)=> {
        if (err) {
          response.status(500).json({
            message: err.message
          });
        }
        if (res.rows.length > 0) {
            res.rows.forEach((row) => {
              console.log(row);
              people.push(row);
            });
        }
        response.json({
          people: people
        });
    });
};