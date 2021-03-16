export interface Book {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  like?: number;
  image?: string;
}
