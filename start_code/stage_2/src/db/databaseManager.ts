import { EventDatabase } from "./eventDatabase";
import { UserDatabase } from "./userDatabase";

class DatabaseManager {
    private userDb: UserDatabase;
    private eventDb: EventDatabase;

    constructor() {
        this.userDb = new UserDatabase();
        this.eventDb = new EventDatabase();
    }

    public getUserDb(): UserDatabase {
        return this.userDb;
    }

    public getEventDb(): EventDatabase {
        return this.eventDb;
    }

    public async initialize() {
        return Promise.all([
            this.userDb.initialize(),
            this.eventDb.initialize(),
        ]).then(() => {
            console.log(`Loaded ${this.userDb.getAll().length} users from disk`);
            console.log(`Loaded ${this.eventDb.getAll().length} events from disk`);
            console.log('All databases initialized successfully');
        }).catch(err => {
            console.error('Error initializing databases:', err);
            process.exit(1);
        });
    }
}

// Singleton
const databaseManagerInstance = new DatabaseManager();
export default databaseManagerInstance;
