import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';

function PageCarousel() {
    const [carouselIndex, setCarouselIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setCarouselIndex(selectedIndex);
    };
    return (
        <Carousel 
            activeIndex={carouselIndex} 
            onSelect={handleSelect}
        >
            <Carousel.Item 
                interval={2000}
                pause={'hover'}
                className="carousel-slide"
            >
                <img
                    src='./img/carousel-background.png'
                    alt='light blue carousel background'
                />
                <Carousel.Caption className="carousel-text">
                    <h3>RESOURCE HUB</h3>
                    <p>
                        The resource page allows you to easily connect with varying resources that fit your personalized needs. You can search and filter through on-campus, Seattle, and online resources to connect with resources when and where you need them. 
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item 
                interval={2000}
                pause={'hover'}
                className="carousel-slide"
            >
                <img
                    src='./img/carousel-background.png'
                    alt='light blue carousel background'
                />
                <Carousel.Caption className="carousel-text">
                    <h3>COMMUNITY DISCUSSION</h3>
                    <p>
                        The discussion page allows you to connect and chat with other students about shared inquiries. You are able to read others' posts, post your own questions, reply, and upvote. You can also browse through our designated pages for advice, socializing, venting and questions.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item 
                interval={2000} 
                pause={'hover'}
                className="carousel-slide"
            >
                <img
                    src='./img/carousel-background.png'
                    alt='light blue carousel background'
                />
                <Carousel.Caption className="carousel-text">
                    <h3>HOW-TO</h3>
                    <p>
                        The How-To page allows you to look at common processes, issues, and questions that other students with disabilities have struggled with to discover digestible guides and answers for how to navigate these situations. 
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item 
                interval={2000} 
                pause={'hover'}
                className="carousel-slide"
            >
                <img
                    src='./img/carousel-background.png'
                    alt='light blue carousel background'
                />
                <Carousel.Caption className="carousel-text">
                    <h3>SIGN IN TO CONNECT</h3>
                    <p>
                        By creating an account and signing in to REACH you can connect with other students with disabilities to find solidarity and support through other students' shared experiences, opinions, questions, and comments.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default function HomePage() {

    return(
        <div className="homePage">
            <div className="body">
                <h1 className="body-title">
                    Welcome to REACH
                </h1>
                <div className="body-missionStatement-container">
                    <div className="body-missionStatement-text-container">
                        <div className="body-missionStatement-text-whatIsREACH">
                            <h2 className="body-missionStatement-text-whatIsREACH-question">
                                What is REACH?
                            </h2>
                            <p className="body-missionStatement-text-whatIsREACH-answer">
                                REACH stands for Resource, Education, Accessibility, and Community Hub.
                            </p>
                        </div>
                        <div className="body-missionStatement-text">
                            <h3>
                                OUR MISSION
                            </h3>
                            <p className="body-missionStatement-text-paragraph">
                                At REACH, our mission is to empower students with disabilities by providing an online platform where they can easily discover a supportive community and access essential resources tailored to their unique needs. We strive to foster an inclusive environment that allows students to grow and succeed in higher education so that every student can flourish in college and beyond.
                            </p>
                        </div>
                    </div>
                    <img 
                        src='./img/homePage-picture.png'
                        className="body-missionStatement-picture"
                        alt="placeholder"
                    />
                </div>
                <h2 className="body-carouselTitle">
                    What Can You Do With REACH?
                </h2>
                <PageCarousel />
                <div className="body-project-context">
                    <h2>OUR PROJECT</h2>
                    <p>
                        We are a team of five undergraduate Informatics students at the University of Washington - Seattle. Upon our group formation, we discovered a shared passion for developing technologies which create equitable support for marginalized communities. Getting to know each other, we realized many people on our team have personal connections to Disability Resources for Students (DRS) whether than be through friends, family, or ourselves. We observed an absence of holistic resources that considered aspects of a students' lives outside of in-class room aid. We also observed a lack of social connectedness between students with disabilities at the UW. We were driven to design and develop a web application that addressed the inequities we saw among students.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}