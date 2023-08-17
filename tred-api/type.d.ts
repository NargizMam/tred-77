export interface Message {
    id: string,
    message: string,
    author: string ,
    datetime: string,
    image: string | null
}
export type MessageWithoutId = Omit<Message, 'id'>;