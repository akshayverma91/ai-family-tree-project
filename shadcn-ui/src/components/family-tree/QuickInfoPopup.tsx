import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FamilyMember } from '@/types/family';
import { X, ExternalLink } from 'lucide-react';

interface QuickInfoPopupProps {
  member: FamilyMember;
  position: { x: number; y: number };
  onClose: () => void;
  onOpenDetails: () => void;
}

export const QuickInfoPopup: React.FC<QuickInfoPopupProps> = ({
  member,
  position,
  onClose,
  onOpenDetails
}) => {
  const getAge = () => {
    if (!member.birthDate) return null;
    const birthYear = new Date(member.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    if (member.deathDate) {
      const deathYear = new Date(member.deathDate).getFullYear();
      return `${deathYear - birthYear} years (deceased)`;
    }
    return `${currentYear - birthYear} years old`;
  };

  return (
    <div
      className="fixed z-50 animate-in fade-in zoom-in-95 duration-200"
      style={{
        left: Math.min(position.x, window.innerWidth - 320),
        top: Math.min(position.y, window.innerHeight - 300),
      }}
    >
      <Card className="w-80 shadow-xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{member.avatar || '👤'}</span>
              <div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                {getAge() && (
                  <p className="text-sm text-muted-foreground">{getAge()}</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {member.occupation && (
            <div>
              <Badge variant="secondary">{member.occupation}</Badge>
            </div>
          )}
          
          {member.location && (
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span className="text-sm">{member.location}</span>
            </div>
          )}
          
          {member.bio && (
            <div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {member.bio}
              </p>
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenDetails}
              className="flex items-center space-x-1"
            >
              <ExternalLink className="h-3 w-3" />
              <span>View Full Details</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};