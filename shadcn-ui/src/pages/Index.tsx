import React, { useState } from 'react';
import { FamilyTree } from '@/components/family-tree/FamilyTree';
import { FamilyTreeHeader } from '@/components/family-tree/FamilyTreeHeader';
import { AIAssistant } from '@/components/family-tree/AIAssistant';
import { sampleFamilyData } from '@/data/sampleFamily';
import { FamilyMember } from '@/types/family';
import { NewMemberSuggestion } from '@/types/ai';
import { toast } from 'sonner';

export default function Index() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(sampleFamilyData);
  const [showAI, setShowAI] = useState(false);

  const handleAddMember = (newMember?: NewMemberSuggestion) => {
    if (newMember) {
      // Add AI-suggested member
      const member: FamilyMember = {
        id: `new-${Date.now()}`,
        name: newMember.name,
        gender: 'other',
        isAlive: true,
        birthDate: newMember.birthDate,
        occupation: newMember.occupation,
        location: newMember.location,
        avatar: '👤'
      };
      
      setFamilyMembers(prev => [...prev, member]);
      toast.success(`Added ${member.name} to the family tree`);
    } else {
      // Manual add member (placeholder)
      toast.info('Add member form would open here');
    }
  };

  const handleImport = () => {
    toast.info('Import functionality would open file picker');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(familyMembers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'family-tree.json';
    link.click();
    toast.success('Family tree exported successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-4">
        <FamilyTreeHeader
          totalMembers={familyMembers.length}
          onAddMember={() => handleAddMember()}
          onImport={handleImport}
          onExport={handleExport}
          onToggleAI={() => setShowAI(!showAI)}
          showAI={showAI}
        />
        
        <div className="flex gap-6">
          <div className="flex-1">
            <FamilyTree familyMembers={familyMembers} />
          </div>
          
          {showAI && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-4">
                <AIAssistant onAddMember={handleAddMember} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}