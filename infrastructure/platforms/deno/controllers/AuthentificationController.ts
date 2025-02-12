import type {UserRepository} from "../../../../application/repositories/UserRepository";
import {createAppointmentRequestSchema} from "../schemas/createAppointmentRequestSchema";
import {authentificationRequestSchema} from "../schemas/AuthentificationRequestSchema";
import { exhaustive } from "npm:exhaustive";
import {AuthentificationUsecase} from "../../../../application/usecases/AuthentificationUsecase";

export class AuthentificationController {
    constructor(private authentificationUsecase: AuthentificationUsecase) {}

    public async login(request: Request): Promise<Response> {
        const body = await request.json();
        const validation = authentificationRequestSchema.safeParse(body);
        if (!validation.success) {
            return new Response("Malformed request", {
                status: 400,
            });
        }
        const {email, password} = validation.data;
        const result = await this.authentificationUsecase.execute(email,password);
        if ("accessToken" in result && "refreshToken" in result) {
            return new Response(JSON.stringify(result), {
                status: 201,
            });
        }

        return exhaustive(result.name, {
            UserNotFoundError: () => new Response("UserNotFoundError", {status: 400}),
            passwordValidOrError: () => new Response("passwordValidOrError", {status: 400}),
        });
    }
}