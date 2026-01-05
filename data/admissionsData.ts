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
    { question: 'Is the program 100% online?', answer: 'Yes. PAUSL is a Registered Unaccredited Correspondence Law School. All lectures and coursework are delivered 100% online through our Learning Management System, Populi, allowing you to study from anywhere in the world.' },
    { question: 'Do I need to take the LSAT?', answer: 'While LSAT scores are considered if submitted, they are not mandatory for admission. We evaluate candidates holistically.' }
  ]
};

