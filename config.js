const { readFileSync } = require('fs');
const { join } = require('path');

const config = {
  user: "ahmed",
  password: "n7IwOh6v-5XSMCNA",
  host: "free-tier5.gcp-europe-west1.cockroachlabs.cloud",
  database: "able-fox-821.socialeventsdb",
  port: 26257,
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync(join(__dirname, 'certs', 'root.crt')).toString()
  }
};
exports.config = config;

// https://vercel.com/docs/runtimes#advanced-usage/technical-details/including-additional-files
// The use of __dirname is necessary to read a file relative to the current file.
// https://www.cockroachlabs.com/docs/v21.1/cockroach-cert
