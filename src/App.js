import React, { useState } from "react";

const TaxEngineApp = () => {
  const [user, setUser] = useState(null);

  const mockLogin = () => {
    setUser({
      id: "123",
      email: "user@example.com", 
      name: "John Taxpayer",
    });
  };

  const logout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          padding: '40px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '28px'
            }}>
              📄
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#111827',
              margin: '0 0 8px 0'
            }}>
              Tax Engine
            </h1>
            <p style={{
              color: '#6b7280',
              margin: '0',
              fontSize: '16px'
            }}>
              Automated Tax Document Processing
            </p>
          </div>

          <button
            onClick={mockLogin}
            style={{
              width: '100%',
              background: '#2563eb',
              color: 'white',
              padding: '14px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '24px',
              transition: 'background 0.3s'
            }}
          >
            Sign In with Mock Account
          </button>

          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '500' }}>Demo Features:</p>
            <ul style={{ 
              listStyle: 'none', 
              padding: '0', 
              margin: '0',
              textAlign: 'left'
            }}>
              <li style={{ padding: '4px 0' }}>• Upload W-2 and 1099 documents</li>
              <li style={{ padding: '4px 0' }}>• Automated data extraction</li>
              <li style={{ padding: '4px 0' }}>• 1040 form generation</li>
              <li style={{ padding: '4px 0' }}>• JSON and PDF downloads</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <header style={{
        background: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '28px', marginRight: '12px' }}>📄</span>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827',
              margin: '0'
            }}>
              Tax Engine
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              <span style={{ marginRight: '8px', fontSize: '16px' }}>👤</span>
              {user.name}
            </div>
            <button
              onClick={logout}
              style={{
                color: '#9ca3af',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '8px'
              }}
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 24px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '16px'
        }}>
          Welcome to Tax Engine, {user.name}! 🎉
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '18px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Your tax processing application is ready. The full upload and processing features will be added next!
        </p>
      </div>
    </div>
  );
};

function App() {
  return <TaxEngineApp />;
}

export default App;
