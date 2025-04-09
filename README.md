This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Pneumo-Detection: AI-Powered Medical Diagnosis

## 📌 Project Overview
Pneumo-Detection is a full-stack **Next.js** application that uses **AI/ML** for pneumonia detection based on medical imaging. This system provides **role-based authentication** for **admins, doctors, and patients**, along with data analysis and secure medical record management.

---

## 📂 Project Structure
```
/pneumo-detection
│── /public                      # Static assets (logos, images, favicon)
│── /src
│   │── /app                     # Next.js App Router (Pages)
│   │   │── /auth                 # Authentication system
│   │   │   ├── /login
│   │   │   │   ├── page.tsx      # Unified login for all roles
│   │   │   │   ├── admin         # Admin login
│   │   │   │   │   ├── page.tsx  
│   │   │   │   ├── doctor        # Doctor login
│   │   │   │   │   ├── page.tsx  
│   │   │   │   ├── patient       # Patient login
│   │   │   │   │   ├── page.tsx  
│   │   │   ├── /signup
│   │   │   │   ├── page.tsx      # Patient signup page
│   │   │── /dashboard            # Role-based dashboards
│   │   │   ├── /admin
│   │   │   │   ├── page.tsx       # Admin dashboard
│   │   │   │   ├── /users         # Manage users
│   │   │   │   │   ├── page.tsx  
│   │   │   ├── /doctor
│   │   │   │   ├── page.tsx       # Doctor dashboard
│   │   │   │   ├── /appointments  # View appointments
│   │   │   │   │   ├── page.tsx  
│   │   │   ├── /patient
│   │   │   │   ├── page.tsx       # Patient dashboard
│   │   │   │   ├── /records       # View medical records
│   │   │   │   │   ├── page.tsx  
│   │   │── /upload               # Image upload for ML model
│   │   │   ├── page.tsx
│   │   │── /analysis             # ML analysis & reports
│   │   │   ├── page.tsx
│   │   ├── layout.tsx            # Root layout (navbar, sidebar)
│   │   ├── page.tsx              # Landing page
│   │── /components               # Reusable UI components
│   │   ├── /ui                   # Common UI elements (buttons, modals)
│   │   ├── /auth                 # Authentication components
│   │   ├── /dashboard            # Dashboard UI components
│   │   ├── /upload               # File upload component
│   │   ├── /charts               # Data visualization charts
│   │── /lib                      # Utility functions & helper modules
│   │   ├── auth.ts               # Authentication config (NextAuth.js)
│   │   ├── prisma.ts             # Database connection (Prisma)
│   │   ├── storage.ts            # Image storage (AWS S3 / GCS)
│   │   ├── analysis.ts           # Calls backend ML model for predictions
│   │── /api                      # Next.js API routes (backend logic)
│   │   ├── /auth                 # Authentication API routes
│   │   ├── /upload               # Image upload API
│   │   ├── /analyze              # Calls Python backend for ML
│   │   ├── /results              # Fetch ML analysis results
│   │── /styles                   # Global and component-specific styles
│   │   ├── globals.css           # Tailwind CSS global styles
│   │── /config                   # Configuration files (env, constants)
│   │   ├── env.ts                # Environment variables handler
│   │   ├── roles.ts              # Role-based routing and permissions
│   │── /hooks                    # Custom React hooks
│   │   ├── useAuth.ts            # Authentication hook
│   │   ├── useUpload.ts          # Hook for file uploads
│   │   ├── useAnalysis.ts        # Fetch ML analysis results
│── /backend                      # ML Model Backend (Flask/Django)
│   │── /ml_model                 # Python ML backend
│   │   ├── model.py              # CNN model for pneumonia detection
│   │   ├── preprocess.py         # Image preprocessing script
│   │   ├── api.py                # Flask API for ML inference
│   │   ├── requirements.txt      # Python dependencies
│── /prisma                       # Prisma ORM setup
│   │── schema.prisma             # Prisma schema definition
│── /scripts                      # DevOps scripts (deployments, migrations)
│   ├── deploy.sh                 # Deployment script (AWS, Vercel)
│── .env                          # Environment variables
│── .gitignore                    # Files to ignore in Git
│── package.json                   # Project dependencies
│── tsconfig.json                  # TypeScript config
│── next.config.js                 # Next.js configuration
│── README.md                      # Project documentation
```

---

## 🔹 Key Features
- **AI-based Pneumonia Detection** using **TensorFlow & PyTorch**.
- **Role-Based Authentication** (Admin, Doctor, Patient) with **NextAuth.js & JWT**.
- **PostgreSQL + Prisma ORM** for secure medical records.
- **Flask API** to handle AI model inference.
- **Secure Image Upload** using **AWS S3 / Google Cloud Storage**.
- **Monitoring & Logging** via **Sentry & Google Analytics**.

---

## 🚀 How to Run the Project
### **1️⃣ Install Dependencies**
```bash
npm install  # Install Next.js dependencies
pip install -r backend/requirements.txt  # Install Python dependencies
```
### **2️⃣ Setup Environment Variables**
Create a `.env` file and add required API keys & database credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/pneumo_db
NEXTAUTH_SECRET=your-secret-key
AWS_S3_BUCKET=your-bucket-name
```
### **3️⃣ Start the Project**
```bash
npm run dev  # Start Next.js frontend
yarn prisma migrate dev  # Run Prisma migrations
python backend/api.py  # Start Flask AI server
```

---

## 💡 Future Enhancements
- 📌 **Real-Time Chat** between Doctors & Patients.
- 📌 **Appointment Scheduling System**.
- 📌 **Multi-Language Support** for a broader audience.

---

## 🛠 Tech Stack
- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Node.js (Next.js API Routes), Python (Flask)
- **Database:** PostgreSQL + Prisma ORM
- **AI/ML:** TensorFlow, PyTorch, OpenCV
- **Authentication:** NextAuth.js, JWT
- **Cloud & Storage:** AWS S3, Google Cloud Storage

---

## 📞 Support
For any queries, feel free to reach out at **support@pneumo-detection.com** or create an issue in the repository.

---

© 2025 Pneumo-Detection | All Rights Reserved.


# Pneumonia Detection with ResNet

This application uses the ResNet-18 model to analyze chest X-ray images and detect pneumonia.

## Setup Instructions

### Requirements
- Node.js 18+ (for the Next.js application)
- Python 3.8+ (for running the model locally)

### Python Dependencies
Install the Python dependencies needed for the local model:

```bash
pip install -r requirements.txt
```

### Local Model Setup
The application is configured to use the local ResNet model located in the `output` directory.

- `output/final_model.pth` - The trained ResNet model
- `output/best_model.pth` - A backup of the model

### Running the Application
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## About the Model
The ResNet-18 model is trained on a dataset of chest X-ray images to classify between normal and pneumonia cases. It achieves up to 96% accuracy on validation data. The model can identify both bacterial and viral pneumonia and assess severity levels.

## Features
- Upload chest X-ray images for analysis
- View prediction results with confidence scores
- Get pneumonia type and severity assessment
- Print reports for medical records

## Tech Stack
- Next.js 13+ with App Router and server actions
- TypeScript
- TailwindCSS
- PyTorch (ResNet model)


#   p n e u m o - d e t e c t i o n 
 
 