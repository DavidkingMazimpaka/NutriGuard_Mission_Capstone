# NutriGuard: Early Malnutrition Detection in Children Under 5

## Description
NutriGuard is an AI-powered system designed for the early detection of malnutrition in children under the age of five in Western Province of Rwanda. By leveraging Rwanda Demographic Health Survey (DHS) data from the 2021 report, the system analyzes key health indicators to provide an early warning system for malnutrition. The solution is built for healthcare professionals, NGOs, and government agencies to improve child health outcomes.

## GitHub Repository
[Project Repository](https://github.com/DavidkingMazimpaka/NutriGuard_Mission_Capstone)

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Python 3.8+
- Jupyter Notebook
- Virtual environment (venv or conda)
- Required dependencies (listed in `requirements.txt`)

### Steps to Set Up the Environment
1. **Clone the repository:**  
   ```sh
   git clone INSERT_GITHUB_REPO_LINK_HERE
   cd nutriguard
   ```
2. **Create and activate a virtual environment:**  
   ```sh
   python3 -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```
3. **Install dependencies:**  
   ```sh
   pip install -r requirements.txt
   ```
4. **Run the Jupyter Notebook (for model training & testing):**  
   ```sh
   jupyter notebook
   ```
5. **Run the Web App (if applicable):**  
   ```sh
   streamlit run app.py
   ```

## Designs
The project includes the following design components:
- **Figma Mockups:** UI/UX designs for the mobile and web interfaces. [View Mockups](https://www.figma.com/proto/jgtbH2Xs0YMXiesIClfGWi/NutriGuard?node-id=0-1&t=9lzvu1IxIhSQkn9T-1)
- **Screenshots:** Sample images of the application interfaces.

## Deployment Plan
The project will be deployed in multiple phases:
### **1. Model Deployment**
- Deploy the model using **FastAPI**.
- Host on **AWS Lambda, Google Cloud, or Heroku** for accessibility.
- Use Docker for scalable deployment.

### **2. Web & Mobile App Deployment**
- **Frontend:** Developed with React (web) and Flutter (mobile).
- **Backend:** Hosted on AWS/GCP with a secure API connection.
- **Database:** PostgreSQL or Firebase for storing patient records and results.

### **3. Integration with Health Systems**
- API integrations with hospital EMRs (Electronic Medical Records) for real-time patient monitoring.
- Secure authentication and role-based access control for healthcare professionals.

---
For more details, check the documentation in the repository. Feel free to contribute or report issues!

**Maintainer:** [KingDavid Mazimpaka]  
**Contact:** [mazimpakadavid607@gmail.com] 

