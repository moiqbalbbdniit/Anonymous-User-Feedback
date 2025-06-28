<h1 align="center" id="title">Anonymous User Feedback</h1>

<p align="center"><img src="https://socialify.git.ci/moiqbalbbdniit/nextjslearning/image?font=Raleway&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;stargazers=1&amp;theme=Dark" alt="project-image"></p>

<p id="description">The Anonymous Feedback System is a modern full-stack web application developed using Next.js and TypeScript designed to allow users to collect and manage anonymous feedback from others. Deployed on Netlify this project showcases a secure real-time platform where registered users can receive messages anonymously through a unique shareable link. 🌟 Core Features User Authentication with OTP Verification: Users can sign up with their email receive a One-Time Password (OTP) for verification and then securely sign in using NextAuth. This additional verification layer ensures only valid users can access the platform. Unique Link Generation: Upon successful login each user receives a unique feedback URL which they can share with friends clients or teammates to collect feedback. Anonymous Messaging: Visitors (unauthenticated users) can access the feedback URL and submit messages without logging in. They can either write freely or select from a set of randomly generated prompt questions to guide their feedback. Toggle Feedback Mode: Authenticated users have control over whether they are currently accepting messages. They can toggle this option from their dashboard at any time. Real-time Feedback View: The application supports real-time updates for received messages allowing users to instantly see new feedback without refreshing the page. Message Deletion: Users have the option to delete individual feedback messages giving them control over the content displayed in their dashboard. 🧰 Tech Stack Frontend &amp; Backend: Next.js Type Safety: TypeScript Authentication: NextAuth.js with email &amp; OTP-based auth Styling: Tailwind CSS for a clean responsive UI Linting: ESLint for code quality and consistency Deployment: Hosted on Netlify 🧠 Challenges &amp; Learnings One of the most challenging aspects of the project was handling authentication with NextAuth especially implementing email verification via OTP and maintaining session state securely. Managing protected routes and ensuring smooth UX across both authenticated and anonymous views was a key learning curve. Additionally building a real-time feedback system that operates without revealing user identities required careful planning in both frontend UX design and backend API routing to preserve anonymity and responsiveness. 📁 Project Highlights Clean component-based structure using pages components and utils Secure backend logic using API routes for OTP verification and feedback storage Thoughtful UI/UX with toggles modals and feedback cards Live site deployed via Netlify with environment configuration for auth providers</p>

<p align="center"><img src="https://img.shields.io/badge/Next.js-Framework-black" alt="shields"><img src="https://img.shields.io/badge/TypeScript-Language-3178C6" alt="shields"><img src="https://img.shields.io/badge/Deployment-Netlify-00C7B7" alt="shields"><img src="https://img.shields.io/badge/Status-Live-brightgreen" alt="shields"></p>

<h2>🚀 Demo</h2>

[https://iqbalnextjs.netlify.app/](https://iqbalnextjs.netlify.app/)

<h2>Project Screenshots:</h2>

<img src="https://github.com/moiqbalbbdniit/nextjslearning/blob/master/public/projecrtss.png?raw=true" alt="project-screenshot" width="400" height="400/">

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   ✨ Features ✅ Email Sign-Up with OTP Verification Secure registration flow using email and OTP for identity confirmation. 🔐 Secure Login via NextAuth.js Integrated authentication system with session management and protection for private routes. 🔗 Unique Feedback Link Generation Every user gets a unique URL that they can share to collect anonymous messages. 🧑‍💻 Anonymous Message Submission Anyone with the link can submit feedback without logging in—no identity is required. 📝 Optional Random Prompts Visitors can choose from randomly generated questions to make feedback easier and more fun. 📥 Real-Time Feedback Updates Feedback appears instantly on the user's dashboard—no need to refresh manually. 🎛️ Accept/Reject Toggle for Feedback Users can control whether they're accepting messages at any time. 🗑️ Delete Feedback Option Users can easily remove any feedback they no longer wish to keep. 📱 Responsive UI with Tailwind CSS Mobile-friendly and clean design using utility-first CSS for consistent styling. 🚀 Deployed with Netlify Fast and reliable production deployment using Netlify with environment variables.

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone https://github.com/moiqbalbbdniit/nextjslearning.git
```

<p>2. Navigate to the project directory</p>

```
cd nextjslearning
```

<p>3. Install dependencies</p>

```
npm install
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Next.Js
*   TypeScript
*   Tailwind CSS
*   ESLint
*   MongoDB
*   Netlify

<h2>🛡️ License:</h2>

This project is licensed under the MIT LICENSE rule
