import express from "express";
const router = express.Router();
import { 
    createNota, 
    deleteNota, 
    getNota, 
    getNotas, 
    getNotasByAllFilter, 
    getNotasByDate, 
    getNotasBySearch, 
    getNotasByStatus,
    updateNota } from "../controllers/nota.js";
// import auth from "../middleware/auth.js";

router.get("/search", getNotasBySearch);
router.get("/dateRange", getNotasByDate);
router.get("/statusFilter", getNotasByStatus);
router.get("/filter", getNotasByAllFilter)
router.get("/:id", getNota);
router.get("/", getNotas);

router.post("/", createNota);
router.delete("/:id", deleteNota);
router.patch("/:id", updateNota);

export default router