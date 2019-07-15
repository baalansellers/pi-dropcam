const express = require("express");
const raspivid = require("raspivid-stream");

const server = express();
const wss = require("express-ws")(server);

server.ws("/video", (ws, req) => {
  ws.send(
    JSON.stringify({
      action: "init",
      width: "960",
      height: "540"
    })
  );

  var stream = raspivid({ rotation: 180 });

  stream.on("data", data => {
    ws.send(data, { binary: true }, error => {
      if (error) console.error(error);
    });
  });

  ws.on("close", () => {
    stream.removeAllListeners("data");
  });
});

server.use(function(err, req, res, next) {
  console.error(err);
  next(err);
});

server.listen(4242, () => console.log("Server is running..."));
