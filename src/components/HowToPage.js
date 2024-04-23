import React from "react";
import Footer from "./Footer";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import NavigationBar from './NavigationBar';
import { useAuthState } from "react-firebase-hooks/auth";

export default function HowToPage(props) {
    const [user] = useAuthState(props.auth);

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
            <NavigationBar auth={props.auth} pageTitle={'HOW-TO'} user={user} />
            <div className="body">
                <p className="body-description">
                    Take a look at common processes, issues, and questions that other students with disabilities have struggled with to discover digestible guides and answers for how to navigate these situations.
                </p>
                <div className="body-allhowToCards">
                    <ResponsiveMasonry 
                        columnsCountBreakPoints={{100: 1, 768: 2}}
                    >
                        <Masonry
                            className="masonry-container"
                        >
                            {howToCards}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>
            <Footer />
        </div>
    );
};