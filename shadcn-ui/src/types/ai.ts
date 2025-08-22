export interface AISuggestion {
  name: string;
  relationship: string;
  estimatedBirth: string;
  confidence: number;
  reasoning: string;
  suggestedDetails: {
    occupation: string;
    location: string;
  };
}

export interface NewMemberSuggestion {
  name: string;
  relationship?: string;
  birthDate?: string;
  occupation?: string;
  location?: string;
}