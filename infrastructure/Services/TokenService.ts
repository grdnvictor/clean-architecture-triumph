import jwt from 'jsonwebtoken';
import { UserEntity } from '../../domain/entities/UserEntity';
export class TokenService {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }
    generateAccessToken(user: UserEntity): string {
        return jwt.sign(
            { id: user.identifier, email: user.email, role: user.isAdmin },
            this.secret,
            { expiresIn: '1h' }
        );
    }
    generateRefreshToken(user: UserEntity): string {
        return jwt.sign(
            { id: user.identifier },
            this.secret,
            { expiresIn: '7d' }
        );
    }
    verifyAccessToken(token: string): any {
        return jwt.verify(token, this.secret);
    }
}

