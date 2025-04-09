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

/pneumo-detection
│
├── /public                  # Static assets (images, logos, favicon)
│   └── logo.png
│   └── favicon.ico
│
├── /src
│   ├── /app                 # Next.js App Router (pages)
│   │   ├── /auth            # Authentication system
│   │   │   ├── login        # Unified login page for all roles
│   │   │   ├── signup       # Signup page for Patients
│   │   ├── /dashboard       # Role-based dashboards
│   │   │   ├── /admin       # Admin dashboard
│   │   │   ├── /doctor      # Doctor dashboard
│   │   │   ├── /patient     # Patient dashboard
│   │   ├── /upload          # Image upload page
│   │   ├── /analysis        # ML analysis & reports
│   │   └── layout.tsx       # Root layout (navbar, sidebar)
│
├── /components              # Reusable UI components
│   ├── /ui                  # UI components (buttons, modals)
│   ├── /auth                # Auth-related components
│   ├── /dashboard           # Dashboard UI components
│   ├── /upload              # File upload component
│   ├── /charts              # Data visualization charts
│
├── /lib                     # Utility functions & helper modules
│   ├── auth.ts              # Authentication config (NextAuth.js)
│   ├── prisma.ts            # Prisma database connection
│   ├── storage.ts           # Image storage (AWS S3, GCS)
│   ├── analysis.ts          # ML model backend call logic
│
├── /api                     # Next.js API routes
│   ├── /auth                # Authentication API routes
│   ├── /upload              # Image upload API
│   ├── /analyze             # ML inference API
│   ├── /results             # Fetch ML results
│
├── /styles                  # Global and component-specific styles
│   ├── globals.css          # Tailwind CSS global styles
│
├── /config                  # Configuration files
│   ├── env.ts               # Environment variables handler
│   ├── roles.ts             # Role-based routing and permissions
│
├── /hooks                   # Custom React hooks
│   ├── useAuth.ts           # Authentication hook
│   ├── useUpload.ts         # File upload hook
│   ├── useAnalysis.ts       # Fetch ML analysis results
│
├── /backend                 # ML model backend (Flask/Django)
│   ├── /ml_model            # Python ML model
│   │   ├── model.py         # CNN model for pneumonia detection
│   │   ├── preprocess.py    # Image preprocessing logic
│   │   ├── api.py           # Flask API for ML inference
│   │   └── requirements.txt # Python dependencies
│
├── /prisma                  # Prisma ORM setup
│   └── schema.prisma        # Prisma schema definition
│
├── /scripts                 # DevOps & Deployment scripts
│   └── deploy.sh            # Deployment script (AWS, Vercel)
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore rules
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies & scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation

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

