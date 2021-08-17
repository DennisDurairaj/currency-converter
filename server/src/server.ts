import http from "http";
import path from "path";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/currency";
import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./swagger.json";
import axios from "axios";
require("dotenv").config();

const router: Express = express();
axios.defaults.auth = {
  username: process.env.xeuser as string,
  password: process.env.xepassword as string,
};

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(
  cors({
    origin: "http://localhost:3000",
  })
);

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

router.use("/", routes);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
