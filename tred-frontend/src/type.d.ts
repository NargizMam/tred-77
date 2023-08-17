export interface ApiPost {
  id: string,
  author: string,
  message: string,
  image: string | null,
  datetime: string
}

export interface PostMutation {
  author: string,
  message: string,
  image: string | null,
}