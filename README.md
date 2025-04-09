🩺 Pneumo-Detection — AI-Powered Pneumonia Detection System
A full-stack Next.js medical application that leverages AI/ML to detect pneumonia from X-ray images. The system provides role-based authentication for Admins, Doctors, and Patients — offering medical record management, AI-powered analysis, and secure data handling.

🚀 Tech Stack
Powerful technologies behind this project:

Frontend: Next.js 14, React, Tailwind CSS

Backend: Next.js API Routes, Python (Flask ML API)

AI/ML: TensorFlow, PyTorch, OpenCV

Auth: NextAuth.js with Role-Based Access

Database: PostgreSQL + Prisma ORM

Storage: AWS S3 / Google Cloud Storage

Deployment: Vercel, AWS EC2

Monitoring: Sentry, Google Analytics

📁 Project Structure
bash
Copy
Edit
/pneumo-detection
│
├── /public              → Static assets (logos, images, favicon)
├── /src
│   ├── /app             → Next.js App Router & Pages
│   │   ├── /auth        → Login & Signup (Role-based)
│   │   ├── /dashboard   → Admin, Doctor, Patient Dashboards
│   │   ├── /upload      → X-ray Image Upload
│   │   ├── /analysis    → ML Result Display
│   │   └── layout.tsx   → Navbar, Sidebar Layout
│   │   └── page.tsx     → Landing Page
│   │
│   ├── /components      → Reusable UI Components
│   ├── /lib             → Utilities (auth, prisma, storage, analysis)
│   ├── /api             → Backend API (auth, upload, analyze)
│   ├── /hooks           → Custom React Hooks
│   ├── /styles          → Global Styles (Tailwind)
│   ├── /config          → Environment & Role Configs
│
├── /backend             → ML Model Backend (Python)
│   └── /ml_model        → Flask API, CNN Model, Image Preprocessing
│
├── /prisma              → Prisma Schema & Migrations
├── /scripts             → Deployment Scripts
├── .env                 → Environment Variables
├── next.config.js       → Next.js Config
└── package.json         → Project Metadata
✨ Key Features
🔍 AI-based Pneumonia Detection using CNN

🧑‍⚕️ Role-Based Authentication (Admin / Doctor / Patient)

📊 ML Analysis Dashboard with Charts

☁️ Secure Image Upload & Storage

📄 Medical Record Management

📥 Patient Signup & Login

👨‍⚕️ Doctor Appointment & Record Access

🛡️ Admin User Management

⚙️ Getting Started
Clone the project:

bash
Copy
Edit
git clone https://github.com/your-username/pneumo-detection.git
cd pneumo-detection
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Run the development server:

bash
Copy
Edit
npm run dev
Visit: http://localhost:3000

🖥️ ML Backend Setup
Navigate to /backend/ml_model:

Create virtual environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate
Install Python dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run Flask server:

bash
Copy
Edit
python api.py
📦 Deployment
Frontend — Vercel Deployment Guide
Backend — Deploy Flask API to AWS EC2 or any cloud platform.

📚 Learn More
Next.js Documentation

Prisma Documentation

TensorFlow Documentation

NextAuth.js Docs


🙌 Credits
Developed with ❤️ by Sakyo

