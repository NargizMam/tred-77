import {promises as fs} from 'fs';
import {randomUUID} from 'crypto';
import {Message, MessageWithoutId} from "./type";

const filename = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getPosts() {
        return data;
    },
    async addPost(messageData: MessageWithoutId) {
        const id = randomUUID();

        let message: Message = {
            id: id,
            ...messageData
        };
        data.push(message);
        await this.save();
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;
