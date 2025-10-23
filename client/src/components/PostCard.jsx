import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 group">
      {post.image && (
        <div className="overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          <Link to={`/posts/${post._id}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {post.author?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <span className="font-medium">{post.author?.username || 'Unknown'}</span>
          </div>
          <span className="mx-1">•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
          {truncateContent(post.content)}
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
            {post.tags?.length > 3 && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-medium">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <button className="hover:text-red-500 transition-colors">
                ❤️
              </button>
              <span>{post.likes?.length || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-blue-500">💬</span>
              <span>{post.comments?.length || 0}</span>
            </div>
          </div>
        </div>

        <Link 
          to={`/posts/${post._id}`}
          className="mt-6 inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors group/link"
        >
          Read more
          <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;