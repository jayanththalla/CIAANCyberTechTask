# ConnectHub - Professional Community Platform

A modern, production-ready LinkedIn-like community platform built with React, TypeScript, and Supabase. Connect with professionals, share insights, and grow your network in a beautiful, responsive interface.

![ConnectHub Preview](https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🚀 Live Demo

**Live Demo URL:** [https://connecthub-community.netlify.app](https://connecthub-community.netlify.app)

**GitHub Repository:** [https://github.com/yourusername/connecthub-platform](https://github.com/yourusername/connecthub-platform)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Lightning-fast build tool and development server
- **Lucide React** - Beautiful, customizable icons

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **PostgreSQL** - Robust relational database with advanced features
- **Row Level Security (RLS)** - Database-level security policies
- **Real-time Subscriptions** - Live updates for posts and interactions

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure email/password registration and login
- 👤 **Rich User Profiles** - Customizable profiles with bio, avatar, and statistics
- 📝 **Post Creation & Management** - Create, edit, and delete text posts
- 🏠 **Real-time Feed** - Live updates with author names and timestamps
- 👥 **Profile Discovery** - View any user's profile and their posts
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop

### Advanced Features
- 🔄 **Real-time Updates** - Live post feed with Supabase subscriptions
- 🎨 **Modern UI/UX** - LinkedIn-inspired design with smooth animations
- 🔍 **Search Functionality** - Search for users and content (UI ready)
- 📊 **User Statistics** - Post counts, connections, and following metrics
- 💬 **Interactive Elements** - Like, comment, and share buttons (UI ready)
- 🔒 **Security First** - Row Level Security and proper authentication
- ⚡ **Performance Optimized** - Efficient queries and state management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/connecthub-platform.git
   cd connecthub-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run database migrations**
   - In your Supabase dashboard, go to SQL Editor
   - Run the migration files in order:
     - `supabase/migrations/create_users_table.sql`
     - `supabase/migrations/create_posts_table.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Create an account and start connecting!

## 🗄️ Database Schema

### Users Table
```sql
- id (uuid, primary key)
- email (text, unique)
- name (text)
- bio (text, optional)
- avatar_url (text, optional)
- created_at (timestamp)
- updated_at (timestamp)
```

### Posts Table
```sql
- id (uuid, primary key)
- content (text)
- author_id (uuid, foreign key to users)
- author_name (text)
- author_avatar (text, optional)
- created_at (timestamp)
- updated_at (timestamp)
```

## 👥 Demo Users

Create your own account to get started! The platform supports:
- **Email/Password Registration** - Secure account creation
- **Profile Customization** - Add your bio and professional information
- **Instant Posting** - Share your thoughts immediately after signup

## 🎯 Usage Examples

### Creating a Post
1. Log in to your account
2. Use the post creator at the top of the feed
3. Write your content (up to 1000 characters)
4. Click "Post" to share with the community

### Viewing Profiles
1. Click on any author's name or avatar in the feed
2. View their profile information and post history
3. Use the "Connect" button to send connection requests (UI ready)

### Editing Your Profile
1. Click on your avatar in the top navigation
2. Select "View Profile" from the dropdown
3. Click "Edit Profile" to update your information

## 🚀 Deployment

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard
4. Enable form handling for contact features

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in project settings
3. Deploy automatically on every push

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Configuration
- Enable Row Level Security on all tables
- Set up authentication providers as needed
- Configure email templates for user verification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - For providing an excellent backend-as-a-service platform
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon set
- **Pexels** - For high-quality stock photos

## 📞 Support

For support, email support@connecthub.com or join our community Discord server.

---

**Built with ❤️ by the ConnectHub Team**

*ConnectHub - Where professionals connect, share, and grow together.*"# CIAANCyberTechTask" 
