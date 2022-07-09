import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import catchAsync from './catch.async';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
      return next();
    }

    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;

    next();
  }
);
