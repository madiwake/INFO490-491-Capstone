import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import NavigationBar from './NavigationBar';
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where, getDocs as getSubcollectionDocs } from "firebase/firestore";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DiscussionForumPage = (props) => {
  const [user] = useAuthState(props.auth);
  // const [posts, setPosts] = useState([]);
  const posts = props.posts;
  const setPosts = props.setPosts;
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const [replyContent, setReplyContent] = useState(""); // Initialize reply content state
  const [likedPosts, setLikedPosts] = useState([]); // Store liked posts for the current user

  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(props.auth, provider);
  };

  useEffect(() => {
    fetchData();
    fetchLikedPosts(); // Fetch liked posts for the current user
  }, [currentCategory]);

  useEffect(() => {
    // Save liked posts to localStorage whenever the likedPosts state changes
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const fetchData = async () => {
    try {
      const postsQuerySnapshot = await getDocs(collection(props.firestore, 'forumposts'));
      const fetchedPosts = [];

      for (const postDoc of postsQuerySnapshot.docs) {
        const postData = postDoc.data();
        const repliesQuerySnapshot = await getSubcollectionDocs(query(collection(props.firestore, 'forumposts', postDoc.id, 'replies')));

        const replies = [];
        repliesQuerySnapshot.forEach(replyDoc => {
          replies.push({ id: replyDoc.id, ...replyDoc.data() });
        });

        if (currentCategory === "All" || postData.category === currentCategory) {
          fetchedPosts.push({
            id: postDoc.id,
            ...postData,
            likedByUser: likedPosts.includes(postDoc.id), // Check if the post is liked by the user
            showReplyBox: false,
            showReplies: false,
            replies: replies
          });
        }
      }

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };  

  const fetchLikedPosts = async () => {
    try {
      const likedPosts = localStorage.getItem("likedPosts");
      if (likedPosts) {
        setLikedPosts(JSON.parse(likedPosts));
      }
    } catch (error) {
      console.error("Error fetching liked posts: ", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const title = e.target.title.value;
  //   const content = e.target.content.value;
  //   const category = e.target.category.value;
  //   const timestamp = Date.now();
  
  //   try {
  //     const docRef = await addDoc(collection(props.firestore, 'forumposts'), {
  //       title,
  //       content,
  //       category,
  //       timestamp,
  //       userId: user?.uid,
  //       likes: 0 // Initialize likes count
  //     });

  //     const newPost = {
  //       id: docRef.id,
  //       title,
  //       content,
  //       category,
  //       timestamp,
  //       userId: user?.uid,
  //       likes: 0, // Initialize likes count
  //       likedByUser: false // Initialize likedByUser field
  //     };

  //     setPosts(prevPosts => [...prevPosts, newPost]);

  //     e.target.reset();
  //     // setShowCreatePost(false); replace with navigate back to discussion page
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };

  const handleLike = async (postId) => {
    try {
      const postRef = doc(props.firestore, 'forumposts', postId);
      const postIndex = posts.findIndex(post => post.id === postId);
      const alreadyLiked = posts[postIndex].likedByUser;
  
      if (!alreadyLiked) {
        await updateDoc(postRef, {
          likes: posts[postIndex].likes + 1
        });
        await addDoc(collection(props.firestore, 'likes'), { userId: user.uid, postId });
        setPosts(prevPosts => {
          const updatedPosts = [...prevPosts];
          updatedPosts[postIndex].likes++;
          updatedPosts[postIndex].likedByUser = true;
          return updatedPosts;
        });
        setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]); // Add postId to likedPosts state
      } else {
        // Unlike the post
        await updateDoc(postRef, {
          likes: posts[postIndex].likes - 1
        });
        // Remove like from database
        const likesQuerySnapshot = await getDocs(query(collection(props.firestore, 'likes'), where("userId", "==", user.uid), where("postId", "==", postId)));
        likesQuerySnapshot.forEach(async (likeDoc) => {
          await deleteDoc(doc(props.firestore, 'likes', likeDoc.id));
        });
        // Update local state
        setPosts(prevPosts => {
          const updatedPosts = [...prevPosts];
          updatedPosts[postIndex].likes--;
          updatedPosts[postIndex].likedByUser = false;
          return updatedPosts;
        });
        setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId)); // Remove postId from likedPosts state
      }
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };
  
  const handleReply = async (postId, replyContent, index) => {
    try {
      const postRef = doc(props.firestore, 'forumposts', postId);
      const timestamp = Date.now();
      const newReply = { reply: replyContent, timestamp }; // Create new reply object
      const replyDocRef = await addDoc(collection(postRef, 'replies'), newReply); // Add reply to Firestore
  
      setPosts(prevPosts => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index].replies.push({ id: replyDocRef.id, ...newReply });
        updatedPosts[index].showReplies = true;
        updatedPosts[index].showReplyBox = false;
        return updatedPosts;
      });
  
      setReplyContent(""); // Clear reply content after submission
    } catch (error) {
      console.error("Error adding reply: ", error);
    }
  };  

  const toggleReplyBox = (index) => {
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].showReplyBox = !updatedPosts[index].showReplyBox;
      return updatedPosts;
    });
  };

  const toggleReplies = (index) => {
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].showReplies = !updatedPosts[index].showReplies;
      return updatedPosts;
    });
  };  

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

 // JSX code with category icons directly embedded
  return (
    <div className="forumPage">
      <NavigationBar 
        auth={props.auth} 
        pageTitle={'Discussion'} 
        user={user} 
      />
      <div className="body">
        <div className="body-search-and-category-container">
          <h2>CATEGORIES</h2>
          <input 
            type="text" 
            placeholder="Search Discussion" 
            onChange={handleSearchChange} 
            value={searchInput}
            className="body-searchBar" 
          />
          <div className="tagButtons">
            <button 
              className="singleTagButton" 
              onClick={() => setCurrentCategory("All")}
            >
              <img 
                src={currentCategory === "All" ? 
                  "./img/general-discussion-icon-active.png" 
                  : 
                  "./img/general-discussion-icon.png"
                }
                alt="three stick figures. two of them have comment boxes floating above their heads" 
              />
              <p>All Posts</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => setCurrentCategory("Social")}
            >
              <img 
                src={currentCategory === "Social" ? 
                  "./img/social-discussion-icon-active.png" 
                  : 
                  "./img/social-discussion-icon.png"
                }
                alt="two stick figures"
              />
              <p>Social</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => setCurrentCategory("Venting")}
            >
              <img 
                src={currentCategory === "Venting" ? 
                  "./img/venting-discussion-icon-active.png" 
                  : 
                  "./img/venting-discussion-icon.png"
                } 
                alt="one stick figure with sound waves coming from their head"
              />
              <p>Venting</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => setCurrentCategory("Advice")}
            >
              <img 
                src={currentCategory === "Advice" ? 
                  "./img/advice-discussion-icon-active.png" 
                  : 
                  "./img/advice-discussion-icon.png"
                } 
                alt="two stick figure heads with lines connecting them to form a circle"
              />
              <p>Advice</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => setCurrentCategory("Questions")}
            >
              <img 
                src={currentCategory === "Questions" ? 
                  "./img/question-discussion-icon-active.png" 
                  : 
                  "./img/question-discussion-icon.png"
                }
                alt="dark blue circle with question mark in it"
              />
              <p>Questions</p>
            </button>
          </div>
        </div>
        <div className="body-postHeader">
          <h3>
            {currentCategory === "All" ? 
              "All Posts"
              : 
              currentCategory
            }
          </h3>
          {user === null ? 
            <div> 
              <button 
                onClick={googleSignIn} 
                alt="sign in with google" 
                type="button"
                className="signinToCreatePost-button"
              >
                Sign in to Post
              </button>
            </div>
          :
            <div>
              {!showCreatePost && (
                <div>
                  <button 
                    className="create-post-button"
                    onClick={() => navigate("/create-discussion-post")}
                  >
                    Create Post
                  </button>
                </div>
              )}
              {/* {showCreatePost && (
                <div className="input">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input type="text" name="title" placeholder="Title" required />
                    </div>
                    <div>
                      <textarea name="content" placeholder="Content" required></textarea>
                    </div>
                    <div>
                      <label htmlFor="category">Select Category:</label>
                      <select id="category" name="category">
                        <option value="Social">Social</option>
                        <option value="Venting">Venting</option>
                        <option value="Advice">Advice</option>
                        <option value="Questions">Questions</option>
                      </select>
                    </div>
                    <button className={"create-post-button"} type="submit">Submit</button>
                  </form>
                </div>
              )} */}
            </div>
          }
        </div>
        <p>All posts are anonymous! Even if you are logged in, you can feel comfortable posting and commenting without people knowing it's you. You are free to disclose your name within your post or reply, but you don't have too!</p>
        <div className="body-posts">
          <div className="allforumCards">
            {posts.map((post, index) => (
              <div key={index} className="forumCard">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="forumCard-likeButton"
                >
                  <p>{post.likes}</p>
                  <img 
                    className="forumCard-likeIcon"
                    src={post.likedByUser ? "/img/filled-heart.png" : "/img/empty-heart.png"}
                    alt="Like"
                  />
                </button>
                <div className="forumCard-post-container">
                  <div className="textSection">
                    <div className="title-and-category">
                      <div className="category-icon">
                        {post.category === "Social" && <img src="/img/social-discussion-icon.png" alt="Social" />}
                        {post.category === "Venting" && <img src="/img/venting-discussion-icon.png" alt="Venting" />}
                        {post.category === "Advice" && <img src="/img/advice-discussion-icon.png" alt="Advice" />}
                        {post.category === "Questions" && <img src="/img/question-discussion-icon.png" alt="Questions" />}
                      </div>
                      <h3>{post.title}</h3>
                    </div>
                    <p>{post.content}</p>
                    <p>Posted on: {formatTimestamp(post.timestamp)}</p>
                  </div>
                  <div className="textSection-buttons">
                    <button 
                      onClick={() => toggleReplyBox(index)}
                      className={`textSection-replyButton ${post.showReplyBox ? 'active' : ''}`}
                    >
                      {post.showReplyBox ? "Cancel" : "Reply"}
                    </button>
                    {
                      post.replies && 
                      post.replies.length > 0 && 
                      (
                        <button 
                          onClick={() => toggleReplies(index)}
                          className={`textSection-showRepliesButton ${post.showReplies ? 'active' : ''}`}
                        >
                          {post.showReplies ? "Hide Replies" : "Show Replies"}
                        </button>
                      )
                    }
                  </div>
                </div>
                {post.showReplyBox && (
                    <div className="replyBox">
                      <textarea 
                        className="replyBox-textArea"
                        placeholder="  Type your reply..." 
                        onChange={(e) => setReplyContent(e.target.value)} // Capture reply content
                        value={replyContent} // Bind reply content to state
                      />
                      <button 
                        onClick={() => handleReply(post.id, replyContent, index)}
                        className="replyBox-submitButton"
                      >
                        Post Reply
                      </button>
                    </div>
                  )}
                { 
                  post.showReplies && 
                  post.replies &&
                  post.replies.map((reply, replyIndex) => (
                      <div 
                        key={replyIndex}
                        className="forumCard-reply-container"
                      >
                        <p>Reply: {reply.reply}</p>
                        <p>Posted at: {formatTimestamp(reply.timestamp)}</p>
                      </div>
                    ))
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscussionForumPage;
