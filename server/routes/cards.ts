import { Router, Request, Response } from "express";
import { allCards } from "../game/engine/cards";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(allCards);
});

export default router;
