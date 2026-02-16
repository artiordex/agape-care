/**
 * [Type] 웹 상담 문의 데이터 프로토콜
 */

export type InquiryStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
export type InquiryType = '입소상담' | '시설문의' | '채용문의' | '기타문의';

export interface WebInquiry {
  id: string;
  type: string;
  name: string;
  phone: string;
  email?: string;
  residentAge?: string | null;
  careGrade?: string | null;
  preferredDate?: string | null;
  message?: string | null;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export type VisitStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface VisitReservation {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitorRelationship: string;
  residentName: string;
  visitDate: string;
  visitTime: string;
  visitorCount: number;
  visitPurpose?: string | null;
  healthCheckSymptoms: boolean;
  healthCheckAssistance: boolean;
  notes?: string | null;
  status: VisitStatus;
  createdAt: string;
  updatedAt: string;
}
