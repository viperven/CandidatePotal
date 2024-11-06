import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Layout from '../../Layout/Layout';

const events = [
  {
    name: "Mr. Shuaib Babajan Alamkhani",
    title: "Overseas Dream Comes True in Bahrain",
    description: "Mr. Shuaib's hard work and perseverance paid off as he secured a dream job as a Boat Mechanic in Bahrain through Huntsjob. Watch his inspiring journey and learn how Huntsjob helped him achieve his overseas career goals!",
    side: "left-2",
    youtubeLink: "https://www.youtube.com/embed/acdUJ-vK93Y?si=fsvUf8-8lEMzbKFw"
  },
  {
    name: "Mr. Zafar",
    title: "From India to Qatar: Mr. Zafar’s Success Journey",
    description: "With the right guidance from Huntsjob, Mr. Zafar successfully landed a job in Qatar. His story showcases how dedication and the right platform can turn aspirations into reality. Watch his experience unfold!",
    side: "right-2",
    youtubeLink: "https://www.youtube.com/embed/PF6IlE1vHt0?si=DlC7oCuCE243f_Ki"
  },
  {
    name: "Mr. Shadab",
    title: "From Ambition to Achievement: Mr. Shadab’s Career in Dammam",
    description: "Discover how Mr. Shadab took a major leap in his career and secured a prestigious role as Maintenance Incharge in Dammam, Saudi Arabia. His success story is a testament to Huntsjob’s commitment to connecting talent with opportunities abroad.",
    side: "left-2",
    youtubeLink: "https://www.youtube.com/embed/R9TVzQ_ByhI?si=pak4CW3ZIiQ2Cu6E"
  }
];

const SuccessStory2 = () => {
  const [visibleCount, setVisibleCount] = useState(2); // Initially show 2 events
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 420);


  const loadMoreEvents = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 1, events.length)); // Load one more event at a time
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 420);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      {!isMobile ? (
        <>
        <div style={{ padding: '20px' }}>
      <VerticalTimeline lineColor="rgb(233, 30, 99)">
        {events.slice(0, visibleCount).map((event, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            iconStyle={{ background: '#FE5C35', color: '#fff', lineHeight: '40px',display:"flex", justifyContent:"center", alignItems:"center" }}
            position={event.side}
            icon={<i class='bx bx-expand-horizontal boxiconn' style={{ fontSize: '30px', lineHeight: "60px" }}></i>}
          >
            <h3 className="vertical-timeline-element-title">{event.youtubeLink && (
              <iframe 
                width="100%" 
                height="200" 
                src={event.youtubeLink} 
                title="YouTube Video" 
                frameBorder="0" 
                allowFullScreen
              />
            )}</h3>
            <h4 className="vertical-timeline-element-subtitle" style={{ color: "black" }}>{event.name}</h4>
            <p style={{fontSize:"bold",color:"black"}}>"{event.title}"</p>
            <p>{event.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      {visibleCount < events.length && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={loadMoreEvents} style={{ borderRadius: "50%", padding: '10px 15px', fontSize: '20px', border: 'none', background: '#FE5C35', color: '#fff' }}>
            <i className='bx bx-plus' style={{fontSize: "30px"}}></i>
          </button>    
        </div>
      )}
    </div>
        </>
      ):(
        <>
        <div style={{ padding: '20px', textAlign: 'cent   er' }}>
          <h2 style={{ color: "black" }}>Success Stories</h2>
          {events.slice(0, visibleCount).map((event, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #FE5C35', borderRadius: '8px', padding: '10px' }}>
              {event.youtubeLink && (
                <iframe 
                  width="100%" 
                  height="200" 
                  src={event.youtubeLink} 
                  title="YouTube Video" 
                  frameBorder="0" 
                  allowFullScreen
                />
              )}
              <h4 style={{ color: "black" }}>{event.name}</h4>
              <p style={{fontSize:"bold",color:"black"}}>"{event.title}"</p>
              <p>{event.description}</p>
            </div>
          ))}
          {visibleCount < events.length && (
            <button onClick={loadMoreEvents} style={{ marginTop: '20px', padding: '10px 15px', border: 'none', background: '#FE5C35', color: '#fff', borderRadius: '5px' }}>
              Load More
            </button>
          )}
        </div>
        </>
      )}
    </Layout>
  );
};

export default SuccessStory2;
