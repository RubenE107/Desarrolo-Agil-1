import { Router } from "express";
import { crearOrden } from "../controllers/pagosController.js";
const router = Router();
router.post("/crear_orden",crearOrden);
router.get("/Exito", (req, res) => res.send("success"));
router.get("/Error", (req, res) => res.send("Error"));
router.get("/Pendiente", (req, res) => res.send("Pendiente"));
export default router;