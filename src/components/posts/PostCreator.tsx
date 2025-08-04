import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Send, Image, Video, Calendar } from 'lucide-react';

interface PostCreatorProps {
  onPostCreated: () => void;
}

export default function PostCreator({ onPostCreated }: PostCreatorProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('posts').insert({
        content: content.trim(),
        author_id: user.id,
        author_name: user.name,
        author_avatar: user.avatar_url
      });

      if (!error) {
        setContent('');
        onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening in your professional world? Share your insights..."
              className="w-full resize-none border-none focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 text-lg leading-relaxed"
              rows={4}
              maxLength={1000}
            />
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="hidden sm:flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <Image className="w-5 h-5" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                >
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-orange-600 transition-colors duration-200"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Event</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline text-sm text-gray-400">
                  {content.length}/1000
                </span>
                
                <button
                  type="submit"
                  disabled={!content.trim() || loading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{loading ? 'Posting...' : 'Post'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}