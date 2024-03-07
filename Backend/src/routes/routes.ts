import { Router, Request, Response } from "express";
import { CalculatingRoutes } from "../controllers/calculatingRoute"
import { Clients } from "../controllers/clients";
export const router = Router();

const calculatingRoute = new CalculatingRoutes()
const clients = new Clients();

router.get("/clients", clients.listClients);
router.get("/calculateRoute", calculatingRoute.calculatedRoute);

router.post("/register", clients.registerClient);