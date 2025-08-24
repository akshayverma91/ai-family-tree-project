export interface HealthRecord {
  id: string;
  title: string;
  type: 'medical_report' | 'prescription' | 'lab_result' | 'vaccination' | 'surgery' | 'emergency' | 'checkup' | 'other';
  description: string;
  date: string;
  doctor?: string;
  hospital?: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  attachments?: HealthAttachment[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HealthAttachment {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'audio' | 'video' | 'document';
  fileSize: number;
  filePath: string;
  uploadedAt: string;
}

export interface HealthRecordCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
}