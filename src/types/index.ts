export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Post {
  id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  created_at: string;
  updated_at: string;
  likes_count?: number;
  comments_count?: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface UserProfile extends User {
  posts_count?: number;
  connections_count?: number;
  following_count?: number;
}