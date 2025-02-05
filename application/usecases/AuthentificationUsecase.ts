import {UserRepository} from "../repositories/UserRepository";
import {UserNotFoundError} from "../../domain/errors/UserNotFoundError";
import {PasswordService} from "../../infrastructure/services/PasswordService";
import {TokenService} from "../../infrastructure/services/TokenService";
export class AuthentificationUsecase {
    public constructor(
        private readonly userRepository: UserRepository,
        private readonly PasswordService: PasswordService,
        private readonly tokenService: TokenService
    ) {}
    public async execute(email:string, password: string) {
        const user = await this.userRepository.findOneByEmail(
            email,
        );
        if (!user) {
            return new UserNotFoundError();
        }

        const passwordValidOrError = await this.PasswordService.compare(password, user.password);
        if (passwordValidOrError instanceof Error) {
            return passwordValidOrError;
        }

        return {
            accessToken: this.tokenService.generateAccessToken(user),
            refreshToken: this.tokenService.generateRefreshToken(user)
        };
    }
}
