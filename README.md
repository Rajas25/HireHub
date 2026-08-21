# HireHub

## 📌 Overview

**JOB ENTRY 1.0.0** is a job application and career management platform designed to help students and job seekers organize, track, and improve their job search process.

The platform provides a centralized place to manage job applications, resumes, application progress, and career preparation.

## 🚀 Features

* 👤 User profile management
* 📄 Resume management
* 🔍 Job search and job listing management
* 📊 Job application tracking
* 📌 Application status tracking
* 🎯 Career roadmap and progress tracking
* 📈 Dashboard for application insights
* 📝 Resume analysis and ATS score
* 🔐 User authentication
* 📱 Responsive user interface

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Python
* FastAPI

### Database

* MongoDB

### Authentication

* JWT Authentication

### Development Tools

* Git
* GitHub
* VS Code

## 📂 Project Structure

```text
JOB ENTRY-1.0.0/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── README.md
└── ...
```

> The exact structure may vary depending on the current implementation.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rajas25/HireHub.git
cd HireHub
```

### 2. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Set up the backend

Open another terminal:

```bash
cd backend
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

## 🔑 Environment Variables

Create a `.env` file in the backend directory and add the required environment variables.

Example:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do **not** commit `.env` files or secret credentials to GitHub.

## 📊 Core Modules

### Job Management

Allows users to organize job opportunities and keep track of applications.

### Application Tracking

Users can monitor applications through different stages such as:

```text
Applied → Screening → Interview → Selected / Rejected
```

### Resume Analysis

Provides resume evaluation and an ATS-oriented score to help users identify areas for improvement.

### Career Roadmap

Helps users organize their career preparation and track progress toward their goals.

## 🎯 Objective

The objective of JOB ENTRY 1.0.0 is to make the job-search process more organized and manageable by bringing job discovery, application tracking, resume improvement, and career planning into one platform.

## 🔮 Future Enhancements

* Personalized job recommendations
* Interview preparation
* Skill-gap analysis
* Email notifications
* Advanced analytics
* Company insights
* Calendar integration
* Mobile application

## 👨‍💻 Development

This project is developed as a software project focused on improving the job application experience for students and job seekers.

## 📄 License

This project is intended for educational and development purposes.
