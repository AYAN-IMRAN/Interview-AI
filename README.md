<div align="center">

<img src="https://img.shields.io/badge/PrepAI-AI%20Interview%20Coach-A78BFA?style=for-the-badge&logo=sparkles&logoColor=white" alt="PrepAI" />

# ✨ PrepAI — AI-Powered Interview Coach

**Land your dream job with a personalized AI strategy in 30 seconds.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-interview--ai--tau--eight.vercel.app-A78BFA?style=for-the-badge)](https://interview-ai-tau-eight.vercel.app/)
[![GitHub Stars](https://img.shields.io/github/stars/AYAN-IMRAN/Interview-AI?style=for-the-badge&color=F5C518&logo=github)](https://github.com/AYAN-IMRAN/Interview-AI/stargazers)
[![Made by Ayan](https://img.shields.io/badge/Made%20by-Ayan%20Imran-A78BFA?style=for-the-badge)](https://github.com/AYAN-IMRAN)

<br />

> 🎯 Upload your resume · Paste a job description · Get your full interview strategy in ~30 seconds

<br />

![PrepAI Banner](https://img.shields.io/badge/Powered%20by-Google%20Gemini%20AI-4285F4?style=flat-square&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)

</div>

---

## ⭐ Support the Project

If PrepAI helped you — **drop a star!** It means a lot and helps others discover the project.

[![Star this repo](https://img.shields.io/badge/⭐%20Star%20this%20repo-F5C518?style=for-the-badge&logo=github&logoColor=black)](https://github.com/AYAN-IMRAN/Interview-AI)

---

## 🤔 What is PrepAI?

PrepAI is a **full-stack Gen AI application** that analyzes your resume and a job description to instantly generate:

- 🧠 **8–10 Technical Interview Questions** tailored to the role
- 💬 **5–7 Behavioral Questions** with STAR method guides
- 🎯 **Resume Match Score** (0–100) based on keyword & skill analysis
- 🗺️ **7-Day Preparation Roadmap** prioritized by skill gaps
- 🔍 **Skill Gap Analysis** categorized as High / Medium / Low priority

---

## 🚀 Live Demo

👉 **[https://interview-ai-tau-eight.vercel.app/](https://interview-ai-tau-eight.vercel.app/)**

---

## 🖼️ Features at a Glance

| Feature | Description |
|--------|-------------|
| 🤖 AI Report Generation | Gemini AI analyzes resume + JD in ~30s |
| 📊 Match Score | Instant 0–100 compatibility score |
| ❓ Interview Questions | Technical + Behavioral with model answers |
| 🗺️ 7-Day Roadmap | Day-by-day prep plan with specific tasks |
| 🔍 Skill Gaps | Prioritized list of what to learn |
| 🔐 Auth System | JWT-based secure login & register |
| 📱 Responsive UI | Works on desktop & mobile |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| ⚛️ React 18 | UI Framework |
| 🔀 React Router | Client-side routing |
| 🎨 Pure CSS | Custom dark theme (Violet + Gold) |
| 🍞 React Hot Toast | Toast notifications |
| 📡 Axios | API calls |

### Backend
| Technology | Purpose |
|-----------|---------|
| 🟢 Node.js + Express | REST API server |
| 🍃 MongoDB + Mongoose | Database |
| 🤖 Google Gemini AI | AI report generation |
| 🔐 JWT + bcrypt | Authentication |
| 📄 pdf-parse | Resume PDF extraction |
| 🐶 Multer | File upload handling |

---

## 📁 Project Structure

```
Interview-AI/
├── 📂 Backend/
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Auth + file upload
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   └── services/        # Gemini AI service
│   └── server.js
│
└── 📂 frontend/
    └── src/
        ├── features/
        │   ├── auth/         # Login, Register
        │   ├── home/         # Landing page
        │   └── interview/    # Core app pages
        └── components/       # Shared components
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### 1️⃣ Clone the repo
```bash
git clone https://github.com/AYAN-IMRAN/Interview-AI.git
cd Interview-AI
```

### 2️⃣ Setup Backend
```bash
cd Backend
npm install
```

Create `.env` file in `Backend/`:
```env
MONGODB_URI=your_mongodb_atlas_uri
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run backend:
```bash
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
```

Create `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:3000
```

Run frontend:
```bash
npm run dev
```

### 4️⃣ Open in browser
```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/auth/get-me` | Get current user | ✅ |
| `POST` | `/api/interview/` | Generate AI report | ✅ |
| `GET` | `/api/interview/` | Get all reports | ✅ |
| `GET` | `/api/interview/report/:id` | Get report by ID | ✅ |

---

## 🎨 Design System

```
Background:  #0A0A0A   Pure near-black
Card:        #111111   Elevated surfaces
Accent 1:    #A78BFA   Soft Violet — CTAs, active states
Accent 2:    #F5C518   Warm Gold — badges, highlights
Text:        #F5F5F5   Primary text
Font:        Instrument Serif (headings) + Geist (body)
```

---

## 👨‍💻 Author

<div align="center">

**Ayan Imran**

[![GitHub](https://img.shields.io/badge/GitHub-AYAN--IMRAN-A78BFA?style=for-the-badge&logo=github)](https://github.com/AYAN-IMRAN)

*18-year-old Full Stack Developer from Karachi, Pakistan 🇵🇰*

*Building real products with AI — one commit at a time.*

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**If you found this useful, please ⭐ star the repo — it helps a lot!**

[![Star this repo](https://img.shields.io/badge/⭐%20Star%20on%20GitHub-F5C518?style=for-the-badge&logo=github&logoColor=black)](https://github.com/AYAN-IMRAN/Interview-AI)

Made with 💜 by [Ayan Imran](https://github.com/AYAN-IMRAN)

</div>
