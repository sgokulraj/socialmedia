import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import helmet from "helmet";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth-routes.js";
import usersRoutes from "./routes/users-routes.js";
import postsRoutes from "./routes/posts-routes.js";
import { register } from "./controllers/auth-controller.js";
import { createPost } from "./controllers/posts-controller.js";
import { verifyToken } from "./middleware/auth-middleware.js";
import bodyParser from "body-parser";

// As __dirname is not available in ES module, I am using import.meta.url to get the meta information of ES module
// i.e absolute path to the module on which it is running
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

//MiddleWares
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


//Auth
app.post("/auth/register", upload.single("file"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

//MongoDB connection
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
  })
  .catch((err) => console.log(err));
