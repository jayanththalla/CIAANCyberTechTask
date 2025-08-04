import React, { useState } from 'react';
import { Post } from '../../types';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Eye } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onAuthorClick?: (authorId: string) => void;
}

export default function PostCard({ post, onAuthorClick }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)}d`;
    return date.toLocaleDateString();
  };

  const truncateContent = (content: string, maxLength: number = 300) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const shouldTruncate = post.content.length > 300;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-all duration-200 hover:border-gray-300">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onAuthorClick?.(post.author_id)}
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <span className="text-white font-semibold text-lg">
              {post.author_name?.charAt(0).toUpperCase()}
            </span>
          </button>
          
          <div>
            <button
              onClick={() => onAuthorClick?.(post.author_id)}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 text-left block"
            >
              {post.author_name}
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{formatTimeAgo(post.created_at)}</span>
              <span>•</span>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
          {showFullContent || !shouldTruncate 
            ? post.content 
            : truncateContent(post.content)
          }
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors duration-200"
          >
            {showFullContent ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 group ${
              liked
                ? 'text-red-600 bg-red-50 hover:bg-red-100'
                : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''} group-hover:scale-110 transition-transform duration-200`} />
            <span className="text-sm font-medium">Like</span>
            {post.likes_count && post.likes_count > 0 && (
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                {post.likes_count}
              </span>
            )}
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 group">
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Comment</span>
            {post.comments_count && post.comments_count > 0 && (
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                {post.comments_count}
              </span>
            )}
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-all duration-200 group">
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
        
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-2 rounded-full transition-all duration-200 group ${
            bookmarked
              ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''} group-hover:scale-110 transition-transform duration-200`} />
        </button>
      </div>
    </div>
  );
}