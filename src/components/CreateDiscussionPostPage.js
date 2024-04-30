import React from "react";
import { collection, addDoc} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "./Footer";
import NavigationBar from './NavigationBar';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

export default function CreateDiscussionPostPage(props){
    const [user] = useAuthState(props.auth);
    const setPosts = props.setPosts;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        const category = e.target.category.value;
        const timestamp = Date.now();
    
        try {
        const docRef = await addDoc(collection(props.firestore, 'forumposts'), {
            title,
            content,
            category,
            timestamp,
            userId: user?.uid,
            likes: 0 // Initialize likes count
        });
    
        const newPost = {
            id: docRef.id,
            title,
            content,
            category,
            timestamp,
            userId: user?.uid,
            likes: 0, // Initialize likes count
            likedByUser: false // Initialize likedByUser field
        };
    
        setPosts(prevPosts => [...prevPosts, newPost]);
    
        e.target.reset();
        navigate("/discussion-forum")
        } catch (error) {
        console.error("Error adding document: ", error);
        }
    };

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
                <TagBar />
                <div className="postForm-container">
                    <Form
                        onSubmit={handleSubmit}
                        className="postForm"
                    >
                        <Form.Group
                            className="postForm-category"
                        >
                            <Form.Select
                                aria-label="choose a thread"
                                id="category"
                                required
                                as="select"
                                type="select"
                            >
                                <option 
                                    value="" 
                                    className="postForm-category-placeholder"
                                >
                                    Choose a Thread:
                                </option>
                                <option value="social">Social</option>
                                <option value="Venting">Venting</option>
                                <option value="Advice">Advice</option>
                                <option value="Questions">Questions</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="postForm-title"
                        >
                            <Form.Control
                                type="title"
                                id="title"
                                placeholder="Title"
                                maxLength={300}
                                className="postForm-title-textBox"
                                required
                            />
                            <Form.Text id="title">Please limit title to no more than 300 characters</Form.Text>
                        </Form.Group>
                        <textarea 
                            name="content"
                            id="content" 
                            placeholder="Text"
                            className="postForm-content" 
                        ></textarea>
                        <button 
                            className="create-post-button" 
                            type="submit"
                        >
                            Post
                        </button>
                    </Form>
                  
                </div>
            </div>
            <Footer />
        </div>
    )
}

function TagBar() {
    function TagImage({image, alt, category}){
        return (
            <div className="singleTagImage">
                <img 
                    src={image}
                    alt={alt}
                />
                <p>{category}</p>
            </div>
        );
    };
    return (
        <div className="tagImages">
            <TagImage
                image="./img/general-discussion-icon.png"
                alt="three stick figures. two of them have comment boxes floating above their heads" 
                category="All Posts"
            />
            <TagImage  
                image="./img/social-discussion-icon.png"
                alt="two stick figures"
                category="Social"
            />
            <TagImage
                image="./img/venting-discussion-icon.png"
                alt="one stick figure with sound waves coming from their head"
                category="Venting"
            />
            <TagImage
                image="./img/advice-discussion-icon.png" 
                alt="two stick figure heads with lines connecting them to form a circle"
                category="Advice"
            />
            
            <TagImage
                image="./img/question-discussion-icon.png"
                alt="dark blue circle with question mark in it"
                category="Questions"
            />
        </div>
    )
}