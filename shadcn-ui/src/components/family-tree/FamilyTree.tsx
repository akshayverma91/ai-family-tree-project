import React, { useState, useCallback, useMemo } from 'react';
import { FamilyMember, TreeNode } from '@/types/family';
import { FamilyNode } from './FamilyNode';
import { QuickInfoPopup } from './QuickInfoPopup';
import { DetailsSidePanel } from './DetailsSidePanel';

interface FamilyTreeProps {
  familyMembers: FamilyMember[];
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({ familyMembers }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [quickInfoMember, setQuickInfoMember] = useState<FamilyMember | null>(null);
  const [quickInfoPosition, setQuickInfoPosition] = useState({ x: 0, y: 0 });
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);

  // Build tree structure
  const treeData = useMemo(() => {
    const memberMap = new Map(familyMembers.map(m => [m.id, m]));
    const roots: FamilyMember[] = [];
    
    // Find root members (those without parents)
    familyMembers.forEach(member => {
      if (!member.parents || member.parents.length === 0) {
        roots.push(member);
      }
    });

    const buildTreeNode = (member: FamilyMember, level: number = 0): TreeNode => {
      const children = member.children 
        ? member.children
            .map(childId => memberMap.get(childId))
            .filter(Boolean)
            .map(child => buildTreeNode(child!, level + 1))
        : [];

      return {
        id: member.id,
        member,
        x: 0,
        y: 0,
        level,
        children,
        expanded: expandedNodes.has(member.id)
      };
    };

    return roots.map(root => buildTreeNode(root));
  }, [familyMembers, expandedNodes]);

  const handleToggleExpand = useCallback((memberId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  }, []);

  const handleQuickInfo = useCallback((member: FamilyMember, event: React.MouseEvent) => {
    event.preventDefault();
    setQuickInfoMember(member);
    setQuickInfoPosition({ x: event.clientX + 10, y: event.clientY + 10 });
  }, []);

  const handleShowDetails = useCallback((member: FamilyMember) => {
    setSelectedMember(member);
    setDetailsPanelOpen(true);
    setQuickInfoMember(null);
  }, []);

  const renderTreeLevel = (nodes: TreeNode[], level: number = 0) => {
    if (nodes.length === 0) return null;

    return (
      <div className="tree-level" style={{ marginLeft: level > 0 ? '40px' : '0' }}>
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          {nodes.map(node => (
            <div key={node.id} className="tree-branch">
              <div className="tree-node-container">
                <FamilyNode
                  member={node.member}
                  isExpanded={node.expanded}
                  hasChildren={node.children.length > 0}
                  onToggleExpand={() => handleToggleExpand(node.id)}
                  onShowDetails={() => handleShowDetails(node.member)}
                  onQuickInfo={(e) => handleQuickInfo(node.member, e)}
                />
                
                {/* Connection lines */}
                {node.children.length > 0 && node.expanded && (
                  <div className="relative">
                    <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-muted-foreground/30 transform -translate-x-0.5" />
                    {node.children.length > 1 && (
                      <div className="absolute top-6 left-1/4 right-1/4 h-0.5 bg-muted-foreground/30" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Render children if expanded */}
              {node.expanded && node.children.length > 0 && (
                <div className="mt-6">
                  {renderTreeLevel(node.children, level + 1)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="family-tree-container p-6">
      <div className="family-tree overflow-auto">
        {renderTreeLevel(treeData)}
      </div>

      {/* Quick Info Popup */}
      {quickInfoMember && (
        <QuickInfoPopup
          member={quickInfoMember}
          position={quickInfoPosition}
          onClose={() => setQuickInfoMember(null)}
          onOpenDetails={() => handleShowDetails(quickInfoMember)}
        />
      )}

      {/* Details Side Panel */}
      <DetailsSidePanel
        member={selectedMember}
        isOpen={detailsPanelOpen}
        onClose={() => {
          setDetailsPanelOpen(false);
          setSelectedMember(null);
        }}
        familyMembers={familyMembers}
      />
    </div>
  );
};