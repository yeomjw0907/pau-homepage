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
- 🏢 **Career Services** - On-Campus Interview (OCI) registration and job placement
- 🏛️ **Legal Clinics & Centers** - Hands-on clinical programs
- 📅 **Academic Calendar** - Important dates and deadlines
- 🎨 **AI Campus Visualizer** - Architectural concept generator using Gemini AI

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

3. **Set up environment variables (optional)**
   
   For the AI Campus Visualizer feature, create a `.env.local` file:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > Note: The app will work without this key, but the Campus Visualizer will require user-selected API keys.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **AI Integration:** Google Gemini API (for image generation)

---

## 📂 Project Structure

```
pau-homepage/
├── components/           # React components
│   ├── Academics.tsx    # Academic programs page
│   ├── Admissions.tsx   # Admissions information
│   ├── Faculty.tsx      # Faculty directory
│   ├── Admin.tsx        # Admin dashboard for content management
│   ├── HomeNews.tsx     # News section
│   ├── Library.tsx      # Library resources
│   └── ...
├── services/            # API services
│   └── geminiService.ts # Gemini AI integration
├── types.ts             # TypeScript type definitions
├── metadata.json        # Site content and configuration
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

---

## 🔧 Admin Features

The site includes a built-in **Admin Dashboard** accessible at `/admin` (in the app navigation):

- ✏️ Edit homepage hero text
- 📰 Manage news articles with rich text editor
- 📢 Create and manage campus notices
- 👥 Update faculty profiles and bios
- 📚 Modify academic program details
- 🚨 Configure global alert banners

---

## 🎨 Key Features

### 1. **Dynamic Content Management**
All content is stored in `metadata.json` and can be edited through the admin interface without code changes.

### 2. **Responsive Design**
Fully optimized for desktop, tablet, and mobile devices.

### 3. **AI-Powered Campus Visualization**
Generate architectural concepts for future campus expansions using Gemini's image generation capabilities.

### 4. **Multi-Language Support**
Translation overlay system (Korean/English) built-in for global accessibility.

### 5. **Interactive Forms**
- LSAC application gateway
- Clinic inquiry forms
- OCI registration
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

- 🌐 [Official University Website](#)
- 📧 [Contact Admissions](mailto:admissions@pau.edu)
- 📞 Phone: (555) 123-4567

---

<div align="center">
  <p>Built with ❤️ for future lawyers</p>
</div>
