import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Download, Upload, Sparkles } from 'lucide-react';

interface FamilyTreeHeaderProps {
  totalMembers: number;
  onAddMember: () => void;
  onImport: () => void;
  onExport: () => void;
  onToggleAI: () => void;
  showAI: boolean;
}

export const FamilyTreeHeader: React.FC<FamilyTreeHeaderProps> = ({
  totalMembers,
  onAddMember,
  onImport,
  onExport,
  onToggleAI,
  showAI
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Family Tree</h1>
            </div>
            <Badge variant="secondary" className="text-sm">
              {totalMembers} {totalMembers === 1 ? 'member' : 'members'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={showAI ? "default" : "outline"}
              size="sm"
              onClick={onToggleAI}
              className="flex items-center space-x-1"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Assistant</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onAddMember}
              className="flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Member</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onImport}
              className="flex items-center space-x-1"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center space-x-1"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Click on family members to view quick info, or use the info button for detailed view. 
            Expand/collapse branches using the arrow buttons.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};