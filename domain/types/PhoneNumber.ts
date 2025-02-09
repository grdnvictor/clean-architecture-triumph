// deno-lint-ignore-file no-control-regex
import {PhoneNumberInvalidError} from "../errors/PhoneNumberInvalidError.ts";

export class PhoneNumber {
    private constructor(public readonly value: string) {}

    public static from(value: string) {
        // French phone number regex only (might be improved ?)
        const phoneRegex = /^0[67]\d{8}$/;
        if (!phoneRegex.test(value)) {
            return new PhoneNumberInvalidError();
        }

        return new PhoneNumber(value);
    }
}