import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TryTemplate } from './ResumeTemplates/TryTemplate';
// import JsPDF from "jspdf";
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';
import { FileUploader } from "react-drag-drop-files";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import img1 from "./TemplateImgs/template1.png"
import img2 from "./TemplateImgs/template2.png"
import img3 from "./TemplateImgs/template3.png"
import img4 from "./TemplateImgs/template4.png"
import img5 from "./TemplateImgs/template5.png"
import img6 from "./TemplateImgs/template6.png"
import Layout from '../../../Layout/Layout';
import { Backdrop } from '@mui/material';
import NewLoader from '../NewLoader';

import ImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'; // Import the CSS
import { DomainService } from '../../../Services/DomainService';
import { ResumeBuilderService } from '../../../Services/ResumeBuilderService';
import { CandidateRegService } from '../../../Services/CanRegistration/CandidateRegService';
import Creatable, { useCreatable } from 'react-select/creatable';
import SearchInput from './SearchInput';
import { AuthService } from '../../../Services/AuthService';
import { Helmet } from 'react-helmet';

const steps = [
    { number: 1, label: "Basic Details" },
    { number: 2, label: "Experience" },
    { number: 3, label: "Education" },
    { number: 4, label: "Skills" },
    { number: 5, label: "Summary" },
    { number: 6, label: "Custom" }
];

const fileTypes = ["JPG", "JPEG", "WEBP", "PNG", "GIF", "SVG", "BMP"];
const MAX_IMAGE_SIZE_MB = 0.6; // Set maximum image size in MB

