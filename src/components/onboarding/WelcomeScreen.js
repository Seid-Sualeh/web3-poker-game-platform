import React, { useState } from 'react'
import styled from 'styled-components'
import './WelcomeScreen.scss'

const WelcomeScreen = ({ onStartGame }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Welcome to Poker!',
      content: 'Experience the thrill of Texas Hold\'em poker with players from around the world.',
      icon: '🎰'
    },
    {
      title: 'Game Rules',
      content: 'Each player receives 2 private cards. 5 community cards are dealt face-up. Make the best 5-card hand to win!',
      icon: '🃏'
    },
    {
      title: 'Hand Rankings',
      content: 'Royal Flush > Straight Flush > Four of a Kind > Full House > Flush > Straight > Three of a Kind > Two Pair > One Pair > High Card',
      icon: '👑'
    },
    {
      title: 'Actions',
      content: 'FOLD: Give up your hand | CHECK: Pass without betting | CALL: Match the current bet | RAISE: Increase the bet',
      icon: '🎮'
    },
    {
      title: 'Ready to Play?',
      content: 'You\'ll start with 100,000 free chips. Good luck and have fun!',
      icon: '💰'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onStartGame()
    }
  }

  const handleSkip = () => {
    onStartGame()
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <button className="skip-btn" onClick={handleSkip}>
          Skip →
        </button>
        
        <div className="welcome-content">
          <div className="welcome-icon">{steps[currentStep].icon}</div>
          <h2>{steps[currentStep].title}</h2>
          <p>{steps[currentStep].content}</p>
        </div>

        <div className="welcome-progress">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>

        <div className="welcome-actions">
          {currentStep > 0 && (
            <button className="btn-secondary" onClick={handlePrev}>
              Previous
            </button>
          )}
          <button className="btn-primary" onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Start Playing' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
