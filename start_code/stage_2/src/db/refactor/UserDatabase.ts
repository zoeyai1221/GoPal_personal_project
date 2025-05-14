import { User } from "../../types";
import { CommonDatabase } from "./CommonDatabase";

export class UserDatabase extends CommonDatabase<User> {
    constructor() {
        super('../../data/users.json');
    }

    constructIndexedData(data: User[]): Map<string, User> {
        return new Map(data.map(user => [user.id, user]));
    }

    findByEmail(email: string): User | undefined {
        return this.find(user => user.email === email);
    }
}