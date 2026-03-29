import { Router, type IRouter } from "express";
import healthRouter from "./health";
import minecraftRouter from "./minecraft";
import storeRouter from "./store";

const router: IRouter = Router();

router.use(healthRouter);
router.use(minecraftRouter);
router.use(storeRouter);

export default router;
