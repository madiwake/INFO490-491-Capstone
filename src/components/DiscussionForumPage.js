import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import NavigationBar from './NavigationBar';
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where, getDocs as getSubcollectionDocs, getDoc, setDoc } from "firebase/firestore";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DiscussionForumPage = (props) => {
  const [user] = useAuthState(props.auth);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const [replyContent, setReplyContent] = useState("");
  const [likedPosts, setLikedPosts] = useState([]); 

  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(props.auth, provider);
  };

  useEffect(() => {
    fetchData();
  }, [currentCategory, searchInput]);

  useEffect(() => {
    fetchLikedPosts();
  }, [user]);

  const fetchData = async () => {
    try {
      const postsQuerySnapshot = await getDocs(collection(props.firestore, 'forumposts'));
      const fetchedPosts = [];

      for (const postDoc of postsQuerySnapshot.docs) {
        const postData = postDoc.data();
        const repliesQuerySnapshot = await getDocs(query(collection(props.firestore, 'forumposts', postDoc.id, 'replies')));

        const replies = [];
        repliesQuerySnapshot.forEach(replyDoc => {
          replies.push({ id: replyDoc.id, ...replyDoc.data() });
        });

        fetchedPosts.push({
          id: postDoc.id,
          ...postData,
          showReplyBox: false,
          showReplies: false,
          replies: replies
        });
      }

      // Filter posts based on searchInput
      const filteredPosts = fetchedPosts.filter(post => {
        // Convert title/content to lowercase for case-insensitive search
        const title = post.title.toLowerCase();
        const content = post.content.toLowerCase();
        // Convert searchInput to lowercase
        const search = searchInput.toLowerCase();
        // Check if searchInput is present in either title or content
        return title.includes(search) || content.includes(search);
      });

      setPosts(filteredPosts); // Set filtered posts
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      if (user) {
        const userDocRef = doc(props.firestore, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.likedPosts) {
            setLikedPosts(userData.likedPosts);
          } else {
            setLikedPosts([]);
          }
        } else {
          await setDoc(userDocRef, { likedPosts: [] });
        }
      }
    } catch (error) {
      console.error("Error fetching liked posts: ", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleLike = async (postId) => {
    try {
      const postIndex = posts.findIndex(post => post.id === postId);
      const post = posts[postIndex];
  
      if (post) {
        if (likedPosts.includes(postId)) {
          // Unlike the post
          await updateDoc(doc(props.firestore, 'forumposts', postId), {
            likes: post.likes - 1
          });

          setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId)); // Remove postId from likedPosts
          // Update local state to reflect the unlike action
          setPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[postIndex].likes--; // Decrement likes
            updatedPosts[postIndex].likedByUser = false;
            return updatedPosts;
          });

          await updateDoc(doc(props.firestore, 'users', user.uid), {
            likedPosts: likedPosts.filter(id => id !== postId) // Remove postId from likedPosts in Firestore
          });
        } else {
          // Like the post
          await updateDoc(doc(props.firestore, 'forumposts', postId), {
            likes: post.likes + 1
          });

          setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]); // Add postId to likedPosts
          // Update local state to reflect the like action
          setPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[postIndex].likes++; // Increment likes
            updatedPosts[postIndex].likedByUser = true;
            return updatedPosts;
          });

          await updateDoc(doc(props.firestore, 'users', user.uid), {
            likedPosts: [...likedPosts, postId] // Add postId to likedPosts in Firestore
          });
        }
      }
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };  
  
  const handleReply = async (postId, replyContent, index) => {
    try {
      const postRef = doc(props.firestore, 'forumposts', postId);
      const timestamp = Date.now();
      const newReply = { reply: replyContent, timestamp };
      const replyDocRef = await addDoc(collection(postRef, 'replies'), newReply);
  
      setPosts(prevPosts => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index].replies.push({ id: replyDocRef.id, ...newReply });
        updatedPosts[index].showReplies = true;
        updatedPosts[index].showReplyBox = false;
        return updatedPosts;
      });
  
      setReplyContent("");
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
  };


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
          {user !== null &&
            <div>
              {!showCreatePost && (
                <div>
                  <button 
                    className="create-post-button"
                    onClick={() => navigate("/create-discussion-post")}
                  >
                    Create Post
                    <img src="./img/create-icon.png" alt="a blue plus icon"/>
                  </button>
                </div>
              )}
            </div>
          }
        </div>
        {user === null && <p className="forumNotice">You must be signed in to post.</p>}
        <p className="forumNotice anonNotice">All posts are anonymous!</p>
        <small className="forumNotice"> Even if you are logged in, you can feel comfortable posting and commenting without people knowing it's you. You are free to disclose your name within your post or reply, but you don't have too!</small>
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
                    src={likedPosts.includes(post.id) ? "/img/filled-heart.png" : "/img/empty-heart.png"}
                    alt="Like"
                  />
                </button>
                <div className="forumCard-post-container">
                  <div className="textSection">
                    <div className="forumCard-textSection-header-container">
                      <div className="forumCard-textSection-header">
                        <h3>{post.title}</h3>
                        <p className={`forumCard-categoryTag ${post.category}`}>{post.category}</p>
                      </div>
                      <small>Posted on: {formatTimestamp(post.timestamp)}</small>
                    </div>
                    <p>{post.content}</p>
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
                        onChange={(e) => setReplyContent(e.target.value)}
                        value={replyContent}
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