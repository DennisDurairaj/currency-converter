import express from "express";
import controller from "../controllers/currency";
const router = express.Router();

router.get("/currencies", controller.getAllCurrencies);

export = router;
