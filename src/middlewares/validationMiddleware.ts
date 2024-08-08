import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export function validationMiddleware<T>(
  type: any
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const errors: ValidationError[] = await validate(
      plainToClass(type, req.body)
    );
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      next();
    }
  };
}
