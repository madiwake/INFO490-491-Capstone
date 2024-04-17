import React from "react";
import Navigation from './NavigationBar';
import Footer from "./Footer";

export default function HowToPage(props) {
    const howToCards = props.howToQuestions.map((question) => {
        const answerParagraphs = question.answer.map((paragraph) => {
            return (
                <p>
                    {paragraph}
                </p>
            )
        })
        return (
            <div className="howToCard">
                <div className="howToCard-question-container">
                    <img 
                        className="howToCard-question-icon" 
                        src="/img/questionMark-icon.png"
                        alt="dark blue circle with a white question mark in the center" 
                    />
                    <p className="howToCard-question">
                        {question.question}
                    </p>
                </div>
                <p className="howToCard-answer">
                    {answerParagraphs}
                </p>
            </div>
        );
    });

    return (
        <div className="howToPage">
            <Navigation pageTitle={'HOW-TO'} />
            <div className="body">
                <p className="body-description">
                    Take a look at common processes, issues, and questions that other students with disabilities have struggled with to discover digestible guides and answers for how to navigate these situations.
                </p>
                <div className="body-allhowToCards">
                    {howToCards}
                </div>
            </div>
            <Footer />
        </div>
    );
};