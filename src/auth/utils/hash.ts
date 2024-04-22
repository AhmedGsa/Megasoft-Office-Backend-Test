import * as bcrypt from 'bcryptjs';

export class Hash {
    static async hash(password: string) : Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async compare(password: string, hash: string) : Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}