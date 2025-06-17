// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 AI Notes Summarizer</h1>

      <div style={styles.card}>
        <h2 style={styles.greeting}>
          Welcome{user ? `, ${user.email}` : ''}!
        </h2>

        <div style={styles.buttons}>
          <button style={styles.button} onClick={() => navigate('/upload')}>
            📤 Upload Notes
          </button>
          <button style={styles.button} onClick={() => alert('Coming soon')}>
            📂 My Summaries
          </button>
        </div>

        <button style={styles.logoutButton} onClick={handleLogout}>
          🔐 Logout
        </button>
      </div>

      <div style={styles.howItWorks}>
        <h3>ℹ️ How This App Works</h3>
        <ul>
          <li>Upload your notes in PDF or text format</li>
          <li>Our AI instantly summarizes the content</li>
          <li>View, categorize, and download your summaries as PDFs</li>
          <li>Your data is secure and private — protected with Firebase Auth</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '40px 20px',
    maxWidth: '900px',
    margin: 'auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.4rem',
    marginBottom: '30px',
    color: '#4b7bec',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  greeting: {
    marginBottom: '20px',
    color: '#333',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#4b7bec',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  logoutButton: {
    marginTop: '10px',
    backgroundColor: '#eb4d4b',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  howItWorks: {
    backgroundColor: '#f3f6fd',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'left',
    lineHeight: '1.6',
  },
};
