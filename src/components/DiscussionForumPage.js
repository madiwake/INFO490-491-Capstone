import React, { useState } from "react";
import Navigation from './NavigationBar';
import Footer from "./Footer";

const DiscussionForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const timestamp = Date.now();
    const newPost = { title, content, replies: [], showReplyBox: false, showReplies: false, voted: null, upvotes: 0, downvotes: 0, timestamp };
    setPosts(prevPosts => [...prevPosts, newPost]);
    e.target.reset();
    setShowCreatePost(false);
  };
  
  const handleReply = (index, reply) => {
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      const timestamp = Date.now();
      updatedPosts[index].replies.push({ reply, timestamp });
      return updatedPosts;
    });
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
    event.preventDefault();
    setSearchInput(event.target.value);
  }

  return (
    <div className="forumPage">
      <Navigation pageTitle={'Discussion'} />
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
              onClick={() => {setCurrentCategory("All")}}
            >
                <img 
                  src="./img/general-discussion-icon.png"
                  alt="three stick figures. two of them have comment boxes floating above their heads" 
                />
                <p>All Posts</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => {setCurrentCategory("Social")}}
            >
              <img 
                src="./img/social-discussion-icon.png" 
                alt="two stick figures"
              />
              <p>Social</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => {setCurrentCategory("Venting")}}
            >
              <img 
                src="./img/venting-discussion-icon.png" 
                alt="one stick figure with sound waves coming from their head"
              />
              <p>Venting</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => {setCurrentCategory("Advice")}}
            >
              <img 
                src="./img/advice-discussion-icon.png" 
                alt="two stick figure heads with lines connecting them to form a circle"
              />
              <p>Advice</p>
            </button>
            <button 
              className="singleTagButton" 
              onClick={() => {setCurrentCategory("Questions")}}
            >
              <img 
                src="./img/question-discussion-icon.png" 
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
        </div>
        <div className="body-posts">
          {!showCreatePost && (
            <div>
              <button className={"create-post-button"} onClick={() => setShowCreatePost(true)}>Create a Post</button>
            </div>
          )}
    
          {showCreatePost && (
            <div className="input">
              <form onSubmit={handleSubmit}>
                <div>
                  <input type="text" name="title" placeholder="Title" required />
                </div>
                <div>
                  <textarea name="content" placeholder="Content" required></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
    
          <div className="allforumCards">
            {posts.map((post, index) => (
              <div key={index} className="forumCard">
                <div className="textSection">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p>Posted at: {formatTimestamp(post.timestamp)}</p>
                </div>
                <div className="buttonGroup">
                  {post.showReplyBox && (
                    <div>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const reply = e.target.reply.value;
                        handleReply(index, reply);
                        toggleReplyBox(index);
                        e.target.reset();
                      }}>
                        <input type="text" name="reply" placeholder="Your reply" required />
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  )}

                  {!post.showReplyBox && (
                    <div>
                      <button onClick={() => toggleReplyBox(index)}>Reply</button>
                    </div>
                  )}

                  {post.replies.length > 0 && (
                    <div>
                      <button onClick={() => toggleReplies(index)}>
                        {post.showReplies ? "Hide Replies" : "Show Replies"}
                      </button>
                    </div>
                  )}
                </div>

                {post.showReplies && post.replies.map((reply, replyIndex) => (
                  <div key={replyIndex}>
                    <p>Reply: {reply.reply}</p>
                    <p>Posted at: {formatTimestamp(reply.timestamp)}</p>
                  </div>
                ))}
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
