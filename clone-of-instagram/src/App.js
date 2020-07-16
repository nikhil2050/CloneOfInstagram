import React from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post';

function App() {
  return (
    <div className="app">

      {/* Header - Logo Search  Home,Msg,Navigate,Notifications,Profile*/}
      <div className="app__header">
        <img 
            className="app_headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""></img>
      </div>
      
      {/* Posts */}
      <Post />

      {/* Posts */}
      
      {/* Footer */}
    </div>
  );
}

export default App;
