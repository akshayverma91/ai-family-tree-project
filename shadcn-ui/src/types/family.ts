export interface FamilyMember {
  id: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  gender: 'male' | 'female' | 'other';
  avatar?: string;
  occupation?: string;
  location?: string;
  bio?: string;
  spouse?: string;
  children?: string[];
  parents?: string[];
  relationship?: string;
  isAlive: boolean;
  lifeStories?: string[]; // Array of life story IDs
}

export interface TreeNode {
  id: string;
  member: FamilyMember;
  x: number;
  y: number;
  level: number;
  children: TreeNode[];
  parent?: TreeNode;
  expanded: boolean;
}

export interface TreeConnection {
  from: string;
  to: string;
  type: 'parent' | 'spouse';
}