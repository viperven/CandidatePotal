import React, { useState } from 'react';
import Layout from '../../Layout/Layout';

const GulfPost = () => {
    const [selectedTopic, setSelectedTopic] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    const cardsData = [
        {
            title: 'Card Title 1',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. first card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 1
        },
        {
            title: 'Card Title 2',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. second card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 1
        },
        {
            title: 'Card Title 3',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. third card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 2
        },
        {
            title: 'Card Title 4',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 2
        },
        {
            title: 'Card Title 5',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. third card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 3    
        },   
        {
            title: 'Card Title 6',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 3
        },
        {
            title: 'Card Title 7',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 4
        },
        {
            title: 'Card Title 8',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 4
        },
        {
            title: 'Card Title 9',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 5
        },
        {
            title: 'Card Title 10',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 5
        },
        {
            title: 'Card Title 11',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 6
        },
        {
            title: 'Card Title 12',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 6
        },
        {
            title: 'Card Title 13',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 7
        },
        {
            title: 'Card Title 14',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 7
        },
        {
            title: 'Card Title 15',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 8
        },
        {
            title: 'Card Title 16',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 8
        },
        {
            title: 'Card Title 17',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 9
        },
        {
            title: 'Card Title 18',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 9
        },
        {
            title: 'Card Title 19',
            text: 'This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card.This is some example text for the first card. fourth card.',
            img: 'https://www.naukrigulf.com/career-tips/wp-content/uploads/2024/09/jafza.jpg',
            topic: 9
        },
    ];

    const topics = [
        { id: 1, name: 'All Topics' },
        { id: 2, name: 'Top News' },
        { id: 3, name: 'Profile Guide' },
        { id: 4, name: 'Job Search and Interview Tips' },
        { id: 5, name: 'Employer Guide' },
        { id: 6, name: 'Expert Speak' },
        { id: 7, name: 'Career Advice' },
        { id: 8, name: 'Working in the Gulf' },
        { id: 9, name: 'Holiday Calendar' },
    ];

    const filteredCards = selectedTopic === 1 ? cardsData : cardsData.filter(card => card.topic === selectedTopic);
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    const currentCards = filteredCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);


    return (
        <Layout>
        <section style={{ padding: "0.5rem" }}>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 mb-3" >
                    <h5 style={{ color: "black" }}>Choose A Topic Of Interest</h5>
                    <ul>
                        {topics.map(topic => (
                            <li
                                key={topic.id}
                                onClick={() => {
                                    setSelectedTopic(topic.id);
                                    setCurrentPage(1); // Reset to the first page when changing topic
                                }}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: selectedTopic === topic.id ? 'bold' : 'normal',
                                    backgroundColor: selectedTopic === topic.id ? '#f0f0f0' : 'transparent',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                }}
                            >
                                {topic.name}
                            </li>
                        ))}                      
                    </ul>
                </div>
                <div className="col-lg-8 mb-3">
                    {currentCards.map((card, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="row g-0">
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <h2 style={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "16px", fontWeight: "600" }}>
                                            {truncateText(card.text, 200)}<a href="#" className="btn">Read More</a>
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                    <img src={card.img} className="img-fluid rounded-start" alt="Card" />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="pagination">
                        <button 
                        className="btn btn-primary rounded"     
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button 
                        className="btn btn-primary rounded"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
    );
};

export default GulfPost;