const ResumeBuilder = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [candidateResumeDetail, setCandidateResumeDetail] = useState({
        name: "",
        jobTitle: "",
        email: "",
        phoneNumber: "",
        address: "",
        experiences: [{ expJobTitle: "", companyName: "", experienceDetail: "", expduration: "" }],
        education: [{ eduSchool: "", eduDegree: "", eduYear: "" }],
        profileImg: "",
        skills: [{ skill: "" }],
        summary: "",
        custom: [{ customTitle: "", customDetail: "", editorState: EditorState.createEmpty() }]
    })
    // State to hold form errors
    const [errors, setErrors] = useState({});
    const [templateId, setTemplateId] = useState(1);
    const [file, setFile] = useState(null);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [openLoader, setopenLoader] = React.useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [image, setImage] = useState(null);
    const [hasShownNotification, setHasShownNotification] = useState(false); // Flag for showing the notification
    const [toastShown, setToastShown] = useState(false);
    const [positionOptions, setPositionOptions] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [isCustom, setIsCustom] = useState(false);

    const [options, setOptions] = useState([
        { value: 'ELECTRICIAN', label: 'ELECTRICIAN' },
        { value: 'Engineer - Mechanical', label: 'Engineer - Mechanical' },
        { value: 'Engineer - Electrical', label: 'Engineer - Electrical' },
        { value: 'Engineer - Civil', label: 'Engineer - Civil' },
        { value: 'Pipe Fitter', label: 'Pipe Fitter' },
        { value: 'Other Activity', label: 'Other Activity' },
        { value: 'Rigger', label: 'Rigger' },
        { value: 'Electrical', label: 'Electrical' },
        { value: 'Safety Officer', label: 'Safety Officer' },
        { value: 'Sales Executive', label: 'Sales Executive' },
        { value: 'Sales Manager', label: 'Sales Manager' },
        { value: 'Engineer', label: 'Engineer' },
        { value: 'Storekeeper', label: 'Storekeeper' },
        { value: 'Driver', label: 'Driver' },
        { value: 'Engineer - Chemical', label: 'Engineer - Chemical' },
    ]);
    const [candidateId, setCandidateId] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const notify = (message) =>
        toast.info(message, {
            position: "top-center",
            autoClose: 4500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });;

    const handleImageChange = (newImage) => {
        setImage(newImage);
    }

    // const initialImage: string = '/assets/images/8ptAya.webp';
    const initialImage = img1;


    //download resume
    const handleDownload = async () => {
        setopenLoader(true)
        // 1. Download PDF
        try {
            const downloadPdf = async () => {
                const htmlContent = document.getElementById('resumeContent').innerHTML.trim();
                const response = await ResumeBuilderService.downloadResume(htmlContent);

                if (response.ok) {
                    const { pdf } = await response.json();

                    const byteCharacters = atob(pdf);  // Decode the base64 string
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });

                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${candidateResumeDetail.name}Resume.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    setopenLoader(false)
                } else {
                    console.error("Failed to download PDF");
                    setopenLoader(false)
                }
            }


            //this is for saving resume  data 
            const saveResumeData = async () => {
                const htmlContent = document.getElementById('resumeContent').innerHTML.trim();
                const dataInParameterFormat = {
                    Name: candidateResumeDetail?.name,
                    PhoneNumber: candidateResumeDetail?.phoneNumber,
                    EmailID: candidateResumeDetail?.email,
                    Designation: candidateResumeDetail?.jobTitle,
                    Experience: candidateResumeDetail?.experiences,
                    Skills: candidateResumeDetail?.skills,
                    Education: candidateResumeDetail?.education,
                    Custom: candidateResumeDetail?.custom?.map(cur => {
                        return (
                            { "customTitle": cur?.customTitle, "customDetail": cur?.customDetail }
                        )
                    })
                }
                const user = AuthService.getCurrentUser();
                const data = {
                    encCandidateId: user?.userId,
                    jsonData: JSON.stringify(dataInParameterFormat),
                    htmlData: htmlContent
                }
                const res = await ResumeBuilderService.SaveResumeBuilderData(data);
            };

            // Call both functions asynchronously
            await Promise.all([downloadPdf(), saveResumeData()]);


            //original only html

            // const element = document.createElement("a");
            // const file = new Blob([document.getElementById('resumeContent').innerHTML], { type: 'text/html' });
            // element.href = URL.createObjectURL(file);
            // element.download = "resume.html";
            // document.body.appendChild(element);
            // element.click();
            // console.log(document.getElementById('resumeContent').innerHTML);
            // console.log(document.getElementById('resumeContent'));

            // try {

            //     let htmlContent = document.getElementById('resumeContent').innerHTML;
            //     fetch('http://localhost:5000/generate-pdf', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ htmlContent: htmlContent })
            //     })
            //         .then(response => {response.blob()})

            //         .then(blob => {
            //             const url = window.URL.createObjectURL(blob);
            //             const a = document.createElement('a');
            //             a.href = url;
            //             a.download = 'resume123.pdf';
            //             document.body.appendChild(a);
            //             a.click();
            //             a.remove();
            //         });
            // }
            // catch (error) {
            //     console.log(error.message);

            // }



            // debugger
            // const element = document.getElementById('resumeContent');
            // const canvas =  html2canvas(element);
            // const imgData = canvas.toDataURL('image/png');
            // const pdf = new JsPDF();
            // pdf.addImage(imgData, 'PNG', 0, 0);
            // pdf.save('resume.pdf');

            // const report = new JsPDF("portrait", "pt", [495, 942]);
            // report.html(document.getElementById("resumeContent")).then(() => {
            //     report.save(`resume.pdf`);
            // });


            //for only image

            // const element = document.getElementById('resumeContent');

            // // // Configure the options for html2pdf
            // const opt = {
            //     margin: 0,
            //     filename: 'resume.pdf',
            //     image: { type: 'jpeg', quality: 1 },
            //     html2canvas: { scale: 2 },
            //     jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
            // };

            // // Generate the PDF with selectable and searchable text
            // html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf) => {
            //     // Save the PDF
            //     pdf.save('resume.pdf');
            // });

        } catch (error) {
            console.error("Error during PDF download:", error);
        }
        // finally {
        //     setopenLoader(false);
        // }

    };

    // Helper functions for additional validation
    const validateEmail = (email) => {
        debugger
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phoneNumber);
    };


    // Updated stepValidations with error tracking
    const stepValidations = {
        1: () => {
            const newErrors = {};
            if (!candidateResumeDetail.profileImg) newErrors.profileImg = "Profile image is required.";
            if (!candidateResumeDetail.name) newErrors.name = "Name is required.";
            if (!candidateResumeDetail.email) newErrors.email = "Email is required.";
            if (!validateEmail(candidateResumeDetail.email)) newErrors.email = "Invalid email address.";
            if (!candidateResumeDetail.jobTitle) newErrors.jobTitle = "Job title is required.";
            if (!candidateResumeDetail.address) newErrors.address = "Address is required.";
            if (!candidateResumeDetail.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
            if (!validatePhoneNumber(candidateResumeDetail.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits.";
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        },
        2: () => {
            const newErrors = {};
            if (candidateResumeDetail.experiences.length > 0) {
                candidateResumeDetail.experiences.forEach((experience, index) => {
                    if (!experience.expJobTitle) newErrors[`experience_${index}_expJobTitle`] = "Job title is required.";
                    if (!experience.companyName) newErrors[`experience_${index}_companyName`] = "Company name is required.";
                    if (!experience.experienceDetail) newErrors[`experience_${index}_experienceDetail`] = "Experience detail is required.";
                    if (!experience.expduration) newErrors[`experience_${index}_expduration`] = "Experience duration is required.";
                });
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        },
        3: () => {
            const newErrors = {};
            if (candidateResumeDetail.education.length > 0) {
                candidateResumeDetail.education.forEach((education, index) => {
                    if (!education.eduSchool) newErrors[`education_${index}_eduSchool`] = "School name is required.";
                    if (!education.eduDegree) newErrors[`education_${index}_eduDegree`] = "Degree is required.";
                    if (!education.eduYear) newErrors[`education_${index}_eduYear`] = "Year of graduation is required.";
                });
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        },
        4: () => {
            const newErrors = {};
            if (candidateResumeDetail.skills.length > 0) {
                candidateResumeDetail.skills.forEach((skill, index) => {
                    if (!skill.skill) newErrors[`skill_${index}`] = "Skill is required.";
                });
            }

            setErrors(newErrors);
            console.log(newErrors, "skills");
            return Object.keys(newErrors).length === 0;


        },
        5: () => {
            const newErrors = {};
            if (!candidateResumeDetail.summary) newErrors.summary = "Summary is required.";

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
    };

    //left side bar to directly goes on particular step on click
    const handleStepClick = (step) => {
        // Loop through each previous step and validate it
        for (let i = 1; i < step; i++) {
            if (!stepValidations[i]()) {
                // alert(`Please complete step ${i} before proceeding.`);
                notify(`Please complete step ${i} before proceeding`);
                return; // Prevent navigation to the desired step
            }
        }
        // If all previous steps are validated, navigate to the desired step
        setCurrentStep(step);
        if (!completedSteps.includes(step - 1)) {
            setCompletedSteps([...completedSteps, step - 1]);
        }
    };


    //for next button click
    const handleNextClick = (step) => {
        if (!stepValidations[step]()) {
            notify(`Please complete step ${step} before proceeding`);
            return;
        }
        if (step < steps.length) {
            handleStepClick(step + 1);
        } else {
            handleStepClick(step + 1);  // Final step or moving to the next
        }
        // handleStepClick(step + 1)
    };

    //for previous button click
    const handlePreviousClick = () => {
        if (currentStep > 1) {
            handleStepClick(currentStep - 1);
        }
    };

    //conver image into base 64
    const blobToBase64DataURL = (blob) => new Promise(
        resolvePromise => {
            const reader = new FileReader();
            reader.onload = () => resolvePromise(reader.result);
            reader.readAsDataURL(blob);
        }
    )

    const handleChange = (e) => {
        setCandidateResumeDetail(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));

    };

    // expreience section 
    const handleExperienceChange = (index, e) => {
        const updatedExperiences = candidateResumeDetail.experiences.map((exp, i) =>
            i === index ? { ...exp, [e.target.name]: e.target.value } : exp
        );
        setCandidateResumeDetail(prev => ({
            ...prev,
            experiences: updatedExperiences
        }));
    }

    const addExperience = () => {
        setCandidateResumeDetail(prev => ({
            ...prev,
            experiences: [...prev.experiences, { expJobTitle: "", companyName: "", experienceDetail: "", expduration: "" }]
        }));
    };

    const handleRemoveExperience = (index) => {
        if (candidateResumeDetail.experiences.length > 1) {
            const updatedExperiences = candidateResumeDetail.experiences.filter((_, i) => i !== index);
            setCandidateResumeDetail((prev) => ({
                ...prev,
                experiences: updatedExperiences
            }));
        }
    };

    //  Education section

    const handleEducationChange = (index, e) => {
        debugger;
        const updatedEducations = candidateResumeDetail.education.map((exp, i) =>
            i === index ? { ...exp, [e.target.name]: e.target.value } : exp
        );
        setCandidateResumeDetail(prev => ({
            ...prev,
            education: updatedEducations
        }));
    }

    const addEducation = () => {
        setCandidateResumeDetail(prev => ({
            ...prev,
            education: [...prev.education, { eduSchool: "", eduDegree: "", eduYear: "" }]
        }));
    };

    const handleRemoveEducation = (index) => {
        if (candidateResumeDetail.education.length > 1) {
            const updatedEducation = candidateResumeDetail.education.filter((_, i) => i !== index);
            setCandidateResumeDetail((prev) => ({
                ...prev,
                education: updatedEducation
            }));
        }
    };

    //skills section

    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission
            const newSkill = e.target.value.trim();

            if (newSkill) {
                const updatedSkills = candidateResumeDetail.skills.map((exp, i) =>
                    i === index ? { ...exp, skill: newSkill } : exp
                );

                setCandidateResumeDetail(prev => ({
                    ...prev,
                    skills: updatedSkills
                }));

                // Add new empty skill input field after pressing Enter
                addSkills();
            }
        }
    };


    const handleSkillChange = (index, e) => {
        debugger
        const updatedSkills = candidateResumeDetail.skills.map((exp, i) =>
            i === index ? { ...exp, [e.target.name]: e.target.value } : exp
        );
        setCandidateResumeDetail(prev => ({
            ...prev,
            skills: updatedSkills
        }));
    }

    const addSkills = () => {
        setCandidateResumeDetail(prev => ({
            ...prev,
            skills: [...prev.skills, { skill: "" }]
        }));
    };

    const handleRemoveSkills = (index) => {
        if (candidateResumeDetail.skills.length > 1) {
            const updatedSkills = candidateResumeDetail.skills.filter((_, i) => i !== index);
            setCandidateResumeDetail((prev) => ({
                ...prev,
                skills: updatedSkills
            }));
        }
    };


    //custom section

    const handleCustomChange = (index, e) => {
        const updatedCustom = candidateResumeDetail.custom.map((exp, i) =>
            i === index ? { ...exp, [e.target.name]: e.target.value } : exp
        );
        setCandidateResumeDetail(prev => ({
            ...prev,
            custom: updatedCustom
        }));
    }

    const addCustom = () => {
        setCandidateResumeDetail(prev => ({
            ...prev,
            custom: [...prev.custom, { customTitle: "", customDetail: "" }]
        }));
    };


    const handleRemoveCustom = (index) => {
        const updatedCustom = candidateResumeDetail.custom.filter((_, i) => i !== index);
        setCandidateResumeDetail((prev) => ({
            ...prev,
            custom: updatedCustom
        }));

    };

    //conver image into base 64
    const handleProfileChnage = async (e) => {
        debugger;
        const imageSizeMB = e.size / 1024 / 1024;

        if (imageSizeMB > MAX_IMAGE_SIZE_MB) {
            notify(`Image size exceeds 600 KB`);
            setImage(null); // Reset the image if it exceeds the size limit
        } else {
            let imageBase64 = await blobToBase64DataURL(e);
            setCandidateResumeDetail((prev) => ({
                ...prev,
                profileImg: imageBase64
            }));
            notify('Image Uploaded Sucessfully ');

        }



    }

    //to see resume in right side container
    const renderResumePreview = (templateId) => {
        const htmlTemplate = TryTemplate.renderResumeTemplate(templateId, candidateResumeDetail);
        return (
            <>
                <div
                    className="resume-preview-container"
                    style={{
                        // width: "800px",  // Set your desired width
                        // height: "842px", // Set your desired height
                        // overflow: "auto", // Enable scrolling if content exceeds the container size
                        // border: "1px solid #ccc", // Optional: Add a border for better visibility
                        // margin: "0 auto"
                        boxShadow: "none"
                    }}
                >
                    <div
                        className="resume-preview"
                        dangerouslySetInnerHTML={{ __html: htmlTemplate }}
                        id="resumeContent"
                    />
                </div>
                <div className="d-flex justify-content-center  mt-3" style={{ gap: "20px" }}>
                    <button onClick={handleOpenModal} className="btn btn-primary">Preview</button>
                    <button onClick={handleDownload} className="btn btn-primary">Download</button>
                </div>
            </>
        );
    };

    const handleTemplateClick = (id) => {
        setTemplateId(id)
    }

    const applySettings = () => {
        const fontStyle = document?.getElementById('fontStyle')?.value;
        const fontWidth = document?.getElementById('fontWidth')?.value;
        const fontColor = document?.getElementById('fontColor')?.value;
        const pageMargin = document?.getElementById('pageMargin')?.value;
        const sectionMargin = document?.getElementById('sectionMargin')?.value;

        // Apply these settings to your resume preview or template
        // Example:
        document.querySelector('.resume-preview').style.fontFamily = fontStyle;
        document.querySelector('.resume-preview').style.fontWeight = fontWidth;
        document.querySelector('.resume-preview').style.color = fontColor;
        document.querySelector('.resume-preview').style.margin = `${pageMargin}px`;
        document.querySelectorAll('.resume-preview .resume-section').forEach(section => {
            section.style.setProperty('margin-bottom', `${sectionMargin}px`, 'important');
        });

    };

    const handleEditorChange = (index, newEditorState) => {
        const contentState = newEditorState.getCurrentContent();
        const htmlContent = stateToHTML(contentState);

        const updatedCustom = candidateResumeDetail.custom.map((section, i) =>
            i === index ? { ...section, customDetail: htmlContent, editorState: newEditorState } : section
        );

        setCandidateResumeDetail(prev => ({
            ...prev,
            custom: updatedCustom
        }));
    };

    // //hide chatbot for this page
    // useEffect(() => {
    //     setTimeout(() => {
    //         let id = document.getElementById("HuntBotButton")
    //         console.log("🚀 ~ useEffect ~ id:", id)
    //         if (id) {
    //             id.style = "display : none"
    //         }
    //     }, 2000)
    // }, [])



    // Message for mobile
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);

                // Show notification only once
                if (!hasShownNotification) {
                    notify("For the best experience and functionalities, please access this application on a desktop device.");
                    setHasShownNotification(true); // Set flag to prevent showing it again
                }
            } else {
                setIsMobile(false);
                setHasShownNotification(false); // Reset flag when switching to desktop
            }
        };

        // Initial check
        checkMobile();

        // Add event listener to detect screen size changes
        window.addEventListener('resize', checkMobile);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', checkMobile);
    }, [hasShownNotification]);



    // Fetch position list from API
    const initCurrentPositionList = async () => {
        try {
            const pos = await CandidateRegService.get_FAS_DropdownList();
            if (pos.isSuccess) {
                const d = JSON.parse(pos.data);
                setPositionOptions(d.map(p => ({ value: p.value, label: p.label })));
            }
        } catch (error) {
            console.error("Error fetching position list:", error);
        }
    };


    // Fetch positions on component mount
    useEffect(() => {
        initCurrentPositionList();
    }, []);

    //for own submit
    return (
        <>
            <Helmet>
                <title>HuntsJob - Resume Builder - Craft a Resume That Stands Out</title>
                <meta name="description" content="HuntsJob - Resume Builder - Craft a Resume That Stands Out - Create a standout resume in minutes with Huntsjob. Our resume builder offers job-specific templates, examples, and expert tips to help you land your dream job." />
            </Helmet>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <NewLoader />
            </Backdrop>
            <Layout>
                <div className="container-fluid mt-4 mb-4">
                    <div className="row">
                        {/* Left Sidebar - Hidden on screens smaller than 'md' (medium) */}
                        <div className="col-2 sidebar d-none d-md-block" >
                            <h3 className="mt-4">Resume Builder</h3>
                            <div className="stepper-container">
                                {steps.map((step) => (
                                    <div
                                        key={step.number}
                                        className={`step ${currentStep === step.number ? 'active' : ''} ${completedSteps.includes(step.number) ? 'completed' : ''}`}
                                        onClick={() => handleStepClick(step.number)}
                                    >
                                        <div className="circle">
                                            {completedSteps.includes(step.number) ? <i className='bx bx-check'></i> : step.number}
                                        </div>
                                        <span>{step.label}</span>
                                        {step.number < steps.length && <div className="line"></div>}
                                    </div>
                                ))}
                            </div>

                            {/* Custom Settings Section */}
                            {
                                currentStep === 7 && (
                                    <>

                                        <hr className="my-1" />
                                        <div className="settings-section">
                                            <h4 className="text-center">Custom Settings</h4>

                                            <div className="form-group mt-3">
                                                <label htmlFor="fontStyle">Font Style</label>
                                                <select className="form-control" id="fontStyle">
                                                    <option>Arial</option>
                                                    <option>Times New Roman</option>
                                                    <option>Helvetica</option>
                                                    <option>Georgia</option>
                                                </select>
                                            </div>

                                            <div className="form-group mt-3">
                                                <label htmlFor="fontWidth">Font Width</label>
                                                <select className="form-control" id="fontWidth">
                                                    <option>Normal</option>
                                                    <option>Bold</option>
                                                    <option>Light</option>
                                                </select>
                                            </div>

                                            <div className="form-group mt-3">
                                                <label htmlFor="fontColor">Font Color</label>
                                                <input type="color" className="form-control" id="fontColor" />
                                            </div>

                                            <div className="form-group mt-3">
                                                <label htmlFor="pageMargin">Page Margin</label>
                                                <input type="number" className="form-control" id="pageMargin" placeholder="Enter margin in mm" />
                                            </div>

                                            <div className="form-group mt-3">
                                                <label htmlFor="sectionMargin">Section Margin</label>
                                                <input type="number" className="form-control" id="sectionMargin" placeholder="Enter margin in mm" />
                                            </div>

                                            <div className="d-flex justify-content-center mt-4">
                                                <button className="btn btn-primary" onClick={applySettings}>Apply Settings</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        {/* Main Content Area */}
                        <div className="col-md-7 col-sm-12 main-content" >
                            {/* Stepper Container - Only visible on mobile */}
                            {/* <div className="stepper-container d-md-none d-flex" style={{ padding: '10px 0', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                {steps.map((step) => (
                                    <div
                                        key={step.number}
                                        className={`step ${currentStep === step.number ? 'active' : ''} ${completedSteps.includes(step.number) ? 'completed' : ''}`}
                                        onClick={() => handleStepClick(step.number)}
                                        style={{ color:"black",textAlign: 'center' }}
                                    >
                                        <div className="circle" style={{ marginBottom: '5px' }}>
                                            {completedSteps.includes(step.number) ? <i className='bx bx-check'></i> : step.number}
                                        </div>
                                        <span>{step.label}</span>
                                    </div>

                                ))}
                            </div> */}
                            <div className="stepper-container d-md-none" >
                                {steps.map((step) => (
                                    <div
                                        key={step.number}
                                        className={`step ${currentStep === step.number ? 'active' : ''} ${completedSteps.includes(step.number) ? 'completed' : ''}`}
                                        onClick={() => handleStepClick(step.number)}
                                    >
                                        <div className="circle">
                                            {completedSteps.includes(step.number) ? <i className='bx bx-check'></i> : step.number}
                                        </div>
                                        <span style={{ fontSize: "12px" }}>{step.label}</span>
                                        {step.number < steps.length}
                                    </div>
                                ))}
                            </div>
                            {currentStep === 1 && (
                                <div>
                                    {/* <div style={{ maxWidth: '20px', maxHeight: '250px',marginBottom:"0px" }}>
                                        <ImagePickerEditor
                                            image={image}
                                            onImageChange={handleImageChange}
                                            config={{
                                                borderRadius: '8px',     // Optional: Rounds the corners of the cropper
                                                aspectRatio: 1,          // Square aspect ratio
                                                compressInitial: null,   // No initial compression
                                            }}
                                        />
                                    </div> */}

                                    <h4 className="mt-4">Basic Details</h4>
                                    <form className="mt-4">
                                        <div className="form-group">
                                            <label htmlFor="name">Profile Pic</label>
                                            {/* <input type="file" className="form-control" id="profileImg" placeholder="Choose File" onChange={handleProfileChnage} /> */}
                                            <FileUploader handleChange={handleProfileChnage} name="file" types={fileTypes} />
                                            {errors.profileImg && <div className="error-message">{errors.profileImg}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter your name" value={candidateResumeDetail.name} onChange={handleChange} />
                                            {errors.name && <div className="error-message">{errors.name}</div>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Enter your email" value={candidateResumeDetail.email} onChange={handleChange} />
                                            {errors.email && <div className="error-message">{errors.email}</div>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input type="text" className="form-control" id="phoneNumber" placeholder="Enter your phone number" value={candidateResumeDetail.phoneNumber} onChange={handleChange} />
                                            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" className="form-control" id="address" placeholder="Enter your address" value={candidateResumeDetail.address} onChange={handleChange} />
                                            {errors.address && <div className="error-message">{errors.address}</div>}
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="jobTitle">Job Title</label>
                                            <input type="text" className="form-control" id="jobTitle" placeholder="Enter your job title" value={candidateResumeDetail.jobTitle} onChange={handleChange} />
                                            {errors.jobTitle && <div className="error-message">{errors.jobTitle}</div>}
                                        </div> */}
                                        <div className="form-group">
                                            <label htmlFor="jobTitle">Job Title</label>
                                            {/* <div>
                                                <Creatable
                                                    id="jobTitle"
                                                    options={[...positionOptions, { value: candidateResumeDetail.jobTitle, label: candidateResumeDetail.jobTitle }]}
                                                    value={isCustom ? null : positionOptions.find(option => option.label === jobTitle)}
                                                    onChange={(e) => setCandidateResumeDetail(prev => ({
                                                        ...prev,
                                                        ["jobTitle"]: e.label,
                                                    }))
                                                    }
                                                    placeholder="Select Job Title"
                                                />
                                                {isCustom && (
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        placeholder="Enter your job title"
                                                        value={jobTitle}
                                                        onChange={(e) => setJobTitle(e.target.value)}
                                                    />
                                                )}
                                            </div> */}
                                            <SearchInput
                                                options={options}
                                                setOptions={setOptions}
                                                selectedOptions={selectedOptions}
                                                setSelectedOptions={setSelectedOptions}
                                                setCandidateResumeDetail={setCandidateResumeDetail}
                                            />
                                            {errors.jobTitle && <div className="error-message">{errors.jobTitle}</div>}
                                        </div>

                                        <div style={{ gap: "10px" }} className='d-flex justify-content-end'>
                                            <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                                                Preview
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={() => handleNextClick(1)}>
                                                <i class='bx bx-chevron-right'></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* experience section  */}
                            {currentStep === 2 && (
                                <div>
                                    <h4 className="mt-4">Experience</h4>
                                    <form className="mt-4">
                                        {
                                            candidateResumeDetail.experiences.map((experience, index) => (
                                                <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
                                                    <div key={index}>
                                                        <div className="form-group mt-3">
                                                            <label htmlFor={`expJobTitle${index}`}>Job Title </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="expJobTitle"
                                                                id={`expJobTitle${index}`}
                                                                placeholder="Enter company name"
                                                                value={experience.expJobTitle}
                                                                onChange={(e) => handleExperienceChange(index, e)}
                                                            />

                                                            {errors[`experience_${index}_expJobTitle`] && (
                                                                <div className="error-message">{errors[`experience_${index}_expJobTitle`]}</div>
                                                            )}
                                                        </div>
                                                        <div className="form-group mt-3">
                                                            <label htmlFor={`companyName${index}`}>Company Name </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="companyName"
                                                                id={`companyName${index}`}
                                                                placeholder="Enter company name"
                                                                value={experience.companyName}
                                                                onChange={(e) => handleExperienceChange(index, e)}
                                                            />
                                                            {errors[`experience_${index}_companyName`] && (
                                                                <div className="error-message">{errors[`experience_${index}_companyName`]}</div>
                                                            )}
                                                        </div>
                                                        <div className="form-group mt-3">
                                                            <label htmlFor={`experienceDetail${index}`}>Experience Detail </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="experienceDetail"
                                                                id={`experienceDetail${index}`}
                                                                placeholder="Enter Experience Detail"
                                                                value={experience.experienceDetail}
                                                                onChange={(e) => handleExperienceChange(index, e)}
                                                            />
                                                            {errors[`experience_${index}_experienceDetail`] && (
                                                                <div className="error-message">{errors[`experience_${index}_experienceDetail`]}</div>
                                                            )}
                                                        </div>
                                                        <div className="form-group mt-3">
                                                            <label htmlFor={`experienceDetail${index}`}>Experience Duration </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="expduration"
                                                                id={`expduration${index}`}
                                                                placeholder="Enter Experience Detail"
                                                                value={experience.expduration}
                                                                onChange={(e) => handleExperienceChange(index, e)}
                                                            />
                                                            {errors[`experience_${index}_expduration`] && (
                                                                <div className="error-message">{errors[`experience_${index}_expduration`]}</div>
                                                            )}
                                                        </div>
                                                        <div className="d-flex justify-content-end">
                                                            {candidateResumeDetail.experiences.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger mt-3"
                                                                    onClick={() => handleRemoveExperience(index)}
                                                                >
                                                                    Remove Experience
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <button type="button" className="btn btn-outline-primary" onClick={addExperience}>
                                                + Add
                                            </button>
                                            <div className='d-flex' style={{ gap: "10px" }}>
                                                <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                                                    Preview
                                                </button>
                                                <button type="button" className="btn btn-primary" onClick={() => handlePreviousClick(2)}>
                                                    <i class='bx bx-chevron-left'></i>
                                                </button>
                                                <button type="button" className="btn btn-primary" onClick={() => handleNextClick(2)}>
                                                    <i class='bx bx-chevron-right'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            )}

                            {/* education section  */}
                            {currentStep === 3 && (
                                <div>
                                    <h4 className="mt-4">Education</h4>
                                    <form className="mt-4">
                                        {
                                            candidateResumeDetail.education.map((education, index) => (

                                                <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
                                                    <div key={index}>
                                                        <div className="form-group mt-3">
                                                            <label htmlFor={`eduSchool${index}`}>Schools/University</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="eduSchool"
                                                                id={`eduSchool${index}`}
                                                                placeholder="Enter your school/university"
                                                                value={education.eduSchool}
                                                                onChange={(e) => handleEducationChange(index, e)}
                                                            />

                                                            {errors[`education_${index}_eduSchool`] && (
                                                                <div className="error-message">{errors[`education_${index}_eduSchool`]}</div>
                                                            )}
                                                        </div>

                                                        <div className="form-group mt-3">
                                                            <label htmlFor="eduDegree">Degree</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="eduDegree"
                                                                id={`eduDegree${index}`}
                                                                placeholder="Enter your degree"
                                                                value={education.eduDegree}
                                                                onChange={(e) => handleEducationChange(index, e)}
                                                            />
                                                            {errors[`education_${index}_eduDegree`] && (
                                                                <div className="error-message">{errors[`education_${index}_eduDegree`]}</div>
                                                            )}
                                                        </div>

                                                        <div className="form-group mt-3">
                                                            <label htmlFor="eduYear">Year of Graduation</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="eduYear"
                                                                id={`eduYear${index}`}
                                                                placeholder="Enter your graduation year"
                                                                value={education.eduYear}
                                                                onChange={(e) => handleEducationChange(index, e)}
                                                            />
                                                            {errors[`education_${index}_eduYear`] && (
                                                                <div className="error-message">{errors[`education_${index}_eduYear`]}</div>
                                                            )}
                                                        </div>

                                                        <div className="d-flex justify-content-end">
                                                            {candidateResumeDetail.education.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger mt-3"
                                                                    onClick={() => handleRemoveEducation(index)}
                                                                >
                                                                    Remove Experience
                                                                </button>
                                                            )}
                                                        </div>

                                                    </div>

                                                </div>
                                            ))
                                        }
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <button type="button" className="btn btn-outline-primary" onClick={addEducation}>
                                                + Add
                                            </button>
                                            <div style={{ gap: "10px" }} className='d-flex justify-content-end'>
                                                <button type="button" className="btn btn-primary " onClick={handleOpenModal}>
                                                    Preview
                                                </button>
                                                <button type="button" className="btn btn-primary " onClick={() => handlePreviousClick(3)}>
                                                    <i class='bx bx-chevron-left'></i>
                                                </button>
                                                <button type="button" className="btn btn-primary " onClick={() => handleNextClick(3)}>
                                                    <i class='bx bx-chevron-right'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* skill section  */}
                            {
                                currentStep === 4 && (
                                    <div>
                                        <h4 className="mt-4">Skills</h4>
                                        <form className="mt-4" onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
                                            {

                                                candidateResumeDetail.skills.map((allSkillS, index) => (
                                                    <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
                                                        <div key={index}>
                                                            <div className="form-group">
                                                                <label htmlFor="skill">Add Skills</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name='skill'
                                                                    id="skill"
                                                                    placeholder="Enter skills seprated by commas will come in one line"
                                                                    value={allSkillS.skill}
                                                                    onKeyDown={(e) => handleKeyPress(e, index)}
                                                                    onChange={(e) => handleSkillChange(index, e)}

                                                                />
                                                                {errors[`skills_${index}_skill`] && (
                                                                    <div className="error-message">{errors[`skills_${index}_skill`]}</div>

                                                                )}
                                                            </div>

                                                            <div className="d-flex justify-content-end">
                                                                {candidateResumeDetail.skills.length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger mt-3"
                                                                        onClick={() => handleRemoveSkills(index)}
                                                                    >
                                                                        Remove Skills
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))


                                            }
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <button type="button" className="btn btn-outline-primary" onClick={addSkills}>
                                                    + Add
                                                </button>
                                                <div style={{ gap: "10px" }} className='d-flex justify-content-end'>
                                                    <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                                                        Preview
                                                    </button>
                                                    <button type="button" className="btn btn-primary" onClick={() => handlePreviousClick(4)}>
                                                        <i class='bx bx-chevron-left'></i>
                                                    </button>
                                                    <button type="button" className="btn btn-primary" onClick={() => handleNextClick(4)}>
                                                        <i class='bx bx-chevron-right'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }

                            {/* summary section  */}
                            {currentStep === 5 && (
                                <div>
                                    <h4 className="mt-4">Summary</h4>
                                    <form className="mt-4">
                                        <div className="form-group">
                                            <label htmlFor="summary">Summary</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="summary"
                                                name="summary"
                                                placeholder="Enter your Job Summary.."
                                                value={candidateResumeDetail.summary}
                                                onChange={handleChange}
                                                rows={10}
                                            ></textarea>
                                            {errors.summary && <div className="error-message">{errors.summary}</div>}
                                        </div>
                                        <div style={{ gap: "10px" }} className='d-flex justify-content-end'>
                                            <button type="button" className="btn btn-primary " onClick={handleOpenModal}>
                                                Preview
                                            </button>
                                            <button type="button" className="btn btn-primary " onClick={() => handlePreviousClick(5)}>
                                                <i class='bx bx-chevron-left'></i>
                                            </button>
                                            <button type="button" className="btn btn-primary " onClick={() => handleNextClick(5)}>
                                                <i class='bx bx-chevron-right'></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* custom section  */}
                            {currentStep === 6 && (
                                <div>
                                    <h4 className="mt-4">Custom Section</h4>
                                    <form className="mt-4">
                                        {
                                            candidateResumeDetail?.custom?.map((current, index) => (
                                                <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
                                                    <div key={index}>
                                                        <div className="form-group mt-3">
                                                            <label htmlFor="customTitle">Custom Title</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="customTitle"
                                                                name='customTitle'
                                                                placeholder="Enter your custom title (e.g., Certifications)"
                                                                value={current?.customTitle}
                                                                onChange={(e) => handleCustomChange(index, e)}
                                                            />
                                                            {errors[`custom_${index}_customTitle`] && (
                                                                <div className="error-message">{errors[`custom_${index}_customTitle`]}</div>

                                                            )}
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="customDetail">Custom Details</label>
                                                            {/* <textarea
                                                            className="form-control"
                                                            id="customDetail"
                                                            name='customDetail'
                                                            placeholder="Enter details"
                                                            value={current?.customDetail}
                                                            onChange={(e) => handleCustomChange(index, e)}
                                                        /> */}

                                                            <Editor
                                                                editorState={current.editorState}
                                                                toolbarClassName="toolbarClassName"
                                                                wrapperClassName="wrapperClassName"
                                                                editorClassName="editorClassName"
                                                                onEditorStateChange={(newEditorState) => handleEditorChange(index, newEditorState)}
                                                                toolbar={{
                                                                    options: ["inline", "list", "link"],
                                                                    inline: {
                                                                        inDropdown: false,
                                                                        options: ['bold', 'italic', 'underline'],
                                                                    },
                                                                    list: {
                                                                        inDropdown: false,
                                                                        options: ['unordered', 'ordered']
                                                                    },
                                                                }}
                                                            />

                                                        </div>

                                                        <div className="d-flex justify-content-end">

                                                            <button
                                                                type="button"
                                                                className="btn btn-danger mt-3"
                                                                onClick={() => handleRemoveCustom(index)}
                                                            >
                                                                Remove Custom
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <button type="button" className="btn btn-outline-primary" onClick={addCustom}>
                                                + Add
                                            </button>
                                            <div style={{ gap: "10px" }} className='d-flex justify-content-end'>
                                                <button type="button" className="btn btn-primary " onClick={handleOpenModal}>
                                                    Preview
                                                </button>
                                                <button type="button" className="btn btn-primary " onClick={() => handlePreviousClick(6)}>
                                                    <i class='bx bx-chevron-left'></i>
                                                </button>
                                                <button type="button" className="btn btn-primary " onClick={() => setCurrentStep(7)}>
                                                    <i class='bx bx-chevron-right'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            )}


                            {currentStep === 7 && (
                                <>
                                    {

                                        renderResumePreview(templateId)

                                    }
                                    {/* resume templates in middle section  */}
                                    <div className='border-2 d-block d-md-none' style={{ height: "80vh", overflowY: "scroll", overflowX: "hidden", padding: "5px", border: "1px solid #c1c0c5", marginTop: "10px" }}>
                                        <div className='resume-template-header' style={{ backgroundColor: "#343A40", color: "white", padding: "6px", marginBottom: "5px", fontSize: "18px" }}>
                                            RESUME DESIGNS
                                        </div>

                                        <div className="row  g-3" style={{ padding: "10px" }}>
                                            {/* Template Row 1 */}
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(1)}>
                                                    <img src={img1} className="img-fluid h-100 w-100 " alt="Template 2" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(2)}>
                                                    <img src={img2} className="img-fluid h-100 w-100 " alt="Template 2" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(3)}>
                                                    <img src={img3} className="img-fluid h-100 w-100 " alt="Template 3" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(4)}>
                                                    <img src={img4} className="img-fluid h-100 w-100 " alt="Template 3" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(5)}>
                                                    <img src={img5} className="img-fluid h-100 w-100 " alt="Template 3" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(6)}>
                                                    <img src={img6} className="img-fluid h-100 w-100 " alt="Template 1" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            )}

                        </div>

                        {/* Right Preview to select templates - Hidden on screens smaller than 'md' (medium) */}
                        <div className="col-3 d-none d-md-block" >

                            {
                                currentStep == 7 ?
                                    <div className='border-2' style={{ height: "80vh", overflowY: "scroll", overflowX: "hidden", padding: "5px", border: "1px solid #c1c0c5" }}>
                                        <div className='resume-template-header' style={{ backgroundColor: "#343A40", color: "white", padding: "6px", marginBottom: "5px", fontSize: "18px" }}>
                                            RESUME DESIGNS
                                        </div>

                                        <div className="row  g-3" style={{ padding: "10px" }}>
                                            {/* Template Row 1 */}
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(1)}>
                                                    <img src={img1} className="img-fluid h-100 w-100 " alt="Template 2" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(2)}>
                                                    <img src={img2} className="img-fluid h-100 w-100 " alt="Template 2" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(3)}>
                                                    <img src={img3} className="img-fluid h-100 w-100 " alt="Template 3" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(4)}>
                                                    <img src={img4} className="img-fluid h-100 w-100 " alt="Template 3" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(5)}>
                                                    <img src={img5} className="img-fluid h-100 w-100 " alt="Template 3" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="resume-card card " style={{ height: "250px", cursor: "pointer", overflow: "hidden" }} onClick={() => handleTemplateClick(6)}>
                                                    <img src={img6} className="img-fluid h-100 w-100 " alt="Template 1" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    renderResumePreview()
                            }

                            {/* Modal for Full Preview */}
                            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title>Resume Preview</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div dangerouslySetInnerHTML={{ __html: document.getElementById('resumeContent')?.innerHTML }} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                                    {
                                        currentStep == 7 ?
                                            <Button variant="primary" onClick={handleDownload}>Download</Button>
                                            :
                                            null
                                    }
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </Layout>
        </>

    );
};

export default ResumeBuilder;
