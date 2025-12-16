import { useNavigate } from 'react-router-dom'
import './Intro.css'

function Intro() {
  const navigate = useNavigate()

  return (
    <div className="intro-container">
      <div className="header">
        <h1>🧠 Developer Type Assessment</h1>
        <p>Discover your coding instincts, trade-offs, and natural problem-solving style</p>
      </div>

      <div className="card">
        <div className="intro-content">
          <h2>What is this?</h2>
          <p>
            This is <strong>not</strong> a skills test. It's a psychological assessment designed to reveal 
            your instincts, default behaviors, and natural tendencies as a developer.
          </p>
          <p>
            Every question forces a trade-off - there are no objectively correct answers. 
            Your choices will reveal patterns that map to one of 12 developer archetypes.
          </p>

          <h2>What you'll discover:</h2>
          <ul>
            <li><strong>Your primary archetype</strong> - your core developer identity</li>
            <li><strong>Your secondary influence</strong> - the nuance in your style</li>
            <li><strong>Your natural tensions</strong> - competing instincts you balance</li>
            <li><strong>How you work best</strong> - solo, collaborative, fast, methodical</li>
          </ul>

          <h2>How it works:</h2>
          <ul>
            <li>20 questions, each with 4 choices</li>
            <li>Takes ~5 minutes</li>
            <li>Answer instinctively - your first reaction is usually most accurate</li>
            <li>Results feel scarily accurate</li>
          </ul>
        </div>

        <div className="button-group">
          <button className="btn-primary" onClick={() => navigate('/assessment')}>
            Start Assessment →
          </button>
          <button className="btn-secondary" onClick={() => navigate('/style-guide')}>
            View All Archetypes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Intro
