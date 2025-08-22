export interface LifeStory {
  id: string;
  title: string;
  content: string;
  category: 'childhood' | 'youth' | 'career' | 'family' | 'achievement' | 'struggle' | 'memory' | 'other';
  date?: string; // Optional date when the story/event occurred
  emotion: 'happy' | 'sad' | 'proud' | 'challenging' | 'nostalgic' | 'inspiring';
  createdAt: string;
  isShared: boolean; // Whether this story is shared with other family members
}

export interface LifeStoryCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
}