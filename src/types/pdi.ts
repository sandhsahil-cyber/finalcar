export type PDIStage = 'Arrived from Yard' | 'Under Inspection' | 'Rectification Required' | 'PDI Certified';

export interface InspectionResult {
  category: 'Exterior' | 'Interior' | 'Under-the-Hood' | 'Documents';
  points: {
    label: string;
    checked: boolean;
    remarks?: string;
  }[];
}

export interface PDITask {
  id: string;
  customerName: string;
  carModel: string;
  vin: string;
  engineNo: string;
  arrivalDate: string;
  stage: PDIStage;
  inspectionProgress: number; // 0 to 100
  photos: {
    front: string | null;
    rear: string | null;
    left: string | null;
    right: string | null;
  };
  certifiedDate?: string;
  certifiedBy?: string;
}

export interface RectificationEntry {
  id: string;
  taskId: string;
  carModel: string;
  defectDescription: string;
  severity: 'Minor' | 'Moderate' | 'Critical';
  status: 'Pending' | 'In-Work' | 'Fixed' | 'Re-inspected';
  technician?: string;
}
