// db/userDatabase.ts
import fs from 'fs/promises';
import path from 'path';
import { User } from '../types';

export class UserDatabase {
  private users: Map<string, User> = new Map();
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../data/users.json');
  }

  async initialize(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const users = JSON.parse(data) as User[];
      users.forEach(user => {
        this.users.set(user.id, user);
      });
      // console.log(`Loaded ${this.users.size} users from disk`);
    } catch (error: any) {
        // Handle if no such file or directory
        if (error.code === 'ENOENT') {
          console.log('No existing user data found, starting with empty database');
          // Create the directory if it doesn't exist
          await fs.mkdir(path.dirname(this.filePath), { recursive: true });
          // Initialize with empty array
          await fs.writeFile(this.filePath, '[]');
        } else {
          throw error;
        }
      }
    }

  async save(): Promise<void> {
    const data = JSON.stringify(Array.from(this.users.values()), null, 2); // convert user data to json string
    await fs.writeFile(this.filePath, data);
    console.log(`Saved ${this.users.size} users to disk`);
  }

  getAll(): User[] {
    return Array.from(this.users.values());
  }

  getById(id: string): User | undefined {
    return this.users.get(id);
  }

  create(user: Omit<User, 'id'>): User {
    const id = Date.now().toString(); // Simple ID generation
    const newUser: User = { id, ...user };
    this.users.set(id, newUser);
    return newUser;
  }

  update(id: string, userData: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }

  findByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(user => user.email === email);
  }
}

// export const userDb = new UserDatabase();
