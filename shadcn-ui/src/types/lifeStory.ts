export interface LifeStory {
  id: string;
  title: string;
  content: string;
  category: 'childhood' | 'youth' | 'career' | 'family' | 'achievement' | 'struggle' | 'memory' | 'other';
  date?: string; // Optional date when the story/event occurred
  emotion: 'happy' | 'sad' | 'proud' | 'challenging' | 'nostalgic' | 'inspiring';
  createdAt: string;
  updatedAt: string;
  isShared: boolean; // Whether this story is shared with other family members
  attachments?: StoryAttachment[];
}

export interface StoryAttachment {
  id: string;
  fileName: string;
  fileType: 'image' | 'audio' | 'video' | 'document';
  fileSize: number;
  filePath: string;
  uploadedAt: string;
}

export interface LifeStoryCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
}