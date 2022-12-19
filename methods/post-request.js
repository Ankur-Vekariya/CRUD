const crypto = require("crypto");
const requestBodyParser = require("../utill/body-parser");
const writeToFile = require("../utill/write-to-file");
module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req?.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "validation failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "not found", message: "Route not found" }));
  }
};
