import React from 'react';
import { FamilyMember } from '@/types/family';

interface ImprovedFamilyTreeProps {
  familyMembers: FamilyMember[];
  onMemberClick: (member: FamilyMember) => void;
}

interface TreePosition {
  x: number;
  y: number;
  member: FamilyMember;
}

export const ImprovedFamilyTree: React.FC<ImprovedFamilyTreeProps> = ({
  familyMembers,
  onMemberClick
}) => {
  const calculatePositions = (): TreePosition[] => {
    const positions: TreePosition[] = [];
    const memberMap = new Map(familyMembers.map(m => [m.id, m]));
    
    // Find root generation (members with no parents)
    const rootMembers = familyMembers.filter(m => !m.parents || m.parents.length === 0);
    
    // Arrange couples side by side
    const processedIds = new Set<string>();
    const currentY = 50;
    
    rootMembers.forEach((member, index) => {
      if (processedIds.has(member.id)) return;
      
      const currentX = 100 + (index * 400);
      
      // Position the member
      positions.push({ x: currentX, y: currentY, member });
      processedIds.add(member.id);
      
      // Position spouse next to them
      if (member.spouse) {
        const spouse = memberMap.get(member.spouse);
        if (spouse && !processedIds.has(spouse.id)) {
          positions.push({ x: currentX + 200, y: currentY, member: spouse });
          processedIds.add(spouse.id);
        }
      }
      
      // Position their children below
      if (member.children) {
        const childY = currentY + 200;
        const childStartX = currentX + 100 - (member.children.length * 100) / 2;
        
        member.children.forEach((childId, childIndex) => {
          const child = memberMap.get(childId);
          if (child && !processedIds.has(child.id)) {
            positions.push({
              x: childStartX + (childIndex * 200),
              y: childY,
              member: child
            });
            processedIds.add(child.id);
            
            // Position child's spouse
            if (child.spouse) {
              const childSpouse = memberMap.get(child.spouse);
              if (childSpouse && !processedIds.has(childSpouse.id)) {
                positions.push({
                  x: childStartX + (childIndex * 200) + 150,
                  y: childY,
                  member: childSpouse
                });
                processedIds.add(childSpouse.id);
              }
            }
            
            // Position grandchildren
            if (child.children) {
              const grandChildY = childY + 200;
              const grandChildStartX = childStartX + (childIndex * 200) + 75 - (child.children.length * 75) / 2;
              
              child.children.forEach((grandChildId, grandChildIndex) => {
                const grandChild = memberMap.get(grandChildId);
                if (grandChild && !processedIds.has(grandChild.id)) {
                  positions.push({
                    x: grandChildStartX + (grandChildIndex * 150),
                    y: grandChildY,
                    member: grandChild
                  });
                  processedIds.add(grandChild.id);
                }
              });
            }
          }
        });
      }
    });
    
    return positions;
  };

  const positions = calculatePositions();
  const memberMap = new Map(familyMembers.map(m => [m.id, m]));

  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    positions.forEach((pos) => {
      const member = pos.member;
      
      // Spouse connections (horizontal line)
      if (member.spouse) {
        const spousePos = positions.find(p => p.member.id === member.spouse);
        if (spousePos && pos.x < spousePos.x) { // Only draw once per couple
          connections.push(
            <line
              key={`spouse-${member.id}-${member.spouse}`}
              x1={pos.x + 75}
              y1={pos.y + 50}
              x2={spousePos.x + 25}
              y2={spousePos.y + 50}
              stroke="#e5e7eb"
              strokeWidth="2"
            />
          );
        }
      }
      
      // Parent-child connections (vertical lines)
      if (member.children) {
        member.children.forEach(childId => {
          const childPos = positions.find(p => p.member.id === childId);
          if (childPos) {
            const spousePos = member.spouse ? positions.find(p => p.member.id === member.spouse) : null;
            const parentCenterX = spousePos ? (pos.x + spousePos.x + 100) / 2 : pos.x + 50;
            
            // Vertical line from parents to children level
            connections.push(
              <line
                key={`parent-line-${member.id}-${childId}`}
                x1={parentCenterX}
                y1={pos.y + 100}
                x2={parentCenterX}
                y2={childPos.y - 25}
                stroke="#e5e7eb"
                strokeWidth="2"
              />
            );
            
            // Horizontal line to child
            connections.push(
              <line
                key={`child-line-${member.id}-${childId}`}
                x1={parentCenterX}
                y2={childPos.y - 25}
                x2={childPos.x + 50}
                y2={childPos.y - 25}
                stroke="#e5e7eb"
                strokeWidth="2"
              />
            );
            
            // Vertical line to child
            connections.push(
              <line
                key={`child-vertical-${member.id}-${childId}`}
                x1={childPos.x + 50}
                y1={childPos.y - 25}
                x2={childPos.x + 50}
                y2={childPos.y}
                stroke="#e5e7eb"
                strokeWidth="2"
              />
            );
          }
        });
      }
    });
    
    return connections;
  };

  const maxX = Math.max(...positions.map(p => p.x)) + 200;
  const maxY = Math.max(...positions.map(p => p.y)) + 150;

  return (
    <div className="relative w-full h-full overflow-auto bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <svg
        width={maxX}
        height={maxY}
        className="absolute top-0 left-0"
        style={{ zIndex: 1 }}
      >
        {renderConnections()}
      </svg>
      
      <div className="relative" style={{ zIndex: 2 }}>
        {positions.map((pos) => (
          <div
            key={pos.member.id}
            className="absolute cursor-pointer transform hover:scale-105 transition-all duration-200"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`
            }}
            onClick={() => onMemberClick(pos.member)}
          >
            <div className={`
              w-24 h-32 rounded-lg shadow-lg p-2 text-center
              ${pos.member.gender === 'male' 
                ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white' 
                : 'bg-gradient-to-br from-pink-400 to-pink-600 text-white'
              }
              hover:shadow-xl border-2 border-white
            `}>
              <div className="text-2xl mb-1">{pos.member.avatar || '👤'}</div>
              <div className="text-xs font-bold leading-tight">
                {pos.member.name}
              </div>
              <div className="text-xs opacity-90 mt-1">
                {pos.member.birthDate ? 
                  new Date().getFullYear() - new Date(pos.member.birthDate).getFullYear() : 
                  '?'
                }
              </div>
              {pos.member.occupation && (
                <div className="text-xs opacity-80 leading-tight mt-1">
                  {pos.member.occupation.length > 12 ? 
                    pos.member.occupation.substring(0, 10) + '...' : 
                    pos.member.occupation
                  }
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};