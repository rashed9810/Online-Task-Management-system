import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

// dotenv.config();

// dbConnection();

// const PORT = process.env.PORT || 4000;

// const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:3001", "http://localhost:3002"],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use(morgan("dev"));
// app.use("/api", routes);

// app.use(routeNotFound);
// app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// // Import necessary modules and middleware
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
// import routes from "./routes/index.js";
// import { dbConnection } from "./utils/index.js";

// Load environment variables from .env file
dotenv.config();

// Establish database connection
dbConnection();

// Create Express app instance
const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3002"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);

// Define a route handler for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API!");
});

// Error handling middleware
app.use(routeNotFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
