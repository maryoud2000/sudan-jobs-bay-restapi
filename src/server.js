require("./db/connection");
const express = require("express");
const cors = require("cors");
const testRouter = require("./test/testRoutes");
const userRouter = require("./user/userRoutes");
const jobRouter = require("./job/jobRoutes");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(testRouter);
app.use(userRouter);
app.use(jobRouter);

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});