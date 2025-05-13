import databaseManagerInstance from "../db/databaseManager";
import { Event, EventType } from "../types";

const userDb = databaseManagerInstance.getUserDb();
const eventDb = databaseManagerInstance.getEventDb();

export type EnrichedEvent = Event & {
    hostName: string;
}

export class EventService {
    /**
     * Fetch all events with host names
     */
    static getAllWithHostName(): EnrichedEvent[] {
        const events = eventDb.getAll();
        return events.map(event => ({
            ...event,
            hostName: userDb.getById(event.host)?.name ?? 'unknown'
        }));
    }

    /**
     * Fetch events with host names for specific event type (e.g. dining)
     * @param type - type of the event
     * @returns - event info
     */
    static getByTypeWithHost(type: EventType): EnrichedEvent[] {
        return this.getAllWithHostName().filter(e => e.type === type);
    }

    /**
     * Fetch events with host names for specific event id
     * @param eventId - even ID
     * @returns - event info
     */
    static getByIdWithHost(eventId: string): EnrichedEvent | null {
        const event = eventDb.getById(eventId);
        
        if (!event) {
            return null;
        }

        return {
            ...event,
            hostName: userDb.getById(event.host)?.name ?? 'Unknown',
        };
    }

    /**
     * Fetch user's created events with host names
     * @param userId - user ID
     * @returns - event info
     */
    static getCreatedEvents(userId: string): EnrichedEvent[] {
        return this.getAllWithHostName().filter(e => e.host === userId);
    }
    
    /**
     * Fetch user's joined events with host names
     * @param userId - user ID
     * @returns - event info
     */
    static getJoinedEvents(userId: string): EnrichedEvent[] {
        return this.getAllWithHostName().filter(e => e.attendees.includes(userId)); // to exclude created: && e.host !== userId
    }

    // Search by name with enriched event info
    static searchByName(events: EnrichedEvent[], keyword: string): EnrichedEvent[] {
        const query = keyword.toLowerCase();
        return events.filter(e => {
            if (e.type === EventType.Dining) {
                return e.name.toLowerCase().includes(query)
                || e.restaurant.toLowerCase().includes(query)
            } else if (e.type === EventType.Trip) {
                return (
                e.name.toLowerCase().includes(query) ||
                e.destination.toLowerCase().includes(query)
                );
            }
            return (e as any).name.toLowerCase().includes(query);
        });
    }

    // Filter by date with enriched event info
    static filterByDate(events: EnrichedEvent[], date: string): EnrichedEvent[] {
        return events.filter(e => e.date === date);
    }
}