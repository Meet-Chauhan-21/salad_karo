const express = require("express")
const mongoose = require("mongoose");
const router = require("./routes/AuthRoutes")
const orderRouter = require("./routes/OrderRoutes")
const saladRouter = require("./routes/SaladRoutes")
const cors = require("cors")
const app = express()
require("dotenv").config()
app.use(express.json());
app.use(cors());

app.use("/auth", router )
app.use("/orders", orderRouter )
app.use("/salads", saladRouter )


mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 3030, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch(err => {
    console.log("DB connection error:", err);
});
