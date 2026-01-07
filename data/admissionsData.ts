import { AdmissionsContent } from '../types';

export const DEFAULT_ADMISSIONS_CONTENT: AdmissionsContent = {
  title: 'Admissions',
  intro: 'Start your journey toward a legal career with Pacific American University.',
  deadlinesTitle: 'Application Deadlines',
  deadlines: [
    { term: 'Winter Intake', date: 'Starts January (Deadline: mid-November)', type: '1L Students' },
    { term: 'Spring Intake', date: 'Starts April (Deadline: mid-February)', type: '1L Students' },
    { term: 'Fall Intake', date: 'Starts September (Deadline: mid-July)', type: '1L Students' }
  ],
  requirementsTitle: 'Admission Requirements',
  requirements: ['Bachelor\'s Degree from an accredited institution', 'Personal Statement', 'Two Letters of Recommendation', 'LSAT Score (Optional)', 'Official Transcripts'],
  tuitionTitle: 'Tuition & Value',
  tuitionInfo: 'One of the most accessible JD programs in California. We believe in providing high-quality legal education without the crushing debt burden.',
  tuitionCost: '$9,000',
  faqTitle: 'Admissions FAQ',
  faqs: [
    { question: 'Is the program 100% online?', answer: 'Yes. PAUSL is a Registered Unaccredited Correspondence Law School. While the program is delivered 100% online through our Learning Management System, Populi, it features a dynamic combination of high-quality recorded (asynchronous) video lectures and real-time synchronous sessions to foster essential interaction between students and faculty. This flexible format allows you to pursue your J.D. from anywhere in the world while respecting global time differences.' },
    { question: 'Do I need to take the LSAT?', answer: 'No, the LSAT is not required, but it is highly recommended. PAUSL evaluates candidates holistically, and while LSAT scores are a reliable predictor of success in law school, they are not a mandatory prerequisite for admission. However, please note that the State Bar of California requires all applicants to obtain an LSAC number. You must include this number on your application form.' },
    { question: 'Can I practice law in states other than California?', answer: 'PAUSL is specifically registered to meet the educational requirements for the State Bar of California. If you plan to practice law in a jurisdiction other than California, we strongly advise you to contact the relevant State Bar authority in that jurisdiction to determine if our J.D. program meets their specific criteria.' },
    { question: 'What is the "First-Year Law Students\' Examination" (FYLSX)?', answer: 'As a student at an unaccredited correspondence law school, you are required by California law to pass the FYLSX (often called the "Baby Bar") after completing your first year of study to receive credit for your legal education and continue toward your J.D..' }
  ]
};



