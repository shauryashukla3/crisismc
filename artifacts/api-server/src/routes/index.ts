import { Router, type IRouter } from "express";
import healthRouter from "./health";
import minecraftRouter from "./minecraft";
import storeRouter from "./store";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(minecraftRouter);
router.use(storeRouter);
router.use(authRouter);

export default router;
