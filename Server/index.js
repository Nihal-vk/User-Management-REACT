const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("./Db/Config");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const adminRoutes = require("./src/routes/admin");
const userRoutes = require("./src/routes/user");

app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.listen(3001, () => {
  console.log("Server is listening on port 5000");
});
