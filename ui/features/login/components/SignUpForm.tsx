"use client";
import React, { useState } from 'react';

interface SignUpFormProps {
  onSuccess?: () => void;
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  profilePictureUrl: '',
};

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!form.firstName || !form.lastName) {
      setError('Please enter your name');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      // Build payload matching API
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        gender: form.gender,
        profilePictureUrl: form.profilePictureUrl,
      };

      const res = await fetch('https://api.domrov.app/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Signup failed');
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <aside style={leftPanelStyle}>
        <div style={sideLogoStyle}>DOMROV</div>
      </aside>

      <main style={mainStyle}>
        <div style={cardStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={fieldWrapStyle}>
                <label style={labelStyle}>Last Name</label>
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldWrapStyle}>
                <label style={labelStyle}>First Name</label>
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Gender</label>
              <input name="gender" placeholder="Male / Female" value={form.gender} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Email</label>
              <input name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required type="email" style={inputStyle} />
            </div>

            <div style={fieldWrapStyle}>
              <label style={labelStyle}>Profile Picture URL</label>
              <input name="profilePictureUrl" placeholder="https://example.com/avatar.jpg" value={form.profilePictureUrl} onChange={handleChange} type="url" style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={fieldWrapStyle}>
                <label style={labelStyle}>Password</label>
                <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required type="password" style={inputStyle} />
              </div>
              <div style={fieldWrapStyle}>
                <label style={labelStyle}>Confirm Password</label>
                <input name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required type="password" style={inputStyle} />
              </div>
            </div>

            {error && <div style={{ color: '#cc3333', marginTop: 8 }}>{error}</div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <a href="/login" style={{ color: '#333', textDecoration: 'none' }}>← Back to login</a>
              <button type="submit" disabled={loading} style={primaryButtonStyle}>{loading ? 'Saving...' : 'Next'}</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

/* Styles */
const pageStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  background: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
};

const leftPanelStyle: React.CSSProperties = {
  width: 280,
  height: 560,
  background: '#0b0b3a',
  color: '#fff',
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const sideLogoStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 800,
  letterSpacing: 2,
};

const mainStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  width: 500,
};

const cardStyle: React.CSSProperties = {
  width: 500,
  height: 560,
  background: '#fff',
  borderRadius: 8,
  padding: 24,
  boxShadow: '0 6px 24px rgba(10,10,10,0.12)',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  overflowY: 'auto',
};

const brandStyle: React.CSSProperties = {
  fontSize: 48,
  fontWeight: 800,
  color: '#0b0b3a',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: 16,
  color: '#666',
  marginTop: 4,
  marginBottom: 8,
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginTop: 8,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#666',
  marginBottom: 6,
};

const labelStyleSmall: React.CSSProperties = {
  fontSize: 11,
  color: '#9aa0a6',
  marginBottom: 6,
};

const fieldWrapStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle: React.CSSProperties = {
  padding: '14px 16px',
  borderRadius: 10,
  border: '1px solid #e6e6e6',
  fontSize: 14,
  color: '#222',
  outline: 'none',
  boxShadow: 'none',
};

const smallInputStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #e6e6e6',
  width: '100%',
  fontSize: 13,
  color: '#222',
};

const primaryButtonStyle: React.CSSProperties = {
  background: '#012b2b',
  color: '#fff',
  padding: '10px 22px',
  borderRadius: 20,
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
};