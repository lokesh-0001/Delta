const express = require("express");
const cors = require("cors");
const predictRoute = require("./routes/predict");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/predict", predictRoute);

app.listen(5000, () => console.log("Backend running on port 5000"));