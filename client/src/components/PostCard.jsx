import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          <Link to={`/posts/${post._id}`} className="hover:text-blue-600 transition">
            {post.title}
          </Link>
        </h2>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <span>By {post.author.username}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <p className="text-gray-700 mb-4">
          {truncateContent(post.content)}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {post.tags?.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>❤️ {post.likes?.length || 0}</span>
            <span>💬 {post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;