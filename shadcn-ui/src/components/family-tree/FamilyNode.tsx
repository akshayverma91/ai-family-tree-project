import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FamilyMember } from '@/types/family';
import { ChevronDown, ChevronRight, Info, User } from 'lucide-react';

interface FamilyNodeProps {
  member: FamilyMember;
  isExpanded: boolean;
  hasChildren: boolean;
  onToggleExpand: () => void;
  onShowDetails: () => void;
  onQuickInfo: (e: React.MouseEvent) => void;
}

export const FamilyNode: React.FC<FamilyNodeProps> = ({
  member,
  isExpanded,
  hasChildren,
  onToggleExpand,
  onShowDetails,
  onQuickInfo
}) => {
  const getAgeString = () => {
    if (!member.birthDate) return '';
    const birthYear = new Date(member.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    if (member.deathDate) {
      const deathYear = new Date(member.deathDate).getFullYear();
      return `(${birthYear}-${deathYear})`;
    }
    return `(Age ${currentYear - birthYear})`;
  };

  return (
    <Card 
      className="family-node relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 min-w-[200px] max-w-[250px]"
      onClick={onQuickInfo}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{member.avatar || '👤'}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-sm leading-tight">{member.name}</h3>
              <p className="text-xs text-muted-foreground">{getAgeString()}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails();
            }}
          >
            <Info className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="space-y-1">
          {member.occupation && (
            <Badge variant="secondary" className="text-xs">
              {member.occupation}
            </Badge>
          )}
          {member.location && (
            <p className="text-xs text-muted-foreground truncate">
              📍 {member.location}
            </p>
          )}
        </div>

        {hasChildren && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-6 w-6 p-0 bg-background border rounded-full shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};