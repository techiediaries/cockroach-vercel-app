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
    const { name, eventId } = request.body;
    console.log("Posted data:", request.body);

    const query = `INSERT INTO people (name, eventId) VALUES (${name}, ${event_id});`;
    const client = await pool.connect();
    console.log("RSVP");
    
    await client.query(query, (err, res)=> {
        if (err) {
          response.json({
            message: err.message
          });
        }
        console.log(res);
        response.json({
          message: "Success!"
        });
    });
};