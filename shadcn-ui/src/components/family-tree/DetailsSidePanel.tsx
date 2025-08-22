import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FamilyMember } from '@/types/family';
import { Calendar, MapPin, Briefcase, Heart, Users, Edit } from 'lucide-react';

interface DetailsSidePanelProps {
  member: FamilyMember | null;
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
}

export const DetailsSidePanel: React.FC<DetailsSidePanelProps> = ({
  member,
  isOpen,
  onClose,
  familyMembers
}) => {
  if (!member) return null;

  const getRelatedMember = (id: string) => {
    return familyMembers.find(m => m.id === id);
  };

  const getAge = () => {
    if (!member.birthDate) return null;
    const birthYear = new Date(member.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    if (member.deathDate) {
      const deathYear = new Date(member.deathDate).getFullYear();
      return `${deathYear - birthYear} years (${birthYear}-${deathYear})`;
    }
    return `${currentYear - birthYear} years old (born ${birthYear})`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{member.avatar || '👤'}</span>
            <div className="flex-1">
              <SheetTitle className="text-2xl">{member.name}</SheetTitle>
              {getAge() && (
                <SheetDescription className="text-base">
                  {getAge()}
                </SheetDescription>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            {member.occupation && (
              <div className="flex items-center space-x-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Badge variant="secondary">{member.occupation}</Badge>
                </div>
              </div>
            )}

            {member.location && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{member.location}</span>
              </div>
            )}

            {member.birthDate && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Born: {new Date(member.birthDate).toLocaleDateString()}
                </span>
              </div>
            )}

            {member.deathDate && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Died: {new Date(member.deathDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Biography */}
          {member.bio && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Biography</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </>
          )}

          {/* Family Relationships */}
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Family Relationships</span>
            </h3>

            {/* Spouse */}
            {member.spouse && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center space-x-2">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span>Spouse</span>
                </h4>
                {(() => {
                  const spouse = getRelatedMember(member.spouse);
                  return spouse ? (
                    <div className="flex items-center space-x-2 ml-5">
                      <span className="text-sm">{spouse.avatar || '👤'}</span>
                      <span className="text-sm">{spouse.name}</span>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {/* Parents */}
            {member.parents && member.parents.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Parents</h4>
                <div className="space-y-1 ml-5">
                  {member.parents.map(parentId => {
                    const parent = getRelatedMember(parentId);
                    return parent ? (
                      <div key={parentId} className="flex items-center space-x-2">
                        <span className="text-sm">{parent.avatar || '👤'}</span>
                        <span className="text-sm">{parent.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Children */}
            {member.children && member.children.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Children</h4>
                <div className="space-y-1 ml-5">
                  {member.children.map(childId => {
                    const child = getRelatedMember(childId);
                    return child ? (
                      <div key={childId} className="flex items-center space-x-2">
                        <span className="text-sm">{child.avatar || '👤'}</span>
                        <span className="text-sm">{child.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <Separator />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">AI Insights</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Based on family data, {member.name} belongs to generation {
                  member.parents?.length ? 
                    (member.children?.length ? 'middle' : 'younger') : 
                    'older'
                } of the family tree. 
                {member.children && member.children.length > 0 && 
                  ` Has ${member.children.length} ${member.children.length === 1 ? 'child' : 'children'}.`
                }
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};