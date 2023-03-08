import { Router } from "express";
import Prodrouter from "./products.routes";

const router: Router = Router();

router.use("/products", Prodrouter);

export default router;