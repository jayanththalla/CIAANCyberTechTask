import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForms from './components/auth/AuthForms';
import Header from './components/layout/Header';
import PostFeed from './components/posts/PostFeed';
import ProfileView from './components/profile/ProfileView';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading ConnectHub...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForms />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView} 
        onViewChange={(view) => {
          setCurrentView(view);
          if (view !== 'profile') {
            setSelectedUserId(null);
          }
        }} 
      />
      
      <main className="pt-6">
        {currentView === 'home' && (
          <PostFeed 
            onAuthorClick={(authorId) => {
              setSelectedUserId(authorId);
              setCurrentView('profile');
            }}
          />
        )}
        {currentView === 'profile' && (
          <ProfileView 
            userId={selectedUserId} 
            onBack={() => {
              setCurrentView('home');
              setSelectedUserId(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;