import { Page } from '../types';

const SITE_ORIGIN = 'https://law.paucal.org';

export interface SeoRoute {
  page: Page;
  path: string;
  title: string;
  description: string;
  priority: string;
}

export const SEO_ROUTES: SeoRoute[] = [
  {
    page: 'home',
    path: '/',
    title: 'Pacific American University School of Law',
    description: 'Pacific American University School of Law offers flexible, technology-enabled legal education for students pursuing U.S. legal studies and California bar pathways.',
    priority: '1.0',
  },
  {
    page: 'history-mission',
    path: '/about',
    title: 'About PAU School of Law | Mission & Identity',
    description: 'Learn about Pacific American University School of Law, its mission, history, identity, and correspondence law school registration in California.',
    priority: '0.9',
  },
  {
    page: 'academics',
    path: '/academics',
    title: 'Academics | PAU School of Law',
    description: 'Explore PAU School of Law academics, curriculum, graduation requirements, academic calendar, counseling, and California bar preparation resources.',
    priority: '0.9',
  },
  {
    page: 'admissions',
    path: '/admissions',
    title: 'Admissions | PAU School of Law',
    description: 'Review PAU School of Law admissions steps, requirements, transfer information, technology requirements, and application pathways.',
    priority: '0.9',
  },
  {
    page: 'tuition',
    path: '/tuition',
    title: 'Tuition & Fees | PAU School of Law',
    description: 'View PAU School of Law tuition, fees, payment plans, refund policy, and financial information for prospective and enrolled students.',
    priority: '0.8',
  },
  {
    page: 'contact',
    path: '/contact',
    title: 'Contact PAU School of Law',
    description: 'Contact Pacific American University School of Law for admissions, registrar, office hours, mailing address, and request information forms.',
    priority: '0.8',
  },
  { page: 'academic-calendar', path: '/academics/academic-calendar', title: 'Academic Calendar | PAU School of Law', description: 'Find PAU School of Law academic calendar dates, deadlines, and term information.', priority: '0.7' },
  { page: 'curriculum-schedule', path: '/academics/curriculum', title: 'Curriculum Schedule | PAU School of Law', description: 'Review the PAU School of Law curriculum schedule and course sequence for legal studies.', priority: '0.7' },
  { page: 'counseling', path: '/academics/counseling', title: 'Academic Counseling | PAU School of Law', description: 'Learn about academic counseling and student support services at PAU School of Law.', priority: '0.6' },
  { page: 'grad-reqs', path: '/academics/graduation-requirements', title: 'Graduation Requirements | PAU School of Law', description: 'Understand graduation requirements for PAU School of Law programs and California legal education pathways.', priority: '0.7' },
  { page: 'app-steps', path: '/admissions/application-steps', title: 'Application Steps | PAU School of Law', description: 'Follow the step-by-step admissions application process for PAU School of Law.', priority: '0.7' },
  { page: 'admission-reqs', path: '/admissions/requirements', title: 'Admission Requirements | PAU School of Law', description: 'Review admission requirements, eligibility, and documents needed to apply to PAU School of Law.', priority: '0.7' },
  { page: 'transfer-int', path: '/admissions/transfer-international', title: 'Transfer & International Students | PAU School of Law', description: 'Information for transfer and international students applying to PAU School of Law.', priority: '0.6' },
  { page: 'tech-reqs', path: '/admissions/technology-requirements', title: 'Technology Requirements | PAU School of Law', description: 'Technology requirements for online and correspondence-based study at PAU School of Law.', priority: '0.6' },
  { page: 'tuition-fees', path: '/tuition/fees', title: 'Tuition Fees | PAU School of Law', description: 'Detailed tuition and fee information for PAU School of Law students.', priority: '0.7' },
  { page: 'payment-plan', path: '/tuition/payment-plan', title: 'Payment Plan | PAU School of Law', description: 'Learn about PAU School of Law payment plan options and tuition payment schedules.', priority: '0.6' },
  { page: 'refund-policy', path: '/tuition/refund-policy', title: 'Refund Policy | PAU School of Law', description: 'Review PAU School of Law refund policies and student financial disclosures.', priority: '0.6' },
  { page: 'contact-info', path: '/contact/information', title: 'Contact Information | PAU School of Law', description: 'Find PAU School of Law phone numbers, email addresses, address, and office contact details.', priority: '0.6' },
  { page: 'office-hours', path: '/contact/office-hours', title: 'Office Hours | PAU School of Law', description: 'View PAU School of Law office hours and administrative support availability.', priority: '0.6' },
  { page: 'request-info', path: '/contact/request-information', title: 'Request Information | PAU School of Law', description: 'Request information from PAU School of Law admissions and student services.', priority: '0.7' },
  { page: 'faculty', path: '/about/faculty', title: 'Faculty | PAU School of Law', description: 'Meet the faculty and academic leadership of Pacific American University School of Law.', priority: '0.6' },
  { page: 'faqs', path: '/about/faqs', title: 'FAQs | PAU School of Law', description: 'Frequently asked questions about PAU School of Law admissions, academics, tuition, and student services.', priority: '0.6' },
  { page: 'weekly-dicta', path: '/my-pausl/weekly-dicta', title: 'Weekly Dicta | PAU School of Law', description: 'Read Weekly Dicta announcements and updates for the PAU School of Law community.', priority: '0.5' },
];

const routeByPage = new Map<Page, SeoRoute>(SEO_ROUTES.map((route) => [route.page, route]));
const pageByPath = new Map<string, Page>(SEO_ROUTES.map((route) => [route.path, route.page]));

export const normalizePath = (pathname: string): string => {
  if (!pathname || pathname === '') return '/';
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return clean || '/';
};

export const getPageForPath = (pathname: string): Page => {
  return pageByPath.get(normalizePath(pathname)) ?? 'home';
};

export const getRouteForPage = (page: Page): SeoRoute => {
  return routeByPage.get(page) ?? routeByPage.get('home')!;
};

export const getPathForPage = (page: Page): string => getRouteForPage(page).path;

export const getCanonicalUrl = (page: Page): string => `${SITE_ORIGIN}${getPathForPage(page)}`;

export const applyPageSeo = (page: Page): void => {
  const route = getRouteForPage(page);
  document.title = route.title;

  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = route.description;

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = getCanonicalUrl(page);
};
