import {AppointmentRepository} from "../../repositories/AppointmentRepository.ts";

export class DeleteAppointmentUsecase {
    constructor(private readonly appointementRepository: AppointmentRepository ) {}

    public async execute(id: string): Promise<void> {
        await this.appointementRepository.delete(id);
    }
}