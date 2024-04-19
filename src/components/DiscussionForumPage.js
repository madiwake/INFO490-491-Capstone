import React, { useState } from "react";
import Navigation from './NavigationBar';
import Footer from "./Footer";

const DiscussionForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

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

  return (
    <div className="forumPage">
      <Navigation pageTitle={'Discussion'} />
      <div className="body">
        <div className="tagButtons">
          <button>All Posts</button>
          <button>Tag 1</button>
          <button>Tag 2</button>
          <button>Tag 3</button>
          <button>Tag 4</button>
        </div>
  
        {!showCreatePost && (
          <div>
            <button onClick={() => setShowCreatePost(true)}>Create a Post</button>
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
      <Footer className="footer" />
    </div>
  );  
};  

export default DiscussionForumPage;
