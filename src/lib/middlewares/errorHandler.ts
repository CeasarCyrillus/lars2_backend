import { NextFunction, Request, Response } from "express";
import {unknownError} from "../error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({result: "failure", error: unknownError});
};