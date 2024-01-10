import React from 'react';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Main from './components/main';
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />
          <div className="general-content">
            <Sidebar />
            <Main />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App;
