import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [liking, setLiking] = useState(false);
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getPost(id);
      setPost(response.data);
    } catch (error) {
      setError('Post not found');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLiking(true);
      const response = await postsAPI.toggleLike(id);
      setPost(response.data);
    } catch (error) {
      console.error('Error toggling like:', error);
      alert(error.response?.data?.message || 'Failed to like post');
    } finally {
      setLiking(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    try {
      setCommenting(true);
      const response = await postsAPI.addComment(id, { text: commentText });
      setPost(response.data);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setCommenting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-lg text-gray-600 dark:text-gray-400">Loading post...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'The post you are looking for does not exist.'}</p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Posts
          </Link>

          {/* Post Content */}
          <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Featured Image */}
            {post.image && (
              <div className="w-full h-64 sm:h-80 lg:h-96">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Header */}
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {post.author.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{post.author.username}</span>
                </div>
                <span className="mx-2">•</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              </div>

              {/* Post Stats and Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                    <button 
                      onClick={handleLike}
                      disabled={liking}
                      className={`flex items-center space-x-2 transition-colors ${
                        user && post.likes?.some(like => like.toString() === user._id)
                          ? 'text-red-500 hover:text-red-600'
                          : 'hover:text-red-500'
                      } disabled:opacity-50`}
                    >
                      <span>{user && post.likes?.some(like => like.toString() === user._id) ? '❤️' : '🤍'}</span>
                      <span>{post.likes?.length || 0} likes</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500">💬</span>
                      <span>{post.comments?.length || 0} comments</span>
                    </div>
                  </div>
                </div>

                {/* Comment Form */}
                {user && (
                  <div className="mb-8">
                    <form onSubmit={handleAddComment} className="flex gap-3">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      />
                      <button
                        type="submit"
                        disabled={commenting || !commentText.trim()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {commenting ? 'Posting...' : 'Post'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Comments Section */}
                {post.comments && post.comments.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comments</h3>
                    {post.comments.map((comment, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex gap-3"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-medium">
                            {comment.user.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white text-sm">
                              {comment.user.username}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;