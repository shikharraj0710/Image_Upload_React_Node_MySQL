const express = require("express")
const app = express();
const port = 8000;
require("./db/conn");
const cors = require("cors");
const router = require("./routes/router")

app.use(express.json())
app.use(cors());
app.use(router);
app.use("/uploads", express.static("./uploads"))


app.listen(port, () => {
    console.log(`Server Started at ${port}`);
})