import React, { useState } from "react";
import Footer from "./Footer";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import NavigationBar from './NavigationBar';
import { useAuthState } from "react-firebase-hooks/auth";

function HowToCard(props) {
    const [showingAnswer, setShowingAnswer] = useState(false);
    const answerParagraphs = props.answer.map((paragraph) => {
        return (
            <p className="howToCard-answer" key={paragraph}> 
                {paragraph}
            </p>
        )
    })
    return (
        <div 
            className="howToCard" 
            onClick={() => {setShowingAnswer(!showingAnswer)}}
            type="button"
        >
            <div className="howToCard-question-container">
                <img 
                    className="howToCard-question-icon" 
                    src="/img/questionMark-icon.png"
                    alt="dark blue circle with a white question mark in the center" 
                />
                <p className="howToCard-question">
                    {props.question}
                </p>
            </div>
            <div className={`howToCard-answer-container ${showingAnswer ? 'showing' : ''}`}>
                {/* {showingAnswer ? answerParagraphs : ""} */}
                {answerParagraphs}
            </div>
        </div>
    )
}

export default function HowToPage(props) {
    const [user] = useAuthState(props.auth);

    const howToCards = props.howToQuestions.map((question) => {
        return (
            <HowToCard 
                key={question.question}
                question={question.question} 
                answer={question.answer} 
            />
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
                        columnsCountBreakPoints={{100: 1}}
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