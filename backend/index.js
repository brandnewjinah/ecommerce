import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/order.js";
import wishRoutes from "./routes/wishlist.js";
import announceRoutes from "./routes/announcement.js";

const app = express();
dotenv.config();

//middlewareå
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//use router
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishRoutes);
app.use("/announcements", announceRoutes);
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
