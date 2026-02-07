import { initContract } from '@ts-rest/core';
import {
  accountingContract,
  attendanceContract,
  authContract,
  careContract,
  contentContract,
  dashboardContract,
  employeeContract,
  mealContract,
  myPageContract,
  notificationContract,
  operationsContract,
  programContract,
  residentContract,
  settingContract,
  visitReservationContract,
  webInquiryContract,
  webpageContract,
} from './contracts/index.js';

export * from './contracts/index.js';
export * from './schemas/index.js';
export * from './worker-types.js';

const c = initContract();

export const contract = c.router({
  accounting: accountingContract,
  attendance: attendanceContract,
  auth: authContract,
  care: careContract,
  content: contentContract,
  dashboard: dashboardContract,
  employee: employeeContract,
  meal: mealContract,
  mypage: myPageContract,
  notification: notificationContract,
  operations: operationsContract,
  program: programContract,
  resident: residentContract,
  setting: settingContract,
  webInquiry: webInquiryContract,
  webpage: webpageContract,
  visitReservation: visitReservationContract,
});
