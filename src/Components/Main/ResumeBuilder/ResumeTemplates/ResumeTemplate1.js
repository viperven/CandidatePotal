import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'boxicons/css/boxicons.min.css';

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        color: '#333',
        margin: 0,
        padding: '20px',
    },
    resumeContainer: {
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid #007bff',
        paddingBottom: '20px',
        marginBottom: '20px',
    },
    image: {
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '20px',
    },
    headerInfo: {
        flexGrow: 1,
    },
    name: {
        margin: 0,
        fontSize: '28px',
        color: '#007bff',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#495057',
    },
    contact: {
        margin: '5px 0',
        fontSize: '14px',
        color: '#6c757d',
    },
    section: {
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '20px',
        borderBottom: '2px solid #007bff',
        paddingBottom: '5px',
        color: '#007bff',
        marginBottom: '15px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        marginBottom: '10px',
    },
};

const ResumeTemplate1 = () => {
    return (
        <div style={styles.body}>
            <div style={styles.resumeContainer}>
                <div style={styles.header}>
                    <img src="rupesh.jpeg" alt="Profile Picture" style={styles.image} />
                    <div style={styles.headerInfo}>
                        <h1 style={styles.name}>John Doe</h1>
                        <h3 style={styles.title}>Software Engineer</h3>
                        <p style={styles.contact}><i className='bx bxs-phone' /> +123 456 7890</p>
                        <p style={styles.contact}><i className='bx bxs-envelope' /> johndoe@example.com</p>
                        <p style={styles.contact}><i className='bx bxs-map' /> 1234 Street, City, Country</p>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}><i className='bx bxs-briefcase' /> Experience</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <strong>Senior Developer</strong> - ABC Company (2019 - Present)
                            <p>Leading a team of developers to create cutting-edge web applications.</p>
                        </li>
                        <li style={styles.listItem}>
                            <strong>Software Developer</strong> - XYZ Inc. (2015 - 2019)
                            <p>Developed and maintained a variety of software solutions for clients.</p>
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}><i className='bx bxs-graduation' /> Education</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <strong>Bachelor of Science in Computer Science</strong> - University of Technology (2011 - 2015)
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}><i className='bx bxs-wrench' /> Skills</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}><i className='bx bxs-check-circle' /> JavaScript, React, Node.js</li>
                        <li style={styles.listItem}><i className='bx bxs-check-circle' /> Python, Django</li>
                        <li style={styles.listItem}><i className='bx bxs-check-circle' /> HTML, CSS, Bootstrap</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}><i className='bx bxs-comment-detail' /> Summary</h2>
                    <p>Experienced Software Engineer with a passion for developing innovative programs that expedite the efficiency
                        and effectiveness of organizational success. Well-versed in technology and writing code to create systems
                        that are reliable and user-friendly. Skilled leader who has the proven ability to motivate, educate, and
                        manage a team of professionals to build software programs and effectively track changes.</p>
                </div>
            </div>
        </div>
    );
};



export default ResumeTemplate1;
