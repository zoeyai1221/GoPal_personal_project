import fs from 'fs/promises';
import path from 'path';
import { Indexed } from "../../types";

export abstract class CommonDatabase<GenericData extends Indexed> {
    private indexedData: Map<string, GenericData> = new Map();
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = path.join(__dirname, filePath);
    }

    abstract constructIndexedData(data: GenericData[]): Map<string, GenericData>;

    async initialize(): Promise<void> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const loadedData = JSON.parse(data) as GenericData[];
            this.indexedData = this.constructIndexedData(loadedData);
        } catch (error: any) {
            // Handle if no such file or directory
            if (error.code === 'ENOENT') {
                console.log(`No existing data found from ${this.filePath}, starting with empty database`);
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
        const data = JSON.stringify(Array.from(this.indexedData.values()), null, 2);
        await fs.writeFile(this.filePath, data);
        console.log(`Saved ${this.indexedData.size} data to disk`);
    }

    getAll(): GenericData[] {
        return Array.from(this.indexedData.values());
    }

    getById(id: string): GenericData | undefined {
        return this.indexedData.get(id);
    }

    /**
     * Create a new event
     * @param event - Event fields other than id
     */
    create(data: GenericData): GenericData {
        const id = Date.now().toString(); // Simple ID generation
        const newData = { ...data, id };
        this.indexedData.set(id, newData);
        return newData;
    }

    find(predicate: (event: GenericData) => boolean): GenericData | undefined {
        return this.getAll().find(predicate);
    }

    /**
     * update event per id
     * @param id - the id of updated event
     * @param updatedData - the fields need update
     */
    update(id: string, partialData: Partial<GenericData>): GenericData | undefined {
        const data = this.indexedData.get(id) as GenericData | undefined;
        if (!data) return undefined;

        const updatedData = { ...data, ...partialData } as GenericData;
        this.indexedData.set(id, updatedData);
        return updatedData;
    }

    delete(id: string): boolean {
        return this.indexedData.delete(id);
    }
}

