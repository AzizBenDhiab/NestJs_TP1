import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    userId?: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response, next: NextFunction) {
        const token = req.headers['auth-user'] as string;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decodedToken = decodeToken(token);
            if (!decodedToken.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.userId = decodedToken.userId;
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }
}

function decodeToken(token: string) {
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded as { userId: string };
}