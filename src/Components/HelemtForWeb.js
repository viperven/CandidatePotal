import React, { useState, useEffect } from 'react';
import Helmet from "react-helmet";
function HelmetForWeb() {
    const question = "Can HuntsJob help me find tube mill operator jobs in specific Gulf countries?";
    const answer = "Yes, HuntsJob has a broad network of employers across various Gulf countries, including Saudi Arabia, the United Arab Emirates, Qatar, Oman, and more. We can assist you in finding tube mill operator positions in your preferred location.";

    // Array of questions and answers
    var faqData = [
        {
            question: "Which brands offer the best ACs under 30000 in India?",
            answer: "This selection of window and split ACs are efficient and affordable at the same time."
        },
        {
            question: "What is the cost of a high-performance AC in India?",
            answer: "ACs under 30000 in India. "
        },
        {
            question: "Should I purchase a 3-Star or a 5-Star AC?",
            answer: "However, a 3-star AC is more affordable than a smart air conditioner with a 5-star rating."
        }
    ];

    // Generate the mainEntity array dynamically

    useEffect(() => {


    }, []);

    return (
        <>

            {/* <Helmet>
                <script type="application/ld+json">
                    {`
                            {
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "${question}",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "${answer}"
                                        }
                                    },
                                ]
                            }
                        `}
                </script>
                <script type="application/ld+json">
                    {`{"@context":"https://schema.org",
                    "@type":"FAQPage",
                    "mainEntity":[{
                                "@type":"Question",
                                "name":"Which brands offer the best ACs under 30000 in India?",
                                "acceptedAnswer":{
                                    "@type":"Answer",
                                    "text":" This selection of window and split ACs are efficient and affordable at the same time."
                                    }
                                }
                                {
                                    "@type":"Question",
                                    "name":"What is the cost of a high-performance AC in India?",
                                    "acceptedAnswer":{
                                        "@type":"Answer",
                                        "text":"ACs under 30000 in India.  "
                                    }
                                },
                                {
                                    "@type":"Question",
                                    "name":"Should I purchase a 3-Star or a 5-Star AC?",
                                    "acceptedAnswer":{
                                        "@type":"Answer",
                                        "text":" However, a 3-star AC is more affordable than a smart air conditioner with a 5-star rating."
                                    }
                                }
                            ]}
                        `}</script>
            </Helmet> */}
            <Helmet>
                <script type="application/ld+json">
                    {`
                        {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            ${faqData.map((entry, index) => `{
                            "@type": "Question",
                            "name": "${entry.question}",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "${entry.answer}"
                            }
                            }${index !== faqData.length - 1 ? ',' : ''}`).join('')}
                        ]
                        }
                    `}
                </script>
            </Helmet>
        </>
    )
}

export default HelmetForWeb