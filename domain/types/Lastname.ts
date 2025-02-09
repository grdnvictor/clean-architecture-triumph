import {LastnameTooShortError} from "../errors/LastnameTooShortError.ts";

export class Lastname {
  private constructor(public readonly value: string) {}

  public static from(value: string) {
    if (value.trim().length < 1) {
      return new LastnameTooShortError();
    }

    return new Lastname(value);
  }
}
