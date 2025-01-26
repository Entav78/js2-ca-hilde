# JS2-CA Project: Social Media Application

JS2-CA Project: Social Media Application
This project is a continuation of the JavaScript 2 course assignment at Noroff. The focus has shifted to applying responsive design and styling using Bootstrap and SASS to improve the user interface.

Core Features
User Registration: Allows users to create an account. Fully operational.
User Login: Users can log in to access posts and their profile.
Profile Page: Displays user-specific posts and profile information.
Post Management: Users can create, view, and manage their posts.
Styling Frameworks Used
Bootstrap: Applied for layout consistency and responsiveness.
SASS: Used for customized styling and CSS enhancements.
What Works
Responsive Design: Pages are optimized for different screen sizes (desktop, tablet, and mobile).
Navigation: A fully functioning navigation menu that dynamically adjusts based on login state.
Mobile Menu: A hamburger menu for smaller screens.
Known Issues
CSS Issues in Production: Occasionally, CSS may not load due to incorrect file paths in the production environment.
Missing Features: Search bar, follow button, and other social functionalities are yet to be implemented.
Future Improvements
Fix pathing issues for CSS and JavaScript in production.
Complete missing UI components (search bar, follow button).
Improve animations and transitions for a smoother user experience.
Perform cross-device testing on mobile, tablets, and desktops.
How to Run the Project
Clone the repository:
bash
Kopier
Rediger
git clone https://github.com/Entav78/js2-ca-hilde.git
Install dependencies:
bash
Kopier
Rediger
npm install
Run the development server:
bash
Kopier
Rediger
npm run dev
Build for production:
bash
Kopier
Rediger
npm run build
Acknowledgements
Special thanks to Noroff for the API documentation and project setup.



This project is a social media application created as part of the JavaScript 2 course assignment at Noroff. The app allows users to register, log in, create posts, and interact with a profile page. I thought I was on the right track, but this last day everything fell apart, and I wasn't able to fix the issues (that just became duplicatet for each bug I wanted to fix) I tried branching twice today to find back to where I was before everyting went to pieces, but while the clock was ticking I became more stressed and exhausted,

## **Core Features**
- User registration Works
- User login Worked perfectly utntil I started messing around with profile page. 
- Profile page worked for a while, but I haven't been able to recreate this.
- Post creation works, but when I can't log in with any of my created accounts, I can't access the posts displayed in home page or the user's created posts in profile page.

## **Known Issues**
- **Login Issue:** Users may encounter issues logging in due to lack of time and seriously lack of sleep.
- **Profile Page:** [At one time I was able to go to my profile page and all posts I had posted would be displayed on this page].
- **CSS Styling:** Not priority.
- **Navigation Bugs: Due to not being able to fix the login issue under stress, it is easy to navigate. The navigation depends on being logged in....

## **What Works**
- The registration functionality is operational.
- Basic navigation between key pages is implemented (hiding the button for the current page -no point in relocating to the same page you already are located).
- Posts are displayed on the home page when logged in. Posts on the Profile page was up an running, but got lost  .

## **Future Improvements**
In the future I will "npm run build" straight away...
Given more time, I would:
- Get more sleep.
- Fix pathing issues for better routing between pages.
- Implement full CRUD operations for posts.
- Enhance the profile page to display user data dynamically.
- Buttons and functions for deleting and editing
- Improve the CSS for a better user experience.

## **How to Run the Project**
1. Clone the repository:
   ```bash
   git clone https://github.com/Entav78/js2-ca-hilde.git






# JavaScript 2 Course Assignment

## 2023/4 Study Plan

### Introduction

In this course assignment, you will be building a client-side social media application. This application will allow users to perform CRUD operations (Create, Read, Update, and Delete) on their own posts, as well as enable additional features such as following/unfollowing users, commenting on posts, and reacting to a post with an emoji.

Unlike previous projects, you will be working on the app logic first and styling the application later.

### Project Template

This project has been set up with a Vite template using Vanilla JavaScript settings, using MPA (Multi-page application) mode. Additional HTML pages not originally included in the project template must be listed in the `vite.config.js` file.

The template contains JavaScript files that must be finished to complete this assignment.

This project comes with some basic unit tests. They can be used to get instant feedback while developing. To run all tests write `npm run test` in your console. To only test a specific file write `npx vitest <name-of-file>`.

Example to test your login function: `npx vitest login`


### Resources

- Noroff API Documentation:  
  https://docs.noroff.dev/docs/v2/social/posts

- Noroff API Swagger:  
  https://v2.api.noroff.dev/docs/static/index.html#/social-profiles

