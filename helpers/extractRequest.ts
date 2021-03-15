import { Request, Response, NextFunction } from "express";

export const extractRequest = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        } catch (error) {
            res.status(400).json({
                message: error.message,
                error
            })
        }
    }
}