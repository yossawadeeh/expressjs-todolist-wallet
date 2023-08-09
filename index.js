const express = require("express");
const { readdirSync } = require("fs");
const connectDB = require("./config/database");
const bodyParse = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const options = {
  definition: {
    info: {
      title: "Express JS todo list and wallet API",
      version: "1.0.0",
      description:
        "Api for todo list and wallet app with express js and mongo DB.",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

connectDB();

app.use(bodyParse.json({ limit: "10mb" }));

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(5000, () => {
  console.log("Server is running...");
});
