import React from "react";
import GlobalState from "./global/GlobalState";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import ModalProvider from "./modal/ModalProvider";
import theme from "../styles/theme";
import Normalize from "../styles/Normalize";
import GlobalStyles from "../styles/Global";
import { BrowserRouter } from "react-router-dom";
import WebSocketProvider from "./websocket/WebsocketProvider";
import GameState from "./game/GameState";
import { ThemeProvider } from "./theme/ThemeContext";
import { SoundProvider } from "./sound/SoundContext";

const Providers = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <SoundProvider>
        <StyledThemeProvider theme={theme}>
          <GlobalState>
            <ModalProvider>
              <WebSocketProvider>
                <GameState>
                  <Normalize />
                  <GlobalStyles />
                  {children}
                </GameState>
              </WebSocketProvider>
            </ModalProvider>
          </GlobalState>
        </StyledThemeProvider>
      </SoundProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default Providers;
