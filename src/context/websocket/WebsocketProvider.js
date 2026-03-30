import React, { useState, useEffect, useContext, useCallback, useRef } from 'react'
import SocketContext from './socketContext'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import {
  CS_DISCONNECT,
  CS_FETCH_LOBBY_INFO,
  SC_PLAYERS_UPDATED,
  SC_RECEIVE_LOBBY_INFO,
  SC_TABLES_UPDATED,
} from '../../pokergame/actions'
import globalContext from '../global/globalContext'
import config from '../../clientConfig'

const WebSocketProvider = ({ children }) => {
  const { setTables, setPlayers, setChipsAmount } = useContext(globalContext)
  const navigate = useNavigate()

  const [socket, setSocket] = useState(null)
  const [socketId, setSocketId] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  
  const reconnectTimeoutRef = useRef(null)
  const maxReconnectAttempts = 5

  const cleanUp = useCallback(() => {
    if (window.socket) {
      window.socket.emit(CS_DISCONNECT)
      window.socket.close()
    }
    setSocket(null)
    setSocketId(null)
    setPlayers(null)
    setTables(null)
    setConnectionStatus('disconnected')
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
  }, [setPlayers, setTables])

  const connect = useCallback(() => {
    setConnectionStatus('connecting')
    
    const newSocket = io(config.socketURI, {
      transports: ['websocket'],
      upgrade: false,
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    })

    registerCallbacks(newSocket)
    window.socket = newSocket
    return newSocket
  }, [])

  const registerCallbacks = useCallback((socket) => {
    socket.on('connect', () => {
      console.log('Socket connected')
      setSocket(socket)
      setConnectionStatus('connected')
      setReconnectAttempts(0)
    })

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error)
      setConnectionStatus('error')
    })

    socket.on('connect_timeout', () => {
      console.error('Connection timeout')
      setConnectionStatus('timeout')
    })

    socket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected after', attemptNumber, 'attempts')
      setConnectionStatus('connected')
      setReconnectAttempts(0)
    })

    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('Reconnection attempt', attemptNumber)
      setConnectionStatus('reconnecting')
      setReconnectAttempts(attemptNumber)
    })

    socket.on('reconnect_failed', () => {
      console.error('Reconnection failed')
      setConnectionStatus('failed')
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
      setConnectionStatus('disconnected')
      
      // Auto-reconnect for certain disconnect reasons
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        setTimeout(() => {
          connect()
        }, 1000)
      }
    })

    socket.on(SC_RECEIVE_LOBBY_INFO, ({ tables, players, socketId, amount }) => {
      console.log(SC_RECEIVE_LOBBY_INFO, tables, players, socketId)
      setSocketId(socketId)
      setChipsAmount(amount)
      setTables(tables)
      setPlayers(players)
    })
    
    socket.on(SC_PLAYERS_UPDATED, (players) => {
      console.log(SC_PLAYERS_UPDATED, players)
      setPlayers(players)
    })

    socket.on(SC_TABLES_UPDATED, (tables) => {
      console.log(SC_TABLES_UPDATED, tables)
      setTables(tables)
    })
  }, [connect, setChipsAmount, setPlayers, setTables])

  useEffect(() => {
    window.addEventListener('beforeunload', cleanUp)
    window.addEventListener('beforeclose', cleanUp)
    
    return () => {
      cleanUp()
      window.removeEventListener('beforeunload', cleanUp)
      window.removeEventListener('beforeclose', cleanUp)
    }
  }, [cleanUp])

  useEffect(() => {
    console.log('socket context')
    if (!socket) {
      connect()
    }
    
    return () => cleanUp()
  }, [])

  // Manual reconnect function
  const reconnect = useCallback(() => {
    cleanUp()
    setTimeout(() => {
      connect()
    }, 500)
  }, [cleanUp, connect])

  return (
    <SocketContext.Provider value={{ 
      socket, 
      socketId, 
      cleanUp,
      connectionStatus,
      reconnectAttempts,
      reconnect
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export default WebSocketProvider
