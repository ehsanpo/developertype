import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateResult, getCombinationSummary } from '../utils/scoring'
import './Results.css'

function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const answersJson = localStorage.getItem('assessment-answers')
    if (!answersJson) {
      navigate('/')
      return
    }

    const answers = JSON.parse(answersJson)
    
    setTimeout(() => {
      const calculatedResult = generateResult(answers)
      setResult(calculatedResult)
      setLoading(false)
    }, 1200)
  }, [navigate])

  const shareResults = () => {
    const text = `I just discovered my Developer Type: ${result.primary.name} 🧠\n\nFind yours at: ${window.location.origin}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Developer Type Assessment',
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Results copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="results-container">
        <div className="header">
          <h1>✨ Your Developer Type</h1>
        </div>
        <div className="loading">
          <h2>Analyzing your responses...</h2>
        </div>
      </div>
    )
  }

  if (!result) return null

  const combination = getCombinationSummary(result.primary.id, result.secondary.id)

  return (
    <div className="results-container">
      <div className="header">
        <h1>✨ Your Developer Type</h1>
      </div>

      <div className="card">
        <div className="badge-card">
          <div className="badge-image-container">
            <img 
              src={`/developertype/badges/${result.primary.id}.jpg`} 
              alt={result.primary.name}
              className="badge-image"
            />
            <div className="badge-label">Your Primary Type</div>
          </div>
          
          <div className="badge-content">
            <h2 className="archetype-name">{result.primary.name}</h2>
            <p className="archetype-tagline">"{result.primary.tagline}"</p>
            <p className="archetype-description">{result.primary.description}</p>
          </div>
        </div>
          <div className="score-bars">
          <div className="score-bar">
            <div className="score-label">
              <span>Primary Archetype Match</span>
              <span>{result.primary.percentage}% match</span>
            </div>
            <div className="score-track">
              <div className="score-fill" style={{ width: `${result.primary.percentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="grid">
            <div className="section">
            <h3>🎯 Core Traits</h3>
            <ul>
                {result.primary.traits.map((trait, i) => (
                <li key={i}>{trait}</li>
                ))}
            </ul>
            </div>

            <div className="section">
            <h3>💪 Your Strengths</h3>
            <ul>
                {result.primary.strengths.map((strength, i) => (
                <li key={i}>{strength}</li>
                ))}
            </ul>
            </div>


        </div>


        <div className="section">
          <h3>⚠️ Watch Out For</h3>
          <ul>
            {result.primary.challenges.map((challenge, i) => (
              <li key={i}>{challenge}</li>
            ))}
          </ul>
        </div>

      
      </div>

      <div className="combination-summary">
        <p><strong>Your Unique Blend:</strong> {combination}</p>
      </div>

      <div className="card secondary-archetype">
        <div className="badge-card">
          <div className="badge-image-container">
            <img 
              src={`/developertype/badges/${result.secondary.id}.jpg`} 
              alt={result.secondary.name}
              className="badge-image"
            />
            <div className="badge-label secondary">Secondary Influence</div>
          </div>
          
          <div className="badge-content">
            <h2 className="archetype-name">{result.secondary.name}</h2>
            <p className="archetype-tagline">"{result.secondary.tagline}"</p>
            <p className="archetype-description">{result.secondary.description}</p>
          </div>
        </div>
        
        <div className="score-bars">
          <div className="score-bar">
            <div className="score-label">
              <span>Secondary Archetype Match</span>
              <span>{result.secondary.percentage}% match</span>
            </div>
            <div className="score-track">
              <div className="score-fill secondary-fill" style={{ width: `${result.secondary.percentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>🎯 Additional Traits</h3>
          <ul>
            {result.secondary.traits.slice(0, 3).map((trait, i) => (
              <li key={i}>{trait}</li>
            ))}
          </ul>
        </div>

      </div>

      {(result.insights.tensions.length > 0 || result.insights.traits.length > 0) && (
        <div className="card insights-card">
          <div className="section">
            <h3>🔍 Your Unique Patterns</h3>
            {result.insights.workStyle && (
              <div className="insight-item">
                <h4>Work Style: {result.insights.workStyle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                <p>{result.insights.traits.join('. ')}</p>
              </div>
            )}
            {result.insights.tensions.map((tension, i) => (
              <div className="insight-item" key={i}>
                <h4>Creative Tension</h4>
                <p>{tension.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="actions">
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Take Again
          </button>
          <button className="btn-primary" onClick={shareResults}>
            Share Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
