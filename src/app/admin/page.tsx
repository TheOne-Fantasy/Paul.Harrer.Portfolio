'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import initialData from '../../data.json';
import styles from './admin.module.css';

export default function Admin() {
  const [data, setData] = useState(initialData);
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Récupérer la liste des images dans /public
    fetch('/api/images')
      .then(res => res.json())
      .then(setImages);
  }, []);

  const handleChange = (section: string, key: string, value: any, index?: number) => {
    const newData = { ...data };
    if (section === 'hero') {
      // @ts-ignore
      newData.hero = { ...newData.hero, [key]: value };
    } else if (section === 'bento' && typeof index === 'number') {
      // @ts-ignore
      newData.bento[index] = { ...newData.bento[index], [key]: value };
    } else if (section === 'about') {
        if (key === 'text') newData.about.text = value;
        if (key === 'image') newData.about.image = value;
        if (key === 'x') newData.about.x = parseInt(value) || 0;
        if (key === 'y') newData.about.y = parseInt(value) || 0;
        if (key === 'stats' && typeof index === 'number') {
           // On s'assure de garder la structure si on modifie une stat précise
           const statKey = value.type === 'label' ? 'label' : 'value';
           // @ts-ignore
           newData.about.stats[index][statKey] = value.val;
        }
    } else if (section === 'expertises' && typeof index === 'number') {
        if (key === 'projects' && typeof value === 'object') {
            // @ts-ignore
            newData.expertises[index].projects[value.projIndex][value.type] = value.val;
        } else {
            // @ts-ignore
            newData.expertises[index][key] = value;
        }
    }
    setData(newData);
  };

  const handleSave = async () => {
    setSaving(true);
    const response = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) alert('Site mis à jour !');
    setSaving(false);
  };

  return (
    <div className={styles.admin}>
      <div className={styles.adminHeader}>
        <h1>⚙️ Back Office Portfolio</h1>
        <Link href="/" className={styles.backButton}>← Revenir sur le site</Link>
      </div>
      
      <section className={styles.editSection}>
        <h2>Hero Content</h2>
        <label className={styles.label}>Kicker (Petit titre)</label>
        <input className={styles.inputField} value={data.hero.kicker} onChange={(e) => handleChange('hero', 'kicker', e.target.value)} />
        <label className={styles.label}>Titre Principal</label>
        <input className={styles.inputField} value={data.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} />
        <label className={styles.label}>Sous-titre</label>
        <textarea className={styles.inputField} rows={3} value={data.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} />
      </section>

      <section className={styles.editSection}>
        <h2>Bento Grid (Images & Recadrage)</h2>
        <div className={styles.gridEdit}>
          {data.bento.map((item, index) => (
            <div key={index} className={styles.bentoEdit}>
              <div 
                className={styles.miniPreview} 
                style={{ 
                  backgroundImage: `url('${item.image}')`, 
                  backgroundPosition: `${item.x}% ${item.y}%`, 
                  backgroundSize: 'cover' 
                }}
              />
              <div className={styles.controls}>
                <label>Photo</label>
                <select className={styles.inputField} value={item.image} onChange={(e) => handleChange('bento', 'image', e.target.value, index)}>
                  {images.map(img => (
                    <option key={img} value={img}>{img.replace('/', '')}</option>
                  ))}
                </select>

                <label>Légende</label>
                <input className={styles.inputField} value={item.label} onChange={(e) => handleChange('bento', 'label', e.target.value, index)} />
                
                <div className={styles.rangeRow}>
                  <div className={styles.rangeCol}>
                    <label>X: {item.x}%</label>
                    <input type="range" className={styles.rangeInput} min="0" max="100" value={item.x} onChange={(e) => handleChange('bento', 'x', parseInt(e.target.value), index)} />
                  </div>
                  <div className={styles.rangeCol}>
                    <label>Y: {item.y}%</label>
                    <input type="range" className={styles.rangeInput} min="0" max="100" value={item.y} onChange={(e) => handleChange('bento', 'y', parseInt(e.target.value), index)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.editSection}>
        <h2>Mes Expertises (Cards interactives)</h2>
        <div className={styles.expertisesEditGrid}>
          {data.expertises.map((exp, index) => (
            <div key={exp.id} className={styles.expertiseCardEdit}>
              <label className={styles.label}>Titre de l&apos;expertise</label>
              <input 
                className={styles.inputField} 
                value={exp.title} 
                onChange={(e) => handleChange('expertises', 'title', e.target.value, index)} 
              />
              <label className={styles.label}>Description courte</label>
              <textarea 
                className={styles.inputField} 
                rows={2}
                value={exp.description} 
                onChange={(e) => handleChange('expertises', 'description', e.target.value, index)} 
              />
              
              <label className={styles.label}>Exemples de projets</label>
              {exp.projects.map((proj, pIdx) => (
                <div key={pIdx} className={styles.projectRowEdit}>
                  <input 
                    className={styles.inputField} 
                    style={{marginBottom: '0.5rem', fontWeight: 'bold'}}
                    value={proj.name} 
                    placeholder="Nom du projet"
                    onChange={(e) => handleChange('expertises', 'projects', {projIndex: pIdx, type: 'name', val: e.target.value}, index)} 
                  />
                  <input 
                    className={styles.inputField} 
                    value={proj.detail} 
                    placeholder="Détail du projet"
                    onChange={(e) => handleChange('expertises', 'projects', {projIndex: pIdx, type: 'detail', val: e.target.value}, index)} 
                  />
                  <input 
                    className={styles.inputField} 
                    // @ts-ignore
                    value={proj.youtubeId || ''} 
                    placeholder="ID Vidéo YouTube (ex: DZuwGFZNKWY)"
                    onChange={(e) => handleChange('expertises', 'projects', {projIndex: pIdx, type: 'youtubeId', val: e.target.value}, index)} 
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.editSection}>
        <h2>Section About</h2>
        <div className={styles.bentoEdit}>
            <div 
              className={styles.miniPreview} 
              style={{ 
                backgroundImage: `url('${data.about.image}')`, 
                backgroundPosition: `${data.about.x}% ${data.about.y}%`, 
                backgroundSize: 'cover' 
              }}
            />
            <div className={styles.controls}>
              <label>Photo About</label>
              <select className={styles.inputField} value={data.about.image} onChange={(e) => handleChange('about', 'image', e.target.value)}>
                {images.map(img => (
                  <option key={img} value={img}>{img.replace('/', '')}</option>
                ))}
              </select>

              <div className={styles.rangeRow}>
                <div className={styles.rangeCol}>
                  <label>Recadrage X: {data.about.x}%</label>
                  <input type="range" className={styles.rangeInput} min="0" max="100" value={data.about.x} onChange={(e) => handleChange('about', 'x', e.target.value)} />
                </div>
                <div className={styles.rangeCol}>
                  <label>Recadrage Y: {data.about.y}%</label>
                  <input type="range" className={styles.rangeInput} min="0" max="100" value={data.about.y} onChange={(e) => handleChange('about', 'y', e.target.value)} />
                </div>
              </div>
            </div>
        </div>
        
        <label className={styles.label} style={{marginTop: '2rem'}}>Texte de présentation</label>
        <textarea className={styles.inputField} rows={4} value={data.about.text} onChange={(e) => handleChange('about', 'text', e.target.value)} />
        
        <label className={styles.label}>Statistiques</label>
        <div className={styles.statsEditGrid}>
          {data.about.stats.map((stat, i) => (
            <div key={i} className={styles.statRow}>
              <input 
                className={styles.inputField} 
                style={{marginBottom: 0}}
                value={stat.value} 
                onChange={(e) => handleChange('about', 'stats', {type: 'value', val: e.target.value}, i)} 
              />
              <input 
                className={styles.inputField} 
                style={{marginBottom: 0}}
                value={stat.label} 
                onChange={(e) => handleChange('about', 'stats', {type: 'label', val: e.target.value}, i)} 
              />
            </div>
          ))}
        </div>
      </section>

      <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
        {saving ? 'Enregistrement...' : 'Enregistrer les changements'}
      </button>

      <Link href="/" className={styles.backLink}>
        ← Revenir sur le site sans enregistrer
      </Link>
    </div>
  );
}
