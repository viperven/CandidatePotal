import React, { useState,useEffect } from 'react'
import Layout from '../../Layout/Layout';
import blog from '../../assets/imgs/Blog/job-search-concept-find-your-career-online-website.jpg';
import blog01 from '../../assets/imgs/Blog/human-resources-concept-with-hand.jpg';
import blog02 from '../../assets/imgs/Blog/businessman-touching-red-icon-connected.jpg';
import blog03 from '../../assets/imgs/Blog/business-people-casual-meeting.jpg';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, CardMedia, Divider, Grid } from '@mui/material';

const truncateText = (text, limit) => {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }
    return text;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Blogs2() {
    const [showAllPosts, setShowAllPosts] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleClickOpen3 = () => {
        setOpen3(true);
    };
    const handleClose3 = () => {
        setOpen3(false);
    };
    const handleAllPosts = () => {
        setShowAllPosts(true);
    };
    const text1 = "In today's highly competitive job market, finding your dream job can often seem like an insurmountable challenge. The process of sifting through countless job listings and crafting the perfect resume and cover letter can be overwhelming. However, fear not, because Huntsjob is here to simplify your job search journey. In this comprehensive guide, we'll delve into how you can harness the power of Huntsjob's resources to discover your ideal career opportunity. Let's embark on this exciting journey together";
    const text2 = "Embark on a journey to understand the nuances of global recruitment resonance with our insightful blogs. Dive into the intricacies of hiring with Global Recruitment Resonance: Striking the Right Chords in Hiring for huntsjob.";
    const text3 = "In the ever-evolving landscape of employment, the quest for top-tier talent has transcended geographical boundaries. Employers are no longer confined by borders; instead, they are venturing into the realm of global talent acquisition, seeking the best candidates worldwide. This paradigm shift is evident in the concept of Beyond Borders: Connecting Employers with Top Global Talent, a phenomenon that has reshaped the dynamics of recruitment and redefined the traditional approach to hiring."
    const text4 = "In the intricate dance between dreams and careers, the role of global recruitment cannot be overstated. The fusion of aspirations and professional paths on a global stage has given rise to success stories that transcend borders. Join us on a journey of inspiration and discovery as we delve into Connecting Dreams and Careers: Our Global Recruitment Success Stories."
    useEffect(() => {
        document.title = 'HuntsJob - Blogs';
    }, []);

    return (
        <>
            <Layout>
                <section className="bg-white section-about">
                    <div className="container">
                        <div className='blogs-heading'>
                            <span className='highlighted-text'>HuntsJob</span>: Connecting Ambitions With Global Destinations
                        </div>

                        <div className="container">
                            {!showAllPosts ? (
                                <div className='ViewPosts mb-3' onClick={handleAllPosts}>View All Posts</div>
                            ) : null}
                            <div className="row">
                                <div className="col-md-4">
                                    <div >
                                        <img
                                            src={blog}
                                            alt="Image 1"
                                            className="fixed-size"
                                            style={{ width: '100%', height: '294px', borderRadius: '15px', cursor: "pointer" }}
                                            id='blogdiv' onClick={handleClickOpen}
                                        />
                                        <h1 style={{
                                            color: "black", fontFamily: "Nunito Sans",
                                            fontSize: "37px",
                                            fontWeight: "600",
                                            marginTop: "10px"
                                        }}>
                                            Find Your Dream Job On Huntsjob: <span className='highlighted-text'>Ultimate Guide</span>
                                        </h1>
                                    </div>
                                    <h2 style={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "16px", fontWeight: "600" }}>
                                        {truncateText(text1, 200)}
                                    </h2>
                                </div>

                                <BootstrapDialog
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                    maxWidth="lg"
                                >
                                    {/* <DialogContent dividers> */}
                                    <Box sx={{ position: 'relative', width: "100%", borderRadius: "30px" }}>
                                        <CardMedia
                                            component="img"
                                            image={blog}
                                            alt="Paella dish"
                                            sx={{
                                                maxHeight: "500px",
                                                // borderRadius: "15px",
                                                width: '100%'
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 16,
                                                left: 16,
                                                color: 'white',
                                                fontSize: 'clamp(2rem, 4vw, 4rem)',
                                                fontWeight: "600",
                                                lineHeight: "normal",
                                                fontFamily: "Nunito Sans",
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                // background: 'linear-gradient(to right, #000, #808080)',
                                                background: "rgba( 255, 255, 255, 0.15 )",
                                                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                                                backdropFilter: "blur( 1px )",
                                                webkitbackdropfilter: "blur( 1px )"
                                            }}
                                        >
                                            Find Your Dream Job On Huntsjob: <span className='highlighted-text'>Ultimate Guide</span>
                                        </Typography>
                                    </Box>


                                    <Typography gutterBottom sx={{ fontSize: "26px", fontWeight: "500", color: "#000", marginTop: "5px", padding: "20px" }}>
                                        In today's highly competitive job market, finding your dream job can often seem like an insurmountable challenge. The process of sifting through countless job listings and crafting the perfect resume and cover letter can be overwhelming. However, fear not, because Huntsjob is here to simplify your job search journey. In this comprehensive guide, we'll delve into how you can harness the power of Huntsjob's resources to discover your ideal career opportunity. Let's embark on this exciting journey together.
                                    </Typography>

                                    <Grid container spacing={2} sx={{ marginTop: 2, padding: "20px" }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>1. Leading Job Site</Typography>
                                                <Divider />
                                                When it comes to job hunting, the last thing you want is to bounce from one website to another, creating new accounts and uploading your resume repeatedly. At Huntsjob, we're proud to be a leading job site that offers a diverse array of job prospects tailored to your profile. Our platform simplifies the process by providing you with a one-stop-shop for all your job-seeking needs.                    </Typography>

                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>3. Apply According to Your Criteria</Typography>
                                                <Divider />
                                                Huntsjob empowers you to browse and filter job positions based on specific metrics such as job title, skills, certifications, benefits, location, and more. This tailored approach ensures that you only apply to openings that align with your expertise, saving you valuable time and increasing your chances of securing a competitive salary that matches your skills.
                                            </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>5. Hunts Assessments</Typography>
                                                <Divider />
                                                One of the standout features of Huntsjob is our assessments. These assessments are meticulously designed to evaluate candidates' capabilities in various areas, including typing, spelling and grammar, proofreading, social media, search engine optimization, reliability, supervisory skills, and more. You have the option to showcase your assessment results on your profile, allowing employers to quickly recognize your strengths and qualifications. This transparency is crucial, as it helps recruiters assess your skills, stability, and abilities more accurately.
                                            </Typography>

                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>7. Additional Resources</Typography>
                                                <Divider />
                                                In addition to the above features, Huntsjob offers a wealth of additional resources to help you in your quest to find your dream job. Our Suggestion Center, Hiring Lab, Career Advice, and more are designed to assist both job seekers and employers in achieving their goals.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>2. Effortless Resume and Cover Letter Management</Typography>
                                                <Divider />
                                                After meticulously crafting your curriculum vitae and cover letter, you can effortlessly upload them to your Huntsjob account. This feature enables you to apply to multiple job opportunities with just a single click. Moreover, our user-friendly platform allows you to make updates to your resume whenever necessary, ensuring that your application materials are always up-to-date and tailored to each opportunity.
                                            </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>4. Access to Company Reviews</Typography>
                                                <Divider />
                                                Our platform provides you with valuable insights into potential employers through authentic company reviews from current or former employees. This information is invaluable for understanding the working environment, company culture, and overall satisfaction of those who have worked there. Making informed decisions about your potential workplace has never been easier.
                                            </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>6. Streamlined Communication</Typography>
                                                <Divider />
                                                Huntsjob streamlines the communication process between job seekers and employers. All your interactions with potential employers happen through our platform's messaging service. Additionally, you can opt for phone interviews, which are conveniently recorded by our automated system. This feature provides you with the flexibility to re-record your responses in case of any slip-ups, ensuring that you present your best self to prospective employers.
                                            </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>Conclusion</Typography>
                                                <Divider />
                                                Every job applicant should take advantage of the valuable resources Huntsjob offers. These tools will not only boost your confidence during interviews but also help you make informed decisions about your career. Visit our homepage today to explore the latest job openings. We are committed to offering competitive compensation packages and a range of benefits. If you're in the field of Human Resources and eager to chart the right course for your career, consider joining our team.
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    {/* </DialogContent> */}

                                </BootstrapDialog>


                                <div className="col-md-4">
                                    <div >
                                        <img src={blog01} alt="Image 2" className="fixed-size" style={{ width: '100%', height: '294px', borderRadius: '15px', cursor: "pointer" }} id='blogdiv' onClick={handleClickOpen1} />
                                        <h1 style={{
                                            color: "black", fontFamily: "Nunito Sans",
                                            fontSize: "37px",
                                            fontWeight: "600",
                                            marginTop: "10px"
                                        }}>
                                            Global Recruitment Resonance: <span className='highlighted-text'>Striking the Right Chords in Hiring</span>
                                        </h1>
                                    </div>
                                    <h2 style={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "16px", fontWeight: "600" }}>
                                        {truncateText(text2, 200)}
                                    </h2>
                                </div>

                                <BootstrapDialog
                                    onClose={handleClose1}
                                    aria-labelledby="customized-dialog-title"
                                    open={open1}
                                    maxWidth="lg"
                                >

                                    <Box sx={{ position: 'relative', width: "100%", borderRadius: "30px" }}>
                                        <CardMedia
                                            component="img"
                                            image={blog01}
                                            alt="Paella dish"
                                            sx={{
                                                maxHeight: "500px",
                                                // borderRadius: "15px",
                                                width: '100%'
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 16,
                                                // left: 16,
                                                color: 'white',
                                                fontSize: 'clamp(2rem, 4vw, 4rem)',
                                                fontWeight: "600",
                                                lineHeight: "normal",
                                                fontFamily: "Nunito Sans",
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                // background: 'linear-gradient(to right, #000, #808080)'
                                                background: "rgba( 255, 255, 255, 0.15 )",
                                                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                                                backdropFilter: "blur( 1px )",
                                                webkitbackdropfilter: "blur( 1px )"

                                            }}
                                        >
                                            Global Recruitment Resonance: <span className='highlighted-text'>Striking the Right Chords in Hiring</span>
                                        </Typography>
                                    </Box>


                                    <Typography gutterBottom sx={{ fontSize: "26px", fontWeight: "500", color: "#000", marginTop: "5px", padding: "20px" }}>
                                        Embark on a journey to understand the nuances of global recruitment resonance with our insightful blogs. Dive into the intricacies of hiring with Global Recruitment Resonance: Striking the Right Chords in Hiring for huntsjob.
                                    </Typography>



                                    <Grid container spacing={2} sx={{ marginTop: 2, padding: "20px" }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>1. Harmonizing Talent Acquisition Strategies</Typography>
                                                <Divider />
                                                Crafting a symphony of talent acquisition strategies is crucial for success in global recruitment. From leveraging digital platforms to embracing diversity, discover how to create a harmonious blend that attracts top-tier candidates.
                                            </Typography>

                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>3. Rhythmic Screening Processes</Typography>
                                                <Divider />
                                                Dive into the rhythm of effective screening processes. Uncover the beats of resume evaluation, interviews, and skill assessments that create a seamless and efficient hiring melody.
                                            </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>5. Instrumental Employer Branding</Typography>
                                                <Divider />
                                                Your employer brand is the instrument that sets the tone for recruitment success. Learn to play the right notes in showcasing your company culture, values, and benefits to attract top-tier talent.                                                </Typography>

                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>7. Symphony of Data-Driven Recruitment</Typography>
                                                <Divider />
                                                Harness the power of data to compose a symphony of recruitment success. Uncover how analytics and insights can fine-tune your hiring processes, making them more effective and aligned with organizational objectives.                                                </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>2. Melodic Job Descriptions: Composing the Perfect Pitch</Typography>
                                                <Divider />
                                                Explore the art of crafting job descriptions that resonate with potential hires. Learn to strike the right chord with language, highlighting opportunities and company culture for a captivating melody that draws in the ideal candidates.                                                </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>4. Choreographing a Global Recruitment Dance</Typography>
                                                <Divider />
                                                Navigating the global job market requires finesse. Understand the steps to a well-choreographed recruitment dance, synchronizing time zones, cultural differences, and legal considerations for a flawless performance.                                                </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>6. Keynotes of Employee Retention</Typography>
                                                <Divider />
                                                The melody doesn't end with hiring; it extends to employee retention. Explore strategies to keep your talented workforce engaged and satisfied, ensuring they stay in tune with your organization's goals.                                                </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>8. Coda: Continuous Improvement in Recruitment</Typography>
                                                <Divider />
                                                The journey concludes with a focus on continuous improvement. Discover how to fine-tune your recruitment strategies, learn from past experiences, and stay ahead in the ever-evolving landscape of global hiring.                                                </Typography>
                                        </Grid>
                                    </Grid>






                                </BootstrapDialog>



                                <div className="col-md-4">
                                    <div >
                                        <img src={blog02} alt="Image 3" className="fixed-size" style={{ width: '100%', height: '294px', borderRadius: '15px', cursor: "pointer" }} id='blogdiv' onClick={handleClickOpen2} />
                                        <h1 style={{
                                            color: "black", fontFamily: "Nunito Sans",
                                            fontSize: "37px",
                                            fontWeight: "600",
                                            marginTop: "10px"
                                        }}>
                                            Beyond Borders: <span className='highlighted-text'>Connecting Employers with Top Global Talent</span>
                                        </h1>
                                    </div>
                                    <div>
                                        <h2 style={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "16px", fontWeight: "600" }}>
                                            {truncateText(text3, 200)}
                                        </h2>
                                    </div>
                                </div>

                                <BootstrapDialog
                                    onClose={handleClose2}
                                    aria-labelledby="customized-dialog-title"
                                    open={open2}
                                    maxWidth="lg"
                                >

                                    <Box sx={{ position: 'relative', width: "100%", borderRadius: "30px" }}>
                                        <CardMedia
                                            component="img"
                                            image={blog02}
                                            alt="Paella dish"
                                            sx={{
                                                maxHeight: "500px",
                                                // borderRadius: "15px",
                                                width: '100%'
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 16,
                                                // left: 16,
                                                color: 'white',
                                                fontSize: 'clamp(2rem, 4vw, 4rem)',
                                                fontWeight: "600",
                                                lineHeight: "normal",
                                                fontFamily: "Nunito Sans",
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                background: 'linear-gradient(to right, #000, #808080)',
                                                width: "100%"
                                            }}
                                        >
                                            Beyond Borders: <span className='highlighted-text'>Connecting Employers with Top Global Talent</span>
                                        </Typography>
                                    </Box>


                                    <Typography gutterBottom sx={{ fontSize: "26px", fontWeight: "500", color: "#000", marginTop: "5px", padding: "20px" }}>
                                        In the ever-evolving landscape of employment, the quest for top-tier talent has transcended geographical boundaries. Employers are no longer confined by borders; instead, they are venturing into the realm of global talent acquisition, seeking the best candidates worldwide. This paradigm shift is evident in the concept of "Beyond Borders: Connecting Employers with Top Global Talent," a phenomenon that has reshaped the dynamics of recruitment and redefined the traditional approach to hiring.                                        </Typography>



                                    <Grid container spacing={2} sx={{ marginTop: 2, padding: "20px" }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>1. Introduction</Typography>
                                                <Divider />
                                                The digital era has dismantled the barriers that once restricted the search for talent within local or national boundaries. With the emergence of platforms like huntsjob, employers can cast their nets globally, exploring a vast pool of skilled professionals beyond borders.                                                    </Typography>

                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>3. The Role of huntsjob in Global Talent Acquisition</Typography>
                                                <Divider />
                                                Huntsjob, a pioneering platform in the global recruitment landscape, acts as a catalyst in connecting employers with top-notch talent. Its user-friendly interface, advanced search algorithms, and extensive database make it a go-to platform for companies aiming to build a globally competitive workforce.                                                </Typography>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>5. Access to Specialized Skills</Typography>
                                                <Divider />
                                                Certain regions or countries may be hubs for specific industries or skills. By tapping into global talent pools, employers can access specialized skills that might be scarce in their local markets.                                                    </Typography>

                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>7. Cultural Sensitivity and Awareness</Typography>
                                                <Divider />
                                                While global talent acquisition offers numerous benefits, it comes with its set of challenges. Cultural differences can impact communication and collaboration. Employers must prioritize cultural sensitivity and foster a global mindset within their organizations.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>2. Expanding the Talent Horizon</Typography>
                                                <Divider />
                                                The essence of connecting with top global talent lies in broadening the talent horizon. Employers can now tap into diverse skill sets, experiences, and perspectives, enriching their teams with a global tapestry of expertise.                                                <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                </Typography>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>4.Diversity and Innovation</Typography>
                                                <Divider />
                                                One of the primary advantages of recruiting beyond borders is the infusion of diversity. Global talent brings a spectrum of cultural perspectives, fostering innovation and creativity within the workplace.                                                <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                </Typography>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>6. 24/7 Operations and Time Zone Advantage</Typography>
                                                <Divider />
                                                Global teams provide the flexibility of 24/7 operations, ensuring continuous progress on projects. Additionally, strategic placement of teams across time zones can lead to increased efficiency and productivity.                                                <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                </Typography>
                                                <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>8. Legal and Compliance Considerations</Typography>
                                                <Divider />
                                                Navigating diverse legal frameworks is a critical aspect of global recruitment. Employers must stay informed about employment laws in different countries to ensure compliance and mitigate legal risks.                                                    </Typography>
                                        </Grid>
                                    </Grid>






                                </BootstrapDialog>

                                {showAllPosts && (
                                    <>
                                        <div className="col-md-4">
                                            <div >
                                                <img src={blog03} alt="Image 3" className="fixed-size" style={{ width: '100%', height: '294px', borderRadius: '15px', cursor: "pointer" }} id='blogdiv' onClick={handleClickOpen3} />
                                                <h1 style={{
                                                    color: "black", fontFamily: "Nunito Sans",
                                                    fontSize: "37px",
                                                    fontWeight: "600",
                                                    marginTop: "10px"
                                                }}>
                                                    Connecting Dreams and Careers: <span className='highlighted-text'>Our Global Recruitment Success Stories</span>
                                                </h1>
                                            </div>
                                            <div>
                                                <h2 style={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "16px", fontWeight: "600" }}>
                                                    {truncateText(text4, 200)}
                                                </h2>
                                            </div>
                                        </div>

                                        <BootstrapDialog
                                            onClose={handleClose3}
                                            aria-labelledby="customized-dialog-title"
                                            open={open3}
                                            maxWidth="lg"
                                        >



                                            <Box sx={{ position: 'relative', width: "100%", borderRadius: "30px" }}>
                                                <CardMedia
                                                    component="img"
                                                    image={blog03}
                                                    alt="Paella dish"
                                                    sx={{
                                                        maxHeight: "500px",
                                                        // borderRadius: "15px",
                                                        width: '100%'
                                                    }}
                                                />
                                                <Typography
                                                    variant="h5"
                                                    component="div"
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 16,
                                                        // left: 16,
                                                        color: 'white',
                                                        fontSize: 'clamp(2rem, 4vw, 4rem)',
                                                        fontWeight: "600",
                                                        lineHeight: "normal",
                                                        fontFamily: "Nunito Sans",
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        background: 'linear-gradient(to right, #000, #808080)'
                                                    }}
                                                >
                                                    Connecting Dreams and Careers: <span className='highlighted-text'>Our Global Recruitment Success Stories</span>
                                                </Typography>
                                            </Box>


                                            <Typography gutterBottom sx={{ fontSize: "26px", fontWeight: "500", color: "#000", marginTop: "5px", padding: "20px" }}>
                                                In the intricate dance between dreams and careers, the role of global recruitment cannot be overstated. The fusion of aspirations and professional paths on a global stage has given rise to success stories that transcend borders. Join us on a journey of inspiration and discovery as we delve into "Connecting Dreams and Careers: Our Global Recruitment Success Stories.
                                            </Typography>



                                            <Grid container spacing={2} sx={{ marginTop: 2, padding: "20px" }}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>1. Introduction</Typography>
                                                        <Divider />
                                                        The landscape of recruitment has evolved into a global odyssey, connecting dreams and careers across continents. Our success stories are a testament to the transformative power of finding the right match between ambitious professionals and forward-thinking organizations.                                                            </Typography>

                                                    <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>3. Huntsjob's Role in Bridging Aspirations and Opportunities</Typography>
                                                        <Divider />
                                                        Huntsjob, a beacon in the realm of global recruitment, plays a pivotal role in connecting dreams and careers. Its user-centric approach, advanced algorithms, and expansive network facilitate seamless matches between talented individuals and organizations hungry for innovation.                                                            </Typography>
                                                    <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>5. Crossing Cultural Boundaries: Marketing Maverick's Story</Typography>
                                                        <Divider />
                                                        Maria, a marketing maven from Madrid, dreamt of breaking into the competitive New York advertising scene. Huntsjob facilitated her connection with a global agency seeking her expertise. Maria's story is a testament to how dreams and careers can harmonize across diverse cultural landscapes.                                                            </Typography>

                                                    <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>7. Empowering Individuals, Enriching Organizations</Typography>
                                                        <Divider />
                                                        The essence of connecting dreams and careers globally lies in the reciprocal empowerment of individuals and organizations. Aspirations find a platform, and companies gain access to a diverse pool of talent that propels them towards innovation and growth.                                                        </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>2. The Global Talent Mosaic</Typography>
                                                        <Divider />
                                                        The essence of connecting with top global talent lies in broadening the talent horizon. Employers can now tap into diverse skill sets, experiences, and perspectives, enriching their teams with a global tapestry of expertise.                                                <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        </Typography>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>4.From Mumbai to Silicon Valley: A Tech Prodigy's Journey</Typography>
                                                        <Divider />
                                                        One of the primary advantages of recruiting beyond borders is the infusion of diversity. Global talent brings a spectrum of cultural perspectives, fostering innovation and creativity within the workplace.                                                <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        </Typography>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>6. Rising from the Ashes: A Phoenix's Career Tale</Typography>
                                                        <Divider />
                                                        Global teams provide the flexibility of 24/7 operations, ensuring continuous progress on projects. Additionally, strategic placement of teams across time zones can lead to increased efficiency and productivity.                                                <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                                                        </Typography>
                                                        <Typography sx={{ fontSize: "26px", fontWeight: "400", color: "#000" }}>8. Building Bridges, Breaking Barriers</Typography>
                                                        <Divider />
                                                        Global recruitment is not just about filling positions; it's about building bridges between dreams and careers while breaking down traditional barriers. It's a symphony where aspirations harmonize with opportunities, creating a melodious narrative of success.
                                                    </Typography>
                                                </Grid>
                                            </Grid>


                                        </BootstrapDialog>
                                    </>
                                )}
                            </div>
                        </div>


                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Blogs2  