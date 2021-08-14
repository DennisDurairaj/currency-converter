import express from "express";
import controller from "../controllers/currency";
const router = express.Router();

router.get("/posts", controller.getAllCurrencies);

export = router;
