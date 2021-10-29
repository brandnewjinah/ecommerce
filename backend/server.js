import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//use router
app.use("/users", userRoutes);
// app.use("/product", productRoute);
// app.use("/cart", cartRoute);

//db
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_ADDRESS, dbOptions)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
