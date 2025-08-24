import { HealthRecord } from '@/types/healthRecord';

export const sampleHealthRecords: HealthRecord[] = [
  // John Smith's health records
  {
    id: 'health-1',
    title: 'Annual Physical Checkup 2024',
    type: 'checkup',
    description: 'Routine annual physical examination. Overall health is good for age 74. Blood pressure slightly elevated but manageable.',
    date: '2024-01-15',
    doctor: 'Dr. Patricia Williams',
    hospital: 'New York General Hospital',
    diagnosis: 'Mild hypertension, otherwise healthy',
    treatment: 'Continue current medication, increase physical activity',
    medications: ['Lisinopril 10mg daily', 'Multivitamin'],
    severity: 'low',
    isPrivate: false,
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'health-2',
    title: 'Knee Surgery - Left Meniscus Repair',
    type: 'surgery',
    description: 'Arthroscopic surgery to repair torn meniscus in left knee sustained during woodworking accident.',
    date: '2019-08-22',
    doctor: 'Dr. Robert Martinez',
    hospital: 'Manhattan Orthopedic Center',
    diagnosis: 'Torn medial meniscus, left knee',
    treatment: 'Arthroscopic meniscus repair, 6 weeks physical therapy',
    medications: ['Ibuprofen 400mg', 'Physical therapy'],
    severity: 'medium',
    isPrivate: false,
    createdAt: '2019-08-22T09:00:00Z',
    updatedAt: '2019-08-22T09:00:00Z'
  },

  // Mary Smith's health records
  {
    id: 'health-3',
    title: 'Mammography Screening 2024',
    type: 'checkup',
    description: 'Annual mammography screening as part of preventive care. Results show normal breast tissue.',
    date: '2024-03-10',
    doctor: 'Dr. Lisa Chen',
    hospital: 'Women\'s Health Center NYC',
    diagnosis: 'Normal mammography results',
    treatment: 'Continue annual screenings',
    severity: 'low',
    isPrivate: true,
    createdAt: '2024-03-10T11:15:00Z',
    updatedAt: '2024-03-10T11:15:00Z'
  },
  {
    id: 'health-4',
    title: 'Diabetes Management Plan',
    type: 'medical_report',
    description: 'Type 2 diabetes diagnosed in 2020. Currently well-managed with diet, exercise, and medication.',
    date: '2023-12-05',
    doctor: 'Dr. James Thompson',
    hospital: 'Endocrine Associates',
    diagnosis: 'Type 2 Diabetes Mellitus - well controlled',
    treatment: 'Continue current regimen, quarterly HbA1c monitoring',
    medications: ['Metformin 1000mg twice daily', 'Glipizide 5mg daily'],
    severity: 'medium',
    isPrivate: false,
    createdAt: '2023-12-05T16:20:00Z',
    updatedAt: '2023-12-05T16:20:00Z'
  },

  // Michael Smith's health records
  {
    id: 'health-5',
    title: 'COVID-19 Vaccination Record',
    type: 'vaccination',
    description: 'Complete COVID-19 vaccination series plus annual booster shots.',
    date: '2024-09-15',
    doctor: 'Dr. Amanda Foster',
    hospital: 'San Francisco Community Health',
    diagnosis: 'Preventive vaccination',
    treatment: 'Annual COVID-19 booster administered',
    severity: 'low',
    isPrivate: false,
    createdAt: '2024-09-15T10:30:00Z',
    updatedAt: '2024-09-15T10:30:00Z'
  },
  {
    id: 'health-6',
    title: 'Back Pain - Lower Lumbar Strain',
    type: 'medical_report',
    description: 'Lower back pain from prolonged sitting at desk. MRI shows minor disc compression.',
    date: '2023-06-18',
    doctor: 'Dr. Kevin Park',
    hospital: 'SF Spine Institute',
    diagnosis: 'L4-L5 disc compression, muscle strain',
    treatment: 'Physical therapy, ergonomic workspace setup, core strengthening',
    medications: ['Ibuprofen as needed', 'Physical therapy sessions'],
    severity: 'medium',
    isPrivate: false,
    createdAt: '2023-06-18T13:45:00Z',
    updatedAt: '2023-06-18T13:45:00Z'
  },

  // Sarah Johnson's health records
  {
    id: 'health-7',
    title: 'Prenatal Care - Olivia\'s Pregnancy',
    type: 'medical_report',
    description: 'Complete prenatal care during pregnancy with daughter Olivia. Healthy pregnancy with normal delivery.',
    date: '2010-08-18',
    doctor: 'Dr. Maria Rodriguez',
    hospital: 'Boston Women\'s Hospital',
    diagnosis: 'Normal pregnancy and delivery',
    treatment: 'Standard prenatal care, natural delivery',
    severity: 'low',
    isPrivate: true,
    createdAt: '2010-08-18T15:47:00Z',
    updatedAt: '2010-08-18T15:47:00Z'
  },
  {
    id: 'health-8',
    title: 'Allergy Testing Results',
    type: 'lab_result',
    description: 'Comprehensive allergy panel due to seasonal symptoms and food sensitivities.',
    date: '2022-04-12',
    doctor: 'Dr. Steven Lee',
    hospital: 'Boston Allergy & Immunology',
    diagnosis: 'Mild allergies to pollen, shellfish sensitivity',
    treatment: 'Seasonal antihistamines, avoid shellfish',
    medications: ['Claritin 10mg during allergy season', 'EpiPen (precautionary)'],
    severity: 'low',
    isPrivate: false,
    createdAt: '2022-04-12T14:20:00Z',
    updatedAt: '2022-04-12T14:20:00Z'
  }
];

export const healthRecordCategories = [
  { key: 'medical_report', label: 'Medical Report', icon: '📋', color: 'bg-blue-100 text-blue-800' },
  { key: 'prescription', label: 'Prescription', icon: '💊', color: 'bg-green-100 text-green-800' },
  { key: 'lab_result', label: 'Lab Result', icon: '🔬', color: 'bg-purple-100 text-purple-800' },
  { key: 'vaccination', label: 'Vaccination', icon: '💉', color: 'bg-emerald-100 text-emerald-800' },
  { key: 'surgery', label: 'Surgery', icon: '🏥', color: 'bg-red-100 text-red-800' },
  { key: 'emergency', label: 'Emergency', icon: '🚨', color: 'bg-orange-100 text-orange-800' },
  { key: 'checkup', label: 'Checkup', icon: '🩺', color: 'bg-teal-100 text-teal-800' },
  { key: 'other', label: 'Other', icon: '📝', color: 'bg-gray-100 text-gray-800' }
];