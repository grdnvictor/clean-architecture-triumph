// deno-lint-ignore-file no-control-regex
import {SiretInvalidError} from "../errors/SiretInvalidError.ts";

export class Siret {
    private constructor(public readonly value: string) {}

    public static from(value: string) {
        const siretRegex = /^[0-9]{14}$/;
        if (!siretRegex.test(value)) {
            return new SiretInvalidError();
        }

        return new Siret(value);
    }
}