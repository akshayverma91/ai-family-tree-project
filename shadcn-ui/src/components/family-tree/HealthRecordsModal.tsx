import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FamilyMember } from '@/types/family';
import { HealthRecord } from '@/types/healthRecord';
import { sampleHealthRecords, healthRecordCategories } from '@/data/sampleHealthRecords';
import { Heart, Calendar, Plus, Upload, FileText, Stethoscope, Edit, Trash2, AlertCircle } from 'lucide-react';

interface HealthRecordsModalProps {
  member: FamilyMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HealthRecordsModal: React.FC<HealthRecordsModalProps> = ({
  member,
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  if (!member) return null;

  const memberHealthRecords = member.healthRecords 
    ? sampleHealthRecords.filter(record => member.healthRecords!.includes(record.id))
    : [];

  const filteredRecords = selectedCategory === 'all' 
    ? memberHealthRecords 
    : memberHealthRecords.filter(record => record.type === selectedCategory);

  const getCategoryInfo = (category: string) => {
    return healthRecordCategories.find(cat => cat.key === category) || healthRecordCategories[7];
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[severity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const AddRecordForm = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add New Health Record</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="e.g., Annual Checkup 2024" />
          </div>
          <div>
            <label className="text-sm font-medium">Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {healthRecordCategories.map(category => (
                  <SelectItem key={category.key} value={category.key}>
                    {category.icon} {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Date</label>
            <Input type="date" />
          </div>
          <div>
            <label className="text-sm font-medium">Severity</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Doctor</label>
            <Input placeholder="Doctor name" />
          </div>
          <div>
            <label className="text-sm font-medium">Hospital/Clinic</label>
            <Input placeholder="Hospital or clinic name" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea placeholder="Detailed description of the health record..." rows={3} />
        </div>

        <div>
          <label className="text-sm font-medium">Upload Files</label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: PDF, Images, Audio, Video files
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Choose Files
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsAddingRecord(false)}>
            Cancel
          </Button>
          <Button>Save Record</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Stethoscope className="h-6 w-6" />
            <div>
              <span className="text-xl">{member.name}'s Health Records</span>
              <p className="text-sm text-muted-foreground font-normal">
                {memberHealthRecords.length} {memberHealthRecords.length === 1 ? 'record' : 'records'} available
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="records" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Health Records</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Medical Timeline</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="mt-4">
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
                    🏥 All Records ({memberHealthRecords.length})
                  </Button>
                  
                  {healthRecordCategories.map(category => {
                    const count = memberHealthRecords.filter(r => r.type === category.key).length;
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
                  
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setIsAddingRecord(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Record
                    </Button>
                  </div>
                </div>
              </div>

              {/* Records Content */}
              <div className="flex-1">
                <ScrollArea className="h-full pr-4">
                  {isAddingRecord && <AddRecordForm />}
                  
                  {filteredRecords.length === 0 && !isAddingRecord ? (
                    <div className="text-center py-12">
                      <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No health records in this category yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredRecords.map((record) => {
                        const categoryInfo = getCategoryInfo(record.type);
                        return (
                          <Card key={record.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg mb-2 flex items-center space-x-2">
                                    <span>{record.title}</span>
                                    {record.isPrivate && <AlertCircle className="h-4 w-4 text-orange-500" />}
                                  </CardTitle>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge className={categoryInfo.color}>
                                      {categoryInfo.icon} {categoryInfo.label}
                                    </Badge>
                                    <Badge variant="outline" className={getSeverityColor(record.severity)}>
                                      {record.severity.toUpperCase()}
                                    </Badge>
                                    {record.isPrivate && (
                                      <Badge variant="outline" className="text-orange-600">
                                        Private
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    📅 {formatDate(record.date)}
                                    {record.doctor && ` • 👨‍⚕️ ${record.doctor}`}
                                    {record.hospital && ` • 🏥 ${record.hospital}`}
                                  </p>
                                </div>
                                <div className="flex space-x-1">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Description:</p>
                                  <p className="text-sm">{record.description}</p>
                                </div>
                                
                                {record.diagnosis && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Diagnosis:</p>
                                    <p className="text-sm">{record.diagnosis}</p>
                                  </div>
                                )}
                                
                                {record.treatment && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Treatment:</p>
                                    <p className="text-sm">{record.treatment}</p>
                                  </div>
                                )}
                                
                                {record.medications && record.medications.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Medications:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {record.medications.map((med, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          💊 {med}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
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
                {memberHealthRecords
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((record, index) => {
                    const categoryInfo = getCategoryInfo(record.type);
                    return (
                      <div key={record.id} className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                            record.severity === 'critical' ? 'bg-red-500' :
                            record.severity === 'high' ? 'bg-orange-500' :
                            record.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            {categoryInfo.icon}
                          </div>
                          {index < memberHealthRecords.length - 1 && (
                            <div className="w-0.5 h-16 bg-muted mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{record.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {formatDate(record.date)}
                            </Badge>
                            <Badge variant="outline" className={getSeverityColor(record.severity)}>
                              {record.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {record.doctor && `👨‍⚕️ ${record.doctor}`}
                            {record.hospital && ` • 🏥 ${record.hospital}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {record.description}
                          </p>
                          {record.diagnosis && (
                            <p className="text-sm mt-1">
                              <span className="font-medium">Diagnosis:</span> {record.diagnosis}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" size="sm" onClick={() => setIsAddingRecord(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Record
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};