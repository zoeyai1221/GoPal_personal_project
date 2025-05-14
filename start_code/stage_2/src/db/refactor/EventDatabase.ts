import { Event, EventType } from "../../types";
import { CommonDatabase } from "./CommonDatabase";

export class EventDatabase extends CommonDatabase<Event> {
    constructor() {
        super('../../data/events.json');
    }

    constructIndexedData(data: Event[]): Map<string, Event> {
        // if there are validations needed, we can add them here
        return new Map(data.map(event => [event.id, event]));
    }

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
}