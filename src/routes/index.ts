import { Router } from "express";
import Prodrouter from "./products.routes";
import Userrouter from "./users.routes";

const router: Router = Router();

router.use("/products", Prodrouter);
router.use("/user", Userrouter)

export default router;