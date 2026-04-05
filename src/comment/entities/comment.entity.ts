export class Comment {
  id: string; // uuid v4
  content: string;
  articleId: string;
  authorId: string | null;
  createdAt: number;
}
