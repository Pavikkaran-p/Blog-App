export interface Blog extends Document {
    title: string;
    content: string;
    tags: string[];
    createdAt: Date;
    userId?: string;
  }