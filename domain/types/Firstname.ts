import {FirstnameTooShortError} from "../errors/FirstnameTooShortError.ts";

export class Firstname {
  private constructor(public readonly value: string) {}

  public static from(value: string) {
    if (value.trim().length < 1) {
      return new FirstnameTooShortError();
    }

    return new Firstname(value);
  }
}
