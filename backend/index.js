import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/products.js";
import searchRoutes from "./routes/search.js";
import orderRoutes from "./routes/order.js";
import wishRoutes from "./routes/wishlist.js";
import announceRoutes from "./routes/announcement.js";
import subscriberRoutes from "./routes/subscriber.js";
import dashboardRoutes from "./routes/dashboard.js";
import settingsRoutes from "./routes/settings.js";

//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//use router
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/search", searchRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishRoutes);
app.use("/announcements", announceRoutes);
app.use("/subscribers", subscriberRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/settings", settingsRoutes);
// app.use("/cart", cartRoute);

//db
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_ADDRESS, dbOptions)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));
