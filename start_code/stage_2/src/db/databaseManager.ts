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
            console.log('All databases initialized successfully');
        }).catch(err => {
            console.error('Error initializing databases:', err);
            process.exit(1);
        });
    }
}

// Export a single database manager instance to maintain the global uniqueness
// of databases (i.e. no multiple event/user databases going around, which
// mess up data access, creates something we call data inconsistency).
// Singleton Pattern https://refactoring.guru/design-patterns/singleton
const databaseManagerInstance = new DatabaseManager();
export default databaseManagerInstance;
// "Fun fact": for our simple app, a singleton pattern would solve the issue,
// because there's only 1 MacBook is running this app, but if it's running on
// multiple machines (i.e. distributed systems), this is actually one of the
// core problems it's solving, to make sure data stay accurate and consistent.
