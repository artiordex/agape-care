/**
 * [Type] 웹 상담 문의 데이터 프로토콜
 */

export type InquiryStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export type InquiryType = '입소상담' | '시설문의' | '채용문의' | '기타문의';

export interface WebInquiry {
  id: string;
  type: InquiryType;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}
