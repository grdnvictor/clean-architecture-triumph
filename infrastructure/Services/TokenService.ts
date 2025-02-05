import jwt from 'jsonwebtoken';
import type { User } from '../../domain/entities/UserEntity';
export class TokenService {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }
    generateAccessToken(user: User): string {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            this.secret,
            { expiresIn: '1h' }
        );
    }
    generateRefreshToken(user: User): string {
        return jwt.sign(
            { id: user.id },
            this.secret,
            { expiresIn: '7d' }
        );
    }
    verifyAccessToken(token: string): any {
        return jwt.verify(token, this.secret);
    }
}

