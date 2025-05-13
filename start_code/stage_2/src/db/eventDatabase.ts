import fs from 'fs/promises';
import path from 'path';
import { Event, EventType } from '../types';

export class EventDatabase {
    private events: Map<string, Event> = new Map();
    private filePath: string;
    private nextId = 1;

    constructor() {
        this.filePath = path.join(__dirname, '../data/events.json');
    }

    async initialize(): Promise<void> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const events = JSON.parse(data) as Event[];
            events.forEach(event => {
                this.events.set(event.id, event);
            });

            // Rebase the counter so we don’t reissue existing IDs
            const maxId = events
            .map(event => parseInt(event.id, 10)) // convert IDs from string to int
            .filter(n => !isNaN(n)) // filter out ilegitimate NaN
            .reduce((m, n) => Math.max(m, n), 0); // get the current max ID
            this.nextId = maxId + 1; // set nextId as maxId + 1
            // console.log(`Loaded ${this.events.size} events from disk`);
            // console.log('Events:', Array.from(this.events.values()));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.log('No existing event data found, starting with empty database');
                await fs.mkdir(path.dirname(this.filePath), { recursive: true });
                await fs.writeFile(this.filePath, '[]');
            }
        }
    }

    async save(): Promise<void> {
        const data = JSON.stringify(Array.from(this.events.values()), null, 2);
        await fs.writeFile(this.filePath, data);
        console.log(`Saved ${this.events.size} events to disk`);
    }

    getAll(): Event[] {
        return Array.from(this.events.values());
    }

    getById(id: string): Event | undefined {
        return this.events.get(id);
    }

    /**
     * Create a new event
     * @param event - Event fields other than id
     */
    create<T extends Event>(event: Omit<T,'id'>): T {
        const id = (this.nextId++).toString();
        const newEvent = { id, ...event } as T;
        this.events.set(id, newEvent);
        return newEvent;
    }

    /**
     * update event per id
     * @param id - the id of updated event
     * @param eventData - the fields need update
     */
    update<T extends Event>(id: string, eventData: Partial<Omit<T,'id'>>): T | undefined {
        const event = this.events.get(id) as T | undefined;
        if (!event) return undefined;

        const updatedEvent = { ...event, ...eventData } as T;
        this.events.set(id, updatedEvent);
        return updatedEvent;
    }

    // getAttendeesId()

    searchByName(query: string): Event[] {
        query = query.toLowerCase();
        return this.getAll().filter(event => {
            if (event.type === EventType.Dining) {
                return event.name.toLowerCase().includes(query)
                || event.restaurant.toLowerCase().includes(query)
            };

            if (event.type === EventType.Trip) {
                return event.name.toLowerCase().includes(query)
                || event.destination.toLowerCase().includes(query)
            };
            
            return (event as any).name.toLowerCase().includes(query)
        });
    }

    filterByDate(date: string): Event[] {
        return this.getAll().filter(event => event.date === date);
    }

    delete(id: string): boolean {
        return this.events.delete(id);
    }
}
