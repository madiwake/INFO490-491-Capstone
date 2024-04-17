import React, { useState } from "react";
import Navigation from './NavigationBar';

const DiscussionForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Function to format timestamp into readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const timestamp = Date.now(); // Current timestamp
    const newPost = { title, content, replies: [], showReplyBox: false, showReplies: false, voted: null, upvotes: 0, downvotes: 0, timestamp };
    setPosts(prevPosts => [...prevPosts, newPost]);
    e.target.reset();
    setShowCreatePost(false);
  };
  
  const handleReply = (index, reply) => {
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      const timestamp = Date.now(); // Current timestamp
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

  const handleVote = (index, type) => {
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      if (updatedPosts[index].voted === type) {
        updatedPosts[index][type === "upvotes" ? "upvotes" : "downvotes"] -= 1;
        updatedPosts[index].voted = null;
      } else {
        if (type === "upvotes") {
          updatedPosts[index].upvotes += 1;
          if (updatedPosts[index].voted === "downvotes") {
            updatedPosts[index].downvotes -= 1;
          }
        } else {
          updatedPosts[index].downvotes += 1;
          if (updatedPosts[index].voted === "upvotes") {
            updatedPosts[index].upvotes -= 1;
          }
        }
        updatedPosts[index].voted = type;
      }
      return updatedPosts;
    });
  };

  return (
    <div className="discussionForumPage">
      <Navigation pageTitle={'Discussion'} />
      <div>
        {!showCreatePost && (
          <button onClick={() => setShowCreatePost(true)}>Create a Post</button>
        )}
        {showCreatePost && (
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" name="title" placeholder="Title" required />
            </div>
            <div>
              <textarea name="content" placeholder="Content" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
        <div>
          {posts.map((post, index) => (
            <div key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Posted at: {formatTimestamp(post.timestamp)}</p> {/* Display post timestamp */}
              <button onClick={() => handleVote(index, "upvotes")}>
                <img src={post.voted === "upvotes" ? '/img/thumbs-up-black.png' : '/img/thumbs-up-clear.png'} alt="Upvote" />
              </button>
              <span>{post.upvotes}</span>
              <button onClick={() => handleVote(index, "downvotes")}>
                <img src={post.voted === "downvotes" ? '/img/thumbs-down-black.png' : '/img/thumbs-down-clear.png'} alt="Downvote" />
              </button>
              <span>{post.downvotes}</span>
              {post.showReplyBox && (
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
              )}
              {!post.showReplyBox && (
                <button onClick={() => toggleReplyBox(index)}>Reply</button>
              )}
              {post.showReplies && post.replies.map((reply, replyIndex) => (
                <div key={replyIndex}>
                  <p>Reply: {reply.reply}</p>
                  <p>Posted at: {formatTimestamp(reply.timestamp)}</p> {/* Display reply timestamp */}
                </div>
              ))}
              {post.replies.length > 0 && (
                <button onClick={() => toggleReplies(index)}>
                  {post.showReplies ? "Hide Replies" : "Show Replies"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionForumPage;