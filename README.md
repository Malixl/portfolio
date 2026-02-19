# Lix Portfolio

A modern, dynamic, and fully responsive personal portfolio website built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). This project showcases projects, skills, experiences, and blogs with a robust custom Content Management System (CMS) for easy updates.

## 🚀 Features

-   **Dynamic Content**: Manage Projects, Skills, Experiences, Education, Certificates, and Blogs via a custom Admin Dashboard.
-   **Security**: Secured with JWT Authentication, Helmet, Rate Limiting, XSS Protection, and MongoDB Sanitization.
-   **SEO Optimized**: Dynamic metadata using `react-helmet-async`, `robots.txt`, and `sitemap.xml`.
-   **Cloud Integration**: Images are optimized and served via **Cloudinary**.
-   **Dark Mode**: Fully supported dark/light theme switching.
-   **Responsive Design**: Built with **Tailwind CSS** for a seamless experience on mobile, tablet, and desktop.
-   **Animations**: Smooth transitions and effects using **Framer Motion**.

## 🛠️ Tech Stack

### Frontend (Client)
-   **React** (Vite)
-   **Tailwind CSS** (Styling)
-   **Framer Motion** (Animations)
-   **React Router** (Navigation)
-   **Lucide React** & **React Icons** (Icons)
-   **Axios** (API Requests)
-   **React Helmet Async** (SEO)

### Backend (Server)
-   **Node.js** & **Express.js**
-   **MongoDB** (Mongoose ODM)
-   **Cloudinary** (Image Storage)
-   **JWT** (Authentication)
-   **Helmet** & **Cors** (Security)

## 📂 Project Structure

```
/
├── client/         # Frontend React Application
│   ├── src/        # Source code
│   └── public/     # Static assets, robots.txt, sitemap.xml
├── server/         # Backend Node.js API
│   ├── controllers/# Logic for handling requests
│   ├── models/     # Database schemas
│   └── routes/     # API endpoints
├── DEPLOYMENT.md   # Guide for deploying to Vercel
└── README.md       # This file
```

## 📖 Documentation

For instructions on how to deploy this application to **Vercel**, please refer to [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
