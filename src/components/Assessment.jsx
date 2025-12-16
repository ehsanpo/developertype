import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import questionsData from '../../data/questions.json'
import './Assessment.css'

function Assessment() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = questionsData.questions
  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const selectAnswer = (questionId, answerId) => {
    const newAnswers = { ...answers, [questionId]: answerId }
    setAnswers(newAnswers)
    
    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        localStorage.setItem('assessment-answers', JSON.stringify(newAnswers))
        navigate('/results')
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 300)
  }

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      localStorage.setItem('assessment-answers', JSON.stringify(answers))
      navigate('/results')
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <div className="assessment-container">
      <div className="header">
        <h1>🧠 Developer Type Assessment</h1>
      </div>

      <div className="card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <div className="question">
          <h2>{question.question}</h2>
          <div className="answers">
            {question.answers.map((answer) => (
              <div
                key={answer.id}
                className={`answer ${answers[question.id] === answer.id ? 'selected' : ''}`}
                onClick={() => selectAnswer(question.id, answer.id)}
              >
                {answer.text}
              </div>
            ))}
          </div>
        </div>

        <div className="nav-buttons">
          <button
            className="btn-secondary"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>
          <button
            className="btn-primary"
            onClick={nextQuestion}
            disabled={!answers[question.id]}
          >
            {currentQuestion === questions.length - 1 ? 'View Results →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Assessment
