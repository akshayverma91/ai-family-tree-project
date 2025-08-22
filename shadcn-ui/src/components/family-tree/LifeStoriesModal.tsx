import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FamilyMember } from '@/types/family';
import { LifeStory } from '@/types/lifeStory';
import { sampleLifeStories, lifeStoryCategories } from '@/data/sampleLifeStories';
import { BookOpen, Calendar, Heart, Plus, Share } from 'lucide-react';

interface LifeStoriesModalProps {
  member: FamilyMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LifeStoriesModal: React.FC<LifeStoriesModalProps> = ({
  member,
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!member) return null;

  const memberStories = member.lifeStories 
    ? sampleLifeStories.filter(story => member.lifeStories!.includes(story.id))
    : [];

  const filteredStories = selectedCategory === 'all' 
    ? memberStories 
    : memberStories.filter(story => story.category === selectedCategory);

  const getCategoryInfo = (category: string) => {
    return lifeStoryCategories.find(cat => cat.key === category) || lifeStoryCategories[7];
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      happy: 'bg-green-100 text-green-800',
      sad: 'bg-blue-100 text-blue-800',
      proud: 'bg-yellow-100 text-yellow-800',
      challenging: 'bg-red-100 text-red-800',
      nostalgic: 'bg-purple-100 text-purple-800',
      inspiring: 'bg-indigo-100 text-indigo-800'
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <span className="text-2xl">{member.avatar || '👤'}</span>
            <div>
              <span className="text-xl">{member.name}'s Life Stories</span>
              <p className="text-sm text-muted-foreground font-normal">
                {memberStories.length} {memberStories.length === 1 ? 'story' : 'stories'} shared
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="stories" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stories" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Life Stories</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Timeline</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="mt-4">
            <div className="flex space-x-4 h-[500px]">
              {/* Categories Sidebar */}
              <div className="w-48 flex-shrink-0">
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory('all')}
                  >
                    📚 All Stories ({memberStories.length})
                  </Button>
                  
                  {lifeStoryCategories.map(category => {
                    const count = memberStories.filter(s => s.category === category.key).length;
                    if (count === 0) return null;
                    
                    return (
                      <Button
                        key={category.key}
                        variant={selectedCategory === category.key ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.key)}
                      >
                        {category.icon} {category.label} ({count})
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Stories Content */}
              <div className="flex-1">
                <ScrollArea className="h-full pr-4">
                  {filteredStories.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No stories in this category yet.
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Story
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredStories.map((story) => {
                        const categoryInfo = getCategoryInfo(story.category);
                        return (
                          <Card key={story.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg mb-2">
                                    {story.title}
                                  </CardTitle>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge className={categoryInfo.color}>
                                      {categoryInfo.icon} {categoryInfo.label}
                                    </Badge>
                                    <Badge variant="outline" className={getEmotionColor(story.emotion)}>
                                      <Heart className="h-3 w-3 mr-1" />
                                      {story.emotion}
                                    </Badge>
                                    {story.isShared && (
                                      <Badge variant="outline">
                                        <Share className="h-3 w-3 mr-1" />
                                        Shared
                                      </Badge>
                                    )}
                                  </div>
                                  {story.date && (
                                    <p className="text-sm text-muted-foreground">
                                      📅 {formatDate(story.date)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed whitespace-pre-line">
                                {story.content}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-4">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {memberStories
                  .filter(story => story.date)
                  .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
                  .map((story, index) => {
                    const categoryInfo = getCategoryInfo(story.category);
                    return (
                      <div key={story.id} className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                            {categoryInfo.icon}
                          </div>
                          {index < memberStories.filter(s => s.date).length - 1 && (
                            <div className="w-0.5 h-16 bg-muted mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold">{story.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {formatDate(story.date)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {story.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New Story
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};