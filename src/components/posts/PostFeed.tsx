import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Post } from '../../types';
import PostCreator from './PostCreator';
import PostCard from './PostCard';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface PostFeedProps {
  onAuthorClick?: (authorId: string) => void;
}

export default function PostFeed({ onAuthorClick }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'recent' | 'trending'>('recent');

  const fetchPosts = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          users!posts_author_id_fkey(name, avatar_url)
        `);

      if (filter === 'recent') {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(50);

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        const formattedPosts = (data || []).map(post => ({
          ...post,
          author_name: post.users?.name || post.author_name,
          author_avatar: post.users?.avatar_url || post.author_avatar
        }));
        setPosts(formattedPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to new posts
    const subscription = supabase
      .channel('posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        setPosts(current => [payload.new as Post, ...current]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [filter]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="flex space-x-4">
                <div className="h-8 bg-gray-300 rounded-full w-20"></div>
                <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                <div className="h-8 bg-gray-300 rounded-full w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <PostCreator onPostCreated={() => fetchPosts()} />
      
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900">Feed</h2>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFilter('recent')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === 'recent'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === 'trending'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1 inline" />
              Trending
            </button>
          </div>
        </div>
        
        <button
          onClick={() => fetchPosts(true)}
          disabled={refreshing}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium hidden sm:inline">Refresh</span>
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">Be the first to share something with the community!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onAuthorClick={onAuthorClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}