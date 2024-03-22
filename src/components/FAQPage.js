import React from "react";
import Navigation from './NavigationBar';
import Footer from "./Footer";

export default function FAQPage(props) {
    const faqCards = props.faqQuestions.map((question) => {
        return (
            <div className="FAQCard">
                <div className="FAQCard-question-container">
                    <img 
                        className="FAQCard-question-icon" 
                        src="/img/questionMark-icon.png"
                        alt="dark blue circle with a white question mark in the center" 
                    />
                    <p className="FAQCard-question">
                        {question.question}
                    </p>
                </div>
                <p className="FAQCard-answer">
                    {question.answer}
                </p>
            </div>
        );
    });

    return (
        <div className="FAQPage">
            <Navigation pageTitle={'FAQ'} />
            <div className="body">
                <p className="body-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="body-allFAQCards">
                    {faqCards}
                </div>
            </div>
            <Footer />
        </div>
    );
};