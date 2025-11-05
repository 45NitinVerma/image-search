import React from 'react';

const LoginPage = () => {
  // These URLs must point to your backend server
  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };
  const githubLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };
  const facebookLogin = () => {
    window.location.href = 'http://localhost:5000/auth/facebook';
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome to ImageSearch</h2>
        <p>Please log in to continue</p>
        <button onClick={googleLogin} className="login-button google">
          Login with Google
        </button>
        <button onClick={githubLogin} className="login-button github">
          Login with GitHub
        </button>
        <button onClick={facebookLogin} className="login-button facebook">
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginPage;