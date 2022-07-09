import { Request, Response, NextFunction } from 'express';

const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log('CatchAsync err:', error);
      next(error);
    });
  };

export default catchAsync;
