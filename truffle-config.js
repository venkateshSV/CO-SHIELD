// var express = require("express")
//       var app = express()
//       app.listen(3000, () => {
//         console.log("Server running on port 3000");
//       });

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}