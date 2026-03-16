/**
 * generateLocales.ts
 *
 * One-time script to pre-translate all static site content into 7 languages
 * using the Gemini API, saving the results as JSON files in public/locales/.
 *
 * Usage:
 *   npx tsx scripts/generateLocales.ts
 *
 * Required env var:
 *   GEMINI_API_KEY or VITE_GEMINI_API_KEY
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load env vars from .env if present
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = val;
    }
  });
}

const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY or VITE_GEMINI_API_KEY is not set.');
  process.exit(1);
}

// ── Source content (English originals) ──────────────────────────────────────

const SHARED_CONTENT = {
  nav: {
    home: "Home",
    about: "About PAUSL",
    admissions: "Admissions",
    academics: "Academics",
    tuition: "Tuition",
    myPausl: "My PAUSL",
    contact: "Contact",
    language: "Language",
    historyMission: "History & Mission",
    barReg: "California State Bar Registration",
    disclosure: "Disclosure Statement",
    presidentWelcome: "President's Welcome",
    deanMessage: "Message from the Dean",
    adminStaffs: "Administrative Staff",
    faculty: "Faculty",
    catalog: "Catalog",
    schoolForm: "School Form",
    faqs: "FAQs",
    academicCalendar: "Academic Calendar",
    barInfo: "The California State Bar",
    curriculum: "Curriculum and Schedule",
    courseDesc: "Course Descriptions",
    counseling: "Academic Counseling and Academic Support",
    gradReqs: "Graduation Requirements",
    applyNow: "Apply Now",
    appSteps: "Application Steps",
    admissionReqs: "Admission Requirements",
    transferInt: "Transfer and International Students",
    techReqs: "Technical Requirements",
    tuitionFees: "Tuition & Fees",
    paymentPlan: "Payment Plan",
    refundPolicy: "Refund Policy",
    officeHours: "Office Hours",
    contactInfo: "Contact Info",
    requestInfo: "Request Info",
    weeklyDicta: "Weekly Dicta",
    library: "Law Library",
    centers: "Student Success & Resources",
    careers: "Career Services",
    consumerInfo: "Consumer Information",
  },
  footer: {
    schoolDesc: "Pacific American University School of Law is dedicated to providing high-quality, accessible legal education through innovative distance learning methods.",
    contact: "Contact Us",
    quickLinks: "Quick Links",
    applyNow: "Apply Now",
    academicCalendar: "Calendar",
    lawLibrary: "Library",
    careerServices: "Careers",
    rightsReserved: "Pacific American University. All Rights Reserved.",
    accreditation: "Accreditation",
    disclosure: "Pacific American University is a private institution. The JD program is registered with the State Bar of California.",
  },
  buttons: {
    applyNow: "Apply Now",
    requestInfo: "Request Info",
    learnMore: "Learn More",
    readMore: "Read More",
    readFullNotice: "Read Full Notice",
    backToList: "Back to List",
    backToCenters: "Back to Centers",
    exploreCenter: "Explore Center",
    contactDirector: "Contact Director",
    viewPublications: "View Publications",
    submitInquiry: "Submit Inquiry",
    cancel: "Cancel",
    chatLibrarian: "Chat with Librarian",
    reserveRoom: "Reserve Room",
    downloadCalendar: "Download Calendar",
    applyLsac: "Apply Online",
  },
  labels: {
    interestedInClinic: "Interested in this Clinic?",
    clinicPositions: "We accept applications for clinical positions year-round.",
    clinicInquiryForm: "Clinic Inquiry",
    sendMessageTo: "Send a message to",
    fullName: "Full Name",
    pauEmail: "PAU Email",
    studentId: "Student ID",
    academicYear: "Academic Year",
    prerequisitesMet: "Prerequisites Met",
    prereqDetail: "I have completed the required foundational courses.",
    statementInterest: "Statement of Interest",
    aboutPauNews: "About PAU News",
    aboutPauNewsDetail: "Official announcements and updates from the Pacific American University administration.",
  },
};

const HOME_CONTENT = {
  heroTitle: "Empowering Advocates.\nTransforming Lives.",
  heroSubtitle: "Experience world-class legal education from the heart of Silicon Valley to wherever you are.",
  visionStatement: "Our vision is to provide an accessible gateway to the legal profession for students of all backgrounds.",
  missionTitle: "The PAU Mission",
  missionDescription: "We bridge the gap between academic theory and real-world legal practice through technology-driven pedagogy.",
  missionPoints: [
    { title: "Innovation", description: "Utilizing modern tools for legal research and education.", icon: 'innovation' },
    { title: "Access", description: "Providing opportunities for remote and non-traditional students.", icon: 'access' },
    { title: "Global Impact", description: "Preparing lawyers for an interconnected legal landscape.", icon: 'globe' },
  ],
  introTitle: "A New Paradigm in Law",
  introText: "Pacific American University School of Law offers a rigorous Juris Doctor program tailored for the modern era.",
  features: [
    { title: "Flexible Learning", description: "Study on your schedule with our robust online platform.", icon: 'clock' },
    { title: "Expert Faculty", description: "Learn from practicing attorneys and distinguished scholars.", icon: 'academic' },
    { title: "Affordable Education", description: "High-value JD program with competitive tuition rates.", icon: 'currency' },
  ],
  successTitle: "Proven Excellence",
  successText: "Our graduates are practicing in prestigious firms and public service across California.",
  stats: [
    { label: "Bar Pass Rate", value: "85%" },
    { label: "Employment", value: "92%" },
    { label: "Faculty", value: "45+" },
    { label: "Alumni", value: "2k+" },
  ],
  globalFutureTitle: "Your Global Future",
  globalFutureIntro: "Our JD program prepares you for diverse career paths in the legal sector.",
  globalFutureList: [
    {
      title: "Technology Law",
      description: "Specialize in IP, AI ethics, and Silicon Valley's unique legal needs.",
      detailTitle: "Innovation & Law",
      detailBody: "Lead the conversation in tech regulations.",
      stats: [{ label: "Growth", value: "+20%" }],
    },
  ],
  globalFutureClosing: "Join the next generation of legal leaders.",
  clinicsTitle: "Clinical Opportunities",
  clinicsIntro: "Gain hands-on experience through our specialized legal clinics.",
  newsTitle: "Latest News",
};

const ADMISSIONS_CONTENT = {
  title: 'Admissions',
  intro: 'Start your journey toward a legal career with Pacific American University.',
  deadlinesTitle: 'Application Deadlines',
  deadlines: [
    { term: 'Winter Intake', date: 'Starts January (Deadline: mid-November)', type: '1L Students' },
    { term: 'Spring Intake', date: 'Starts April (Deadline: mid-February)', type: '1L Students' },
    { term: 'Fall Intake', date: 'Starts September (Deadline: mid-July)', type: '1L Students' },
  ],
  requirementsTitle: 'Admission Requirements',
  requirements: [
    "Bachelor's Degree from an accredited institution",
    "Personal Statement",
    "Two Letters of Recommendation",
    "LSAT Score (Optional)",
    "Official Transcripts",
  ],
  tuitionTitle: 'Tuition & Value',
  tuitionInfo: 'One of the most accessible JD programs in California. We believe in providing high-quality legal education without the crushing debt burden.',
  tuitionCost: '$9,000',
  faqTitle: 'Admissions FAQ',
  faqs: [
    { question: 'Is the program 100% online?', answer: 'Yes. PAUSL is a Registered Unaccredited Correspondence Law School. While the program is delivered 100% online through our Learning Management System, Populi, it features a dynamic combination of high-quality recorded (asynchronous) video lectures and real-time synchronous sessions to foster essential interaction between students and faculty. This flexible format allows you to pursue your J.D. from anywhere in the world while respecting global time differences.' },
    { question: 'Do I need to take the LSAT?', answer: 'No, the LSAT is not required, but it is highly recommended. PAUSL evaluates candidates holistically, and while LSAT scores are a reliable predictor of success in law school, they are not a mandatory prerequisite for admission.' },
    { question: 'Can I practice law in states other than California?', answer: 'PAUSL is specifically registered to meet the educational requirements for the State Bar of California. If you plan to practice law in a jurisdiction other than California, we strongly advise you to contact the relevant State Bar authority in that jurisdiction to determine if our J.D. program meets their specific criteria.' },
    { question: 'What is the "First-Year Law Students\' Examination" (FYLSX)?', answer: 'As a student at an unaccredited correspondence law school, you are required by California law to pass the FYLSX (often called the "Baby Bar") after completing your first year of study to receive credit for your legal education and continue toward your J.D..' },
  ],
};

const ACADEMICS_CONTENT = {
  title: 'Academics',
  intro: 'Rigorous legal training for the next generation of advocates.',
  programsTitle: 'Degree Programs',
  programs: [
    { name: 'Juris Doctor (JD)', description: 'A 4-year online program registered with the State Bar of California.' },
    { name: 'Master of Laws (LLM)', description: 'Advanced specialized legal study for international attorneys.' },
  ],
  concentrationsTitle: 'Concentrations',
  concentrations: ['Technology Law', 'Criminal Law', 'Business Law', 'Public Interest'],
};

// Faculty content — only translatable text fields (bio, title, expertise)
// Names, credentials, emails, photo URLs are preserved as-is
const FACULTY_CONTENT = {
  title: 'Distinguished Faculty',
  intro: 'Our professors are leaders in legal theory and practitioners with real-world impact.',
};

// ── Languages ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  'Spanish',
  'Korean',
  'Chinese (Simplified)',
  'Vietnamese',
  'Japanese',
  'French',
  'Tagalog',
] as const;

// ── Gemini Translation ───────────────────────────────────────────────────────

async function translateWithGemini(content: object, targetLang: string): Promise<object> {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const systemInstruction = `You are a professional translator for the Pacific American University School of Law website.
Translate the JSON values into ${targetLang}.

Rules:
1. PRESERVE STRUCTURE: Keep all JSON keys exactly as-is.
2. PRESERVE NAMES: Do NOT translate: "Pacific American University", "PAUSL", "Juris Doctor", "J.D.", "LL.M.", "LLM", "JD", "Silicon Valley", "Westlaw", "LexisNexis", "Populi", "LSAT", "FYLSX", "State Bar of California", "California".
3. PRESERVE VALUES LIKE PERCENTAGES, NUMBERS, ICONS: Fields named "icon", "value" (when it's a number/percentage), "image", "targetPage" must NOT be translated.
4. OUTPUT: Return ONLY the raw valid JSON. No markdown, no extra text.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: JSON.stringify(content),
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      temperature: 0.1,
    },
  });

  const text = response.text ?? '';
  const clean = text.replace(/```json\n?|\n?```/g, '').trim();
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  const jsonStr = firstBrace !== -1 && lastBrace !== -1 ? clean.slice(firstBrace, lastBrace + 1) : clean;
  return JSON.parse(jsonStr);
}

// ── File helpers ─────────────────────────────────────────────────────────────

function saveLocale(lang: string, filename: string, data: object) {
  // Use folder name safe version of lang (e.g., "Chinese (Simplified)" → "Chinese")
  const folderName = lang.replace(/\s*\(.*\)/, '');
  const dir = path.resolve(process.cwd(), 'public', 'locales', folderName);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  ✅ Saved: public/locales/${folderName}/${filename}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

const CONTENTS: Array<{ key: string; file: string; data: object }> = [
  { key: 'shared',     file: 'shared.json',     data: SHARED_CONTENT },
  { key: 'home',       file: 'home.json',        data: HOME_CONTENT },
  { key: 'admissions', file: 'admissions.json',  data: ADMISSIONS_CONTENT },
  { key: 'academics',  file: 'academics.json',   data: ACADEMICS_CONTENT },
  { key: 'faculty',    file: 'faculty.json',     data: FACULTY_CONTENT },
];

async function main() {
  console.log('🌐 PAU Locale Generator\n');
  console.log(`Translating ${CONTENTS.length} content files into ${LANGUAGES.length} languages...\n`);

  for (const lang of LANGUAGES) {
    console.log(`\n── ${lang} ─────────────────────────────`);
    for (const { key, file, data } of CONTENTS) {
      // Skip if file already exists (to allow resuming after interruption)
      const folderName = lang.replace(/\s*\(.*\)/, '');
      const outPath = path.resolve(process.cwd(), 'public', 'locales', folderName, file);
      if (fs.existsSync(outPath)) {
        console.log(`  ⏭️  Skipping (already exists): ${folderName}/${file}`);
        continue;
      }

      process.stdout.write(`  Translating ${key}...`);
      try {
        const translated = await translateWithGemini(data, lang);
        saveLocale(lang, file, translated);
      } catch (err) {
        console.error(`\n  ❌ Failed to translate ${key} to ${lang}:`, (err as Error).message);
      }

      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\n\n✨ Done! Locale files saved to public/locales/');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
