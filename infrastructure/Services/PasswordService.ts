import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {PasswordValidOrError} from "../../domain/errors/PasswordValidOrError";

export class PasswordService {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean | PasswordValidOrError> {
        if ( await bcrypt.compare(plainPassword, hashedPassword)) {
            return true;
        } else {
            return new PasswordValidOrError();
        }
}
}
