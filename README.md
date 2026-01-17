# Pacific American University - Law School Website

<div align="center">
  <h3>🎓 Official Homepage for PAU School of Law</h3>
  <p>A modern, interactive university website built with React, TypeScript, and Vite</p>
</div>

---

## 📋 Overview

This is the official website for **Pacific American University School of Law**, featuring:

- 📰 **News & Notices** - Real-time campus updates and announcements
- 🎓 **Academic Programs** - J.D. curriculum, bar exam information, and course catalog
- 👨‍🏫 **Faculty Profiles** - Comprehensive faculty and staff directory
- 📚 **Digital Library** - Access to legal research resources and study rooms
- 🏢 **Career Services** - Job placement support and career guidance
- 🎯 **Student Success & Resources** - Academic support programs and professional networking
- 📅 **Academic Calendar** - Cohort-specific start dates and key deadlines
- ℹ️ **Consumer Information** - Transparency and compliance disclosures

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pau-homepage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🌿 Git Branch Strategy

| Branch | Purpose | Deployment |
|--------|---------|------------|
| `main` | Production (본 서비스) | https://pau-homepage.vercel.app/ |
| `develop` | Development/Testing (테스트) | Preview URL (자동 생성) |

### Workflow
1. `develop` 브랜치에서 개발 및 테스트
2. 테스트 완료 후 `main`으로 머지
3. Production 자동 배포

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Heroicons

---

## 📂 Project Structure

```
pau-homepage/
├── components/                # React components
│   ├── Academics.tsx         # Academic programs page
│   ├── Admissions.tsx        # Admissions information
│   ├── Faculty.tsx           # Faculty directory
│   ├── Admin.tsx             # Admin dashboard for content management
│   ├── StudentResources.tsx  # Student success programs
│   ├── HomeNews.tsx          # News section
│   ├── Library.tsx           # Library resources
│   ├── Calendar.tsx          # Academic calendar with cohort filtering
│   └── ...
├── types.ts                   # TypeScript type definitions
├── metadata.json              # Site content and configuration
├── App.tsx                    # Main application component
└── index.tsx                  # Application entry point
```

---

## 🔧 Admin Features

The site includes a built-in **Admin Dashboard** accessible via the footer navigation:

- ✏️ Edit homepage hero text and mission statement
- 📰 Manage news articles and announcements
- 📢 Create and manage campus notices
- 👥 Update faculty and administration profiles
- 📚 Modify academic program details
- 🚨 Configure global alert banners
- 📅 Update academic calendar and deadlines

---

## 🎨 Key Features

### 1. **Dynamic Content Management**
All content is stored in `metadata.json` and can be edited through the admin interface without code changes.

### 2. **Responsive Design**
Fully optimized for desktop, tablet, and mobile devices.

### 3. **Cohort-Based Academic Calendar**
Personalized calendar views for 1L, 2L/3L, and 4L students with specific start dates and deadlines.

### 4. **Multi-Language Support**
Translation overlay system (Korean/English) built-in for global accessibility.

### 5. **Interactive Application Process**
- Online application with cohort selection
- Intake period selection (Winter/Spring/Fall)
- Automated deadline notifications
- Library room reservations

---

## 📝 Content Updates

To update site content without coding:

1. Navigate to the **Admin** section in the app
2. Select the content type (News, Faculty, Academics, etc.)
3. Use the visual editor to make changes
4. Click "Sync Updates Live" to save

All changes are automatically reflected across the site.

---

## 📚 Catalog Compliance

This website is designed to accurately reflect the information in the official Pacific American University School of Law Catalog. Key compliance features include:

- **State Bar Registration Disclosure** - Mandatory legal notices displayed prominently
- **Consumer Information** - Transparent disclosure of student outcomes and policies
- **Accurate Program Information** - J.D. requirements, tuition, and admission standards
- **Cohort-Specific Calendars** - Start dates vary by student year (1L, 2L/3L, 4L)

All content is regularly reviewed to ensure accuracy and compliance with California State Bar requirements for unaccredited law schools.

---

## 🧪 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

---

## 🤝 Contributing

This is a university project. For any questions or issues, please contact the PAU IT Department.

---

## 📄 License

© 2026 Pacific American University School of Law. All rights reserved.

---

## 🔗 Links

- 🌐 Official Website: [www.paucal.org](https://www.paucal.org)
- 📧 Contact Admissions: [admissions@paucal.org](mailto:admissions@paucal.org)
- 📧 General Inquiries: [info@paucal.org](mailto:info@paucal.org)
- 📞 Phone: (213) 674-7174
- 📍 Address: 3435 Wilshire Blvd. Suite 430, Los Angeles, CA 90010

---

<div align="center">
  <p>Built with ❤️ by onecation</p>
</div>
