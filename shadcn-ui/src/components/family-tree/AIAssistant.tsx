import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, Search, UserPlus } from 'lucide-react';
import { AISuggestion, NewMemberSuggestion } from '@/types/ai';

interface AIAssistantProps {
  onAddMember: (suggestion: NewMemberSuggestion) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onAddMember }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSuggestions = async () => {
    if (!query.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockSuggestions = [
      {
        name: query.includes('grandfather') ? 'William Smith' : 'Anna Johnson',
        relationship: query.includes('grandfather') ? 'Grandfather' : 'Aunt',
        estimatedBirth: query.includes('grandfather') ? '1925' : '1950',
        confidence: 85,
        reasoning: `Based on family patterns and the query "${query}", this person likely exists in the family tree.`,
        suggestedDetails: {
          occupation: query.includes('grandfather') ? 'Farmer' : 'Nurse',
          location: 'Rural area or small town'
        }
      },
      {
        name: query.includes('grandfather') ? 'Eleanor Smith' : 'Robert Johnson',
        relationship: query.includes('grandfather') ? 'Grandmother' : 'Uncle',
        estimatedBirth: query.includes('grandfather') ? '1928' : '1948',
        confidence: 78,
        reasoning: 'Probable spouse or sibling based on family structure analysis.',
        suggestedDetails: {
          occupation: query.includes('grandfather') ? 'Homemaker' : 'Mechanic',
          location: 'Same area as related family members'
        }
      }
    ];
    
    setSuggestions(mockSuggestions);
    setIsGenerating(false);
  };

  const handleAddSuggestion = (suggestion: AISuggestion) => {
    onAddMember({
      name: suggestion.name,
      relationship: suggestion.relationship,
      birthDate: `${suggestion.estimatedBirth}-01-01`,
      ...suggestion.suggestedDetails
    });
    setSuggestions(suggestions.filter(s => s !== suggestion));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <span>AI Family Assistant</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Describe missing family members</label>
          <Textarea
            placeholder="e.g., 'I think my grandfather had a brother' or 'Looking for my great-aunt on mother's side'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
        
        <Button 
          onClick={handleGenerateSuggestions}
          disabled={!query.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Sparkles className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Generate Suggestions
            </>
          )}
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">AI Suggestions</h4>
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="border-dashed">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{suggestion.name}</h5>
                      <p className="text-sm text-muted-foreground">{suggestion.relationship}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.confidence}% match
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {suggestion.reasoning}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs space-y-1">
                      <p>Est. birth: {suggestion.estimatedBirth}</p>
                      <p>Occupation: {suggestion.suggestedDetails.occupation}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddSuggestion(suggestion)}
                      className="h-7"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            💡 Try queries like "missing grandparents", "father's siblings", or "maternal side"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};