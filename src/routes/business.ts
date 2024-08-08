import { Router } from "express";
import { BusinessController } from "../controllers/business";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateBusinessDto } from "../controllers/business/dto";

const router = Router();

router.post(
  "/businesses",
  validationMiddleware(CreateBusinessDto),
  BusinessController.createBusiness
);
router.post("/businesses/:fein/progress", BusinessController.progressBusiness);

export default router;
