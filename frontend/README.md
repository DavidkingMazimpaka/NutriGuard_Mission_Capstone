# **NutriGuard Frontend**

An early malnutrition detection system frontend for children under 5 years old, designed to be intuitive for healthcare workers and parents, even in low-resource settings.

---

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** and **npm**  
  _Recommended installation via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)_

---

### **Installation & Running Locally**
Follow the steps below to set up the project on your local machine:

```bash
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate into the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The app should now be running at `http://localhost:5173` (default Vite port).

---

## **Tech Stack**
This project is built with:
- **Vite**
- **TypeScript**
- **React**
- **shadcn/ui**
- **Tailwind CSS**

---

## **Deployment**
You can deploy this project on platforms like:
- **Vercel**
- **Netlify**
- **Render**

Follow their documentation to connect your repository and deploy.

---

## **Project Structure (Optional Example)**
```
/src
  /components   # Reusable components
  /pages        # Route-based pages
  /services     # API calls
  /styles       # Tailwind and custom CSS
  /utils        # Utility functions
```

---

## **Environment Variables**
Create a `.env` file in the root for API URLs or keys:
```
VITE_API_BASE_URL=http://localhost:8000
```

Access it in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## **Contribution**
- Fork the repo
- Create your feature branch (`git checkout -b feature/YourFeature`)
- Commit your changes (`git commit -m 'Add YourFeature'`)
- Push to the branch (`git push origin feature/YourFeature`)
- Open a Pull Request

---