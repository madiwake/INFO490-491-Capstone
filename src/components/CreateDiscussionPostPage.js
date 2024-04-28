import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "./Footer";
import NavigationBar from './NavigationBar';
import { useNavigate } from "react-router-dom";

export default function CreateDiscussionPostPage(props){
    const [user] = useAuthState(props.auth);
    const navigate = useNavigate();
    return (
        <div className="createPostPage">
            <NavigationBar auth={props.auth} pageTitle={'Discussion'} user={user} />
            <div className="body">
                <h2>CREATE A POST</h2>
                <button 
                    className="body-backButton"
                    onClick={() => navigate("/discussion-forum")}
                >
                    <img
                        src="./img/back-icon.png"
                        alt="arrow facing the left"
                    />
                    Back
                </button>
                <div className="tagImages">
                    <div className="singleTagImage">
                        <img 
                            src="./img/general-discussion-icon.png"
                            alt="three stick figures. two of them have comment boxes floating above their heads" 
                        />
                        <p>All Posts</p>
                    </div>
                    <div className="singleTagImage">
                        <img 
                            src="./img/social-discussion-icon.png"
                            alt="two stick figures"
                        />
                        <p>Social</p>
                    </div>
                    <div className="singleTagImage">
                        <img 
                            src="./img/venting-discussion-icon.png"
                            alt="one stick figure with sound waves coming from their head"
                        />
                        <p>Venting</p>
                    </div>
                    <div className="singleTagImage">
                        <img 
                            src="./img/advice-discussion-icon.png" 
                            alt="two stick figure heads with lines connecting them to form a circle"
                        />
                        <p>Advice</p>
                    </div>
                    <div className="singleTagImage">
                        <img 
                            src="./img/question-discussion-icon.png"
                            alt="dark blue circle with question mark in it"
                        />
                        <p>Questions</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}