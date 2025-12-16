import React from 'react'
import { useNavigate } from 'react-router-dom'
import archetypesData from '../../data/archetypes.json'
import './StyleGuide.css'

function StyleGuide() {
  const navigate = useNavigate()
  const archetypes = archetypesData.archetypes

  return (
    <div className="style-guide-container">
      <div className="header">
        <h1>🎨 Archetype Style Guide</h1>
        <p className="subtitle">Visual reference for all 12 developer archetypes</p>
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Assessment
        </button>
      </div>

      <div className="archetypes-grid">
        {archetypes.map((archetype) => (
          <div key={archetype.id} className="archetype-card">
            <div className="badge-display">
              <img 
                src={`/developertype/badges/${archetype.id}.jpg`} 
                alt={archetype.name}
                className="badge-img"
              />
            </div>
            <div className="archetype-info">
              <h3 className="archetype-title">{archetype.name}</h3>
              <p className="archetype-tagline">"{archetype.tagline}"</p>
              <p className="archetype-desc">{archetype.description}</p>
              <div className="archetype-meta">
                <span className="archetype-id">ID: {archetype.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StyleGuide
