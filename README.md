
# Blog Editor

A full-stack blogging application with a rich text editor powered by TipTap. The project features a separate backend and frontend.

---

## 📁 Project Structure

- **backend/** — Node.js & Express backend server code  
- **frontend/** — React frontend app using Vite  
- **package.json** — Root-level backend dependencies and scripts  
- **.env** — Environment variables for backend configuration
---

## ⚙️Setup Instructions

### Backend Setup

1. Navigate to the root folder of the project (where the backend folder is located).  
2. Install backend dependencies by running `npm install`.  
3. Create a `.env` file in the root directory and add your environment variables (MONGO_URI=mongodb://127.0.0.1:27017/blogEditor and JWT_SECRET=your_super_secret_key).  
4. Start the backend server using command (`node server.js` and backend will be running on `http://localhost:8080`) .

### Frontend Setup

1. Navigate into the `frontend` directory.  
2. Install frontend dependencies by running `npm install`.  
3. Start the frontend development server using `npm run dev`.  
4. Open your browser and go to the URL provided by the development server (usually `http://localhost:5173`).

----------

## 🛠️ Tech Stack

**Frontend**

-   **HTML5**, **CSS3**
    
-   **Bootstrap** – for styling and responsive layout
    
-   **React.js** (with **Vite**) – component-based frontend architecture
    
-   **TipTap** – rich text editor integration
    
-   **Zustand** – lightweight state management
    
-   **Axios** – handling API requests
    
-   **React Router DOM** – for client-side routing
    

**Backend**

-   **Node.js**
    
-   **Express.js** – RESTful APIs
    
-   **MongoDB** – database with **Mongoose** ODM
    
-   **Passport.js** (with `passport-local-mongoose`) – for user authentication
    
-   **JSON Web Token (JWT)** – secure token-based authentication
    

**Other Tools**

-   **Hoppscotch** – used for API testing
    
-   **Git & GitHub** – version control and collaboration
    

----------
## 🎥 Video Walkthrough

Watch a short video demo of the Blog Editor in action:
>Click here: https://drive.google.com/file/d/163SoPLaDZDu3iw0mVR2_9kkbDeL_9SIi/view?usp=sharing

-----
## 📬 Contact

For questions or support, please reach out to: **berasumanraj@gmail.com**

GitHub repository: **https://github.com/SumanrajBera**
