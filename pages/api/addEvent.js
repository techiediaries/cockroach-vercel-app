const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);


module.exports = async (request, response) => {
    const { title, description, date, time } = request.body;
    console.log("Posted data:", request.body);
    const query = `INSERT INTO events (title, description, event_date, event_time) VALUES ('${title}', '${description}', '${date}', '${time}');`;
    const client = await pool.connect();
    console.log("Adding events...");

    console.log("Sending the query: ", query);
    await client.query(query, (err, res)=> {
        if (err) {
          console.log(err);
          client.release();
          response.status(500).json({
            message: err.message
          });
        }
        console.log(res);
        response.json({
          message: "Success!"
        });
    });
};