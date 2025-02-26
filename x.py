# import groq
from pydantic import BaseModel, Field, Extra
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import json
from langchain_core.output_parsers import StrOutputParser
import time
start = time.time()
class CoverLetter(BaseModel):
    salutation: str = Field(description = "Salutation such as Dear [Hiring Manager's name] or Dear [Hiring Manager title]")
    body: str = Field(
        description=(
            "Structured cover letter content: \n"
            "- **Opening Paragraph**: Introduce yourself, specify the position, and express interest. \n"
            "- **Body Paragraph**: Detail relevant skills, experiences, and achievements aligning with the job. \n"
            "- **Closing Paragraph**: Reaffirm enthusiasm for the role and express gratitude without adding personal contact details or requesting a follow-up."
        )
    )
    closingSalutation : str = Field(description = "closing salutation such as Sincerely, Best regards, Kind regards followed by your full name ")

    class Config:
        extra = Extra.forbid
# from autogen import AssistantAgent, UserProxyAgent
# Load API Key
# config_list = autogen.config_list_from_json("OAI_CONFIG_LIST")
config_list = [{
    "model": "llama-3.3-70b-versatile",
    # "api_key": os.environ.get("GROQ_API_KEY"),
    "api_key": "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",
    "api_type": "groq"
}]

llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0.7,
    api_key = "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"

)

parser = JsonOutputParser(pydantic_object =CoverLetter)

# Job Description
job_description = """
Software Engineer Internship at XYZ Corp

Responsibilities:
- Develop and maintain scalable backend services using Python and Node.js.
- Collaborate with frontend developers to integrate APIs with React applications.
- Optimize application performance and ensure code efficiency.
- Work with databases like PostgreSQL and MongoDB.
- Participate in code reviews and contribute to team discussions.

Requirements:
- Proficiency in Python, JavaScript, and related frameworks (Django, Flask, Node.js, Express.js).
- Experience with cloud platforms like AWS or GCP.
- Strong problem-solving skills and ability to work in a fast-paced environment.
- Good communication and teamwork skills.

Preferred Qualifications:
- Experience with Docker and Kubernetes.
- Knowledge of CI/CD pipelines.
"""

# Resume Content
resume = """
Aditya Madabhushi
Email: aditya@example.com | LinkedIn: linkedin.com/in/aditya-madabhushi | GitHub: github.com/aditya-m

Education:
- Master’s in Computer Science, Arizona State University (Expected May 2025)
- GPA: 3.89/4.0

Technical Skills:
- Programming Languages: Python, JavaScript, Java, C++
- Backend: Django, Flask, Node.js, Express.js
- Frontend: React.js, Tailwind CSS, Bootstrap
- Databases: PostgreSQL, DynamoDB, MongoDB
- Cloud: AWS (Lambda, EC2, S3), GCP
- DevOps: Docker, Kubernetes, CI/CD

Experience:
- **Machine Learning Intern, Celonis** (May 2024 – Present)
  - Developed anomaly detection models for financial transaction data.
  - Used D3.js and Python to create data visualization dashboards.

- **Software Engineer Intern, Laude Corp** (Jan 2024 – May 2024)
  - Built a RESTful API for an AI-powered recommendation system.
  - Optimized PostgreSQL queries, reducing response time by 30%.
  
Projects:
- **Facial Recognition Web App**: Built a React and AWS-based platform for real-time facial recognition.
- **Financial Fraud Detection**: Implemented an anomaly detection system using ML algorithms.

Certifications:
- AWS Certified Solutions Architect
- TensorFlow Developer Certification
"""

# Print to verify
# print("Job Description:\n", job_description)
# print("\nResume Content:\n", resume_content)

prompt = PromptTemplate(
    template ="""
Assess the given resume and job description carefully. Generate a professional and compelling cover letter for the specified role using only the information available in the resume. 

**Guidelines:**
- Ensure complete accuracy—do not include any information not found in the resume.
- Maintain a formal and engaging tone.
- Structure the cover letter into **three paragraphs**:
    1. **Opening Paragraph**: Introduce yourself, specify the role, and express enthusiasm for the opportunity.
    2. **Body Paragraph**: Highlight relevant skills, experiences, and achievements that align with the job description.
    3. **Closing Paragraph**: Reiterate interest, express gratitude, and include a call to action.

Use the provided {job_description} and {resume}.  
The output must follow this format: {format_instructions}.
""",
     input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
    
)
chain = prompt | llm | parser
result = chain.invoke({"job_description": job_description,"resume":resume})
clean_paragraphs = [para.strip() for para in result["body"].split("\n\n") if para.strip()]

# Update the body to be an array of clean paragraphs
result["body"] = clean_paragraphs  

# Send `result` to React as JSON
json_output = json.dumps(result)
# print(json_output)
end= time.time()
print(end - start)





