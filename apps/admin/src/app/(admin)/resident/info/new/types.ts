export interface ResidentFormData {
  // 기본정보
  photo: string;
  name: string;
  gender: string;
  birthDate: string;
  registrationNumber: string;
  phone: string;
  address: string;
  addressDetail: string;

  // 등급 및 인정정보
  grade: string;
  recognitionNumber: string;
  gradeValidUntil: string;
  copaymentRate: number;

  // 입소정보
  status: string;
  room: string;
  admissionDate: string;

  // 건강정보
  mainDiseases: string;
  medications: string;
  allergies: string;
  cognition: string;
  mobility: string;
  mealStatus: string;
  toiletStatus: string;
  specialNotes: string;

  // 보호자정보
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress: string;
  receiveNotice: boolean;
}
