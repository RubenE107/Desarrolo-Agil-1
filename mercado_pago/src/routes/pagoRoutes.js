import { Router } from "express";
import { crearOrdden } from "../controllers/pagosController.js";
const router = Router();
router.get("/crear_orden", crearOrdden);
router.get("/Exito", (req, res) => res.send("success"));
//router.get("/Error", (req, res) => res.send("Error"));
router.get("/Pendiente", (req, res) => res.send("Pendiente"));
export default router;