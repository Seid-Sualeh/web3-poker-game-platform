import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import globalContext from './../../context/global/globalContext'
import LoadingScreen from '../../components/loading/LoadingScreen'
import WelcomeScreen from '../../components/onboarding/WelcomeScreen'
import ThemeToggle from '../../components/theme/ThemeToggle'

import socketContext from '../../context/websocket/socketContext'
import { CS_FETCH_LOBBY_INFO } from '../../pokergame/actions'
import './ConnectWallet.scss'

const ConnectWallet = () => {
  const { setWalletAddress, setChipsAmount } = useContext(globalContext)
   
  const { socket } = useContext(socketContext)
  const navigate = useNavigate()
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery()

  const [formData, setFormData] = useState({
    walletAddress: '',
    gameId: '',
    username: ''
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('poker-welcome-seen')
  })

  useEffect(() => {
    if(socket !== null && socket.connected === true){
      const walletAddress = query.get('walletAddress')
      const gameId = query.get('gameId')
      const username = query.get('username')
      if(walletAddress && gameId && username){
        console.log(username)
        setWalletAddress(walletAddress)
        socket.emit(CS_FETCH_LOBBY_INFO, { walletAddress, socketId: socket.id, gameId, username })
        console.log(CS_FETCH_LOBBY_INFO, { walletAddress, socketId: socket.id, gameId, username })
        navigate('/play')
      }
    }
  }, [socket])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { walletAddress, gameId, username } = formData
    
    if (!walletAddress || !gameId || !username) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all fields'
      })
      return
    }

    if (socket && socket.connected) {
      setIsConnecting(true)
      setWalletAddress(walletAddress)
      socket.emit(CS_FETCH_LOBBY_INFO, { walletAddress, socketId: socket.id, gameId, username })
      navigate('/play')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Socket not connected. Please wait and try again.'
      })
    }
  }

  const handleWelcomeComplete = () => {
    localStorage.setItem('poker-welcome-seen', 'true')
    setShowWelcome(false)
  }

  // Show welcome screen for first-time users
  if (showWelcome) {
    return <WelcomeScreen onStartGame={handleWelcomeComplete} />
  }

  // Show loading screen while socket is connecting
  if (!socket) {
    return <LoadingScreen />
  }

  return (
    <div className="connect-wallet-container">
      <div className="theme-toggle-wrapper">
        <ThemeToggle />
      </div>
      <div className="connect-wallet-form">
        <h2>🃏 Join Poker Game</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="walletAddress">Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleInputChange}
              placeholder="Enter your wallet address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gameId">Game ID</label>
            <input
              type="text"
              id="gameId"
              name="gameId"
              value={formData.gameId}
              onChange={handleInputChange}
              placeholder="Enter game ID (default: 1)"
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isConnecting}>
            {isConnecting ? 'Connecting...' : '🎮 Join Game'}
          </button>
        </form>
        <p className="form-hint">
          New players start with <strong>100,000 free chips!</strong>
        </p>
      </div>
    </div>
  )
}

export default ConnectWallet
