import type {UserRepository} from "../../../../application/repositories/UserRepository.ts";
import {createAppointmentRequestSchema} from "../schemas/createAppointmentRequestSchema.ts";
import {authentificationRequestSchema} from "../schemas/AuthentificationRequestSchema.ts";
import { exhaustive } from "npm:exhaustive";
import {AuthentificationUsecase} from "../../../../application/usecases/AuthentificationUsecase.ts";

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
        const error = await this.authentificationUsecase.execute(email,password);
        if (!error) {
            return new Response(null, {
                status: 201,
            });
        }

        return exhaustive(error.name, {
            UserNotFoundError: () => new Response("UserNotFoundError", {status: 400}),
            passwordValidOrError: () => new Response("passwordValidOrError", {status: 400}),
        });
    }
}