import { NextFunction, Request, Response } from "express";

export const createMeeting = (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: "success", message: "Meeting created successfully." });
};
