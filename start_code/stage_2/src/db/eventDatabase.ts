import fs from 'fs/promises';
import path from 'path';
import { Event } from '../types';

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
            console.log(`Loaded ${this.events.size} events from disk`);
            console.log('Events:', Array.from(this.events.values()));
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
        console.log('Events:', this.events);
        return Array.from(this.events.values());
    }

    getById(id: string): Event | undefined {
        return this.events.get(id);
    }

    create(event: Omit<Event,'id'>): Event {
        const id = (this.nextId++).toString();
        const newEvent: Event = { id, ...event };
        this.events.set(id, newEvent);
        return newEvent;
    }

    update(id: string, eventData: Partial<Event>): Event | undefined {
        const event = this.events.get(id);
        if (!event) return undefined;

        const updatedEvent = { ...event, ...eventData };
        this.events.set(id, updatedEvent);
        return updatedEvent;
    }

    // getAttendeesId()

    searchByName(query: string): Event[] {
        query = query.toLowerCase();
        return this.getAll().filter(event => 
            event.name.toLowerCase().includes(query)
            || event.restaurant.toLowerCase().includes(query)
        );
    }

    filterByDate(date: string): Event[] {
        return this.getAll().filter(event => event.date === date);
    }

    delete(id: string): boolean {
        return this.events.delete(id);
    }
}
