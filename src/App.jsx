import { useState } from "react";
import MyDocument from "./Pdf.jsx";
import { PDFViewer } from "@react-pdf/renderer";
import "./App.css";
import pdfToText from 'react-pdftotext';

const App = () => {
  // Form state without localStorage
  const [fullName, setFullName] = useState("");
  const [fileName,setFileName] =useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hiringManager, setHiringManager] = useState("");
  // const [company, setCompany] = useState("");
  const [coverLetter, setCoverLetter] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFileText, setResumeFileText] = useState("");
  const lambdaUrl = import.meta.env.VITE_LAMBDA;
  // State to control PDF preview data
  const [previewData, setPreviewData] = useState({
    fullName: "",
    email: "",
    phone: "",
    hiringManager: "",
    // company: "",
    coverLetter: "",
  });

  // Handle resume file upload
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name)
    // extract text
    pdfToText(file).then(text => setResumeFileText(text))
    .catch(error => console.error("failed to extract pdf"))
    // if (file) {
    //   setResumeFile(file);
    // }
  };

  // Function to generate cover letter using Groq API
  const generateCoverLetter = async () => {
    if (!jobDescription || !resumeFileText) {
      alert("Please provide a job description and upload your resume.");
      return;
    }

    
    setCoverLetter([]);
    const res = await fetch(lambdaUrl,{
      method:'POST',
      headers :{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({job_description: jobDescription, resume: resumeFileText})
    });

    const data = await res.json();
    console.log("Received Message from the lambda", data.body);
    const newdata = Array.isArray(data.body) ? data.body : [data.body];
    setCoverLetter(coverLetter => [...coverLetter,...newdata])
    console.log("teh cover letter",coverLetter)
    // const formData = new FormData();
    // formData.append("resume", resumeFile);
    // formData.append("job_description", jobDescription);

    // try {
    //   const response = await fetch("YOUR_GROQ_API_ENDPOINT", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const data = await response.json();
    //   setCoverLetter(data.generated_text || "Cover letter could not be generated.");
    // } catch (error) {
    //   console.error("Error generating cover letter:", error);
    //   setCoverLetter("Failed to generate cover letter.");
    // }
  };

  // Function to manually update the preview
  const updatePreview = () => {
    setPreviewData({
      fullName,
      email,
      phone,
      hiringManager,
      // company,
      coverLetter,
    });
  };



  return (
    <div className="grid grid-cols-2 w-full h-full bg-gray-950 p-5 gap-8">
      {/* Input Form */}
      <div className="bg-zinc-900 p-6 shadow-lg rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-4">Cover Letter Generator</h1>
        <div className="space-y-4">
      

<div className="grid grid-cols-2 gap-8">
            <div className="fullname">
            <label className="text-sm text-zinc-600">Fullname</label>
          <input
            type="text"
            className="w-full p-1 border rounded bg-zinc-700 text-zinc-400 mt-2"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
            </div>
          <div className="div"> 
          <label className="text-sm text-zinc-600 mt-4">Hiring Manager's Name</label>
          <input
            type="text"
            className="w-full p-1 border rounded bg-zinc-700 text-zinc-400 mt-2"
            placeholder="Hiring Manager’s Name"
            value={hiringManager}
            onChange={(e) => setHiringManager(e.target.value)}
          />
          </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="email">
            <label className="text-sm text-zinc-600 mt-4">Email</label>
          <input
            type="email"
            className="w-full p-1 border rounded bg-zinc-700 text-zinc-400 mt-2"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            </div>
          <div className="div"> 
          <label className="text-sm text-zinc-600 mt-4">Phone Number</label>
          <input
            type="text"
            className="w-full p-1 border rounded bg-zinc-700 text-zinc-400 mt-2"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </div>
          </div>
         
        
        
          {/* <label className="text-sm text-zinc-600 mt-4">Company Name</label>
          <input
            type="text"
            className="w-full p-1 border rounded bg-zinc-700 text-zinc-400 mt-2"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          /> */}

       
          
<div className="flex flex-col md:flex-row gap-4 mt-2">
  {/* Resume Upload */}
  <div className="w-full md:w-1/2">
    <label className="text-sm text-zinc-600">Upload Resume</label>
    <div className="flex items-center mt-2 w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-37 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleResumeUpload} />
      </label>
    </div>
    {fileName && (
  <div className="mt-2 flex space-x-2">
    <p className="text-green-600 justify-self-center font-semibold">✅ Uploaded: {fileName}</p>
    <button
      onClick={() => setFileName("")}
      className="text-red-600 font-semibold hover:underline"
    >
<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
</svg>


</button>
  </div>
)}

  </div>


  {/* Job Description */}
  <div className="w-full md:w-1/2">
    <label className="text-sm text-zinc-600">Job Description</label>
    <textarea
      className="w-full p-2 border rounded bg-zinc-700 text-zinc-400 mt-2 h-37"
      placeholder="Job Description (Optional)"
      value={jobDescription}
      onChange={(e) => setJobDescription(e.target.value)}
    ></textarea>
  </div>
</div>

<div className="flex justify-center mt-6">
  <button
    onClick={generateCoverLetter}
    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
  >
    Generate Cover Letter
  </button>
</div>
        </div>

        <label className="text-sm text-zinc-600 mt-4">Cover Letter Content </label>
          <textarea
            className="w-full h-50 p-1 border rounded bg-zinc-700 text-zinc-400 mt-2"
            placeholder="Cover Letter Content Type it or Generate it above With resume and JD"
            value={Array.isArray(coverLetter) ? coverLetter.join("\n\n") : coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>
      </div>

      {/* PDF Viewer */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-bold">Cover Letter Preview</h1>
  <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={updatePreview}>
    Reload Preview
  </button>
</div>
        <PDFViewer className="w-full h-7/8 border">
          <MyDocument
            fullName={previewData.fullName}
            email={previewData.email}
            phone={previewData.phone}
            hiringManager={previewData.hiringManager}
            // company={previewData.company}
            coverLetter={previewData.coverLetter}
          />
        </PDFViewer>
      </div>

     
    </div>
  );
};

export default App;
