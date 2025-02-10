import { AppointmentDatePastError } from "../errors/AppointmentDatePastError.ts";
import {AppointmentEntity} from "../entities/AppointmentEntity.ts";
import {AppointmentRepository} from "../../application/repositories/AppointmentRepository.ts";

export class AppointmentDate implements AppointmentRepository{
  private constructor(public readonly value: Date) {}

  public static from(date: Date) {
    const today = new Date();

    if (date < today) {
      return new AppointmentDatePastError();
    }

    return new AppointmentDate(date);
  }
}
