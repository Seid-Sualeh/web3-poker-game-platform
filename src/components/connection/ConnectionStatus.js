import React, { useContext } from "react";
import socketContext from "../../context/websocket/socketContext";
import "./ConnectionStatus.scss";

const ConnectionStatus = () => {
  const { connectionStatus, reconnectAttempts, reconnect } =
    useContext(socketContext);

  const statusConfig = {
    connected: {
      color: "#4ade80",
      icon: "●",
      text: "Connected",
      showReconnect: false,
    },
    connecting: {
      color: "#fbbf24",
      icon: "◐",
      text: "Connecting...",
      showReconnect: false,
    },
    reconnecting: {
      color: "#fbbf24",
      icon: "↻",
      text: `Reconnecting (${reconnectAttempts}/5)...`,
      showReconnect: false,
    },
    disconnected: {
      color: "#ef4444",
      icon: "○",
      text: "Disconnected",
      showReconnect: true,
    },
    error: {
      color: "#ef4444",
      icon: "⚠",
      text: "Connection Error",
      showReconnect: true,
    },
    timeout: {
      color: "#ef4444",
      icon: "⏱",
      text: "Connection Timeout",
      showReconnect: true,
    },
    failed: {
      color: "#ef4444",
      icon: "✕",
      text: "Connection Failed",
      showReconnect: true,
    },
  };

  const currentStatus =
    statusConfig[connectionStatus] || statusConfig.disconnected;

  return (
    <div className={`connection-status ${connectionStatus}`}>
      <span className="status-icon" style={{ color: currentStatus.color }}>
        {currentStatus.icon}
      </span>
      <span className="status-text">{currentStatus.text}</span>
      {currentStatus.showReconnect && (
        <button className="reconnect-btn" onClick={reconnect}>
          Reconnect
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;
