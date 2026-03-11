'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin/admin.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // On envoie le mot de passe à une petite API qu'on va créer
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Mot de passe incorrect ❌');
    }
  };

  return (
    <div className={styles.admin} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', background: '#fff', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
        <h1 style={{ marginBottom: '1rem' }}>🔐 Accès Restreint</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Veuillez entrer le mot de passe pour accéder au Back Office.</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            className={styles.inputField} 
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ textAlign: 'center' }}
          />
          {error && <p style={{ color: '#ff5c35', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          <button type="submit" className={styles.saveBtn} style={{ marginTop: '0' }}>
            Se connecter
          </button>
        </form>
        
        <a href="/" style={{ display: 'block', marginTop: '2rem', color: '#aaa', textDecoration: 'none', fontSize: '0.8rem' }}>
          ← Retour au site
        </a>
      </div>
    </div>
  );
}
