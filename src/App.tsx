import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import { Layout, RouteGuard } from './components';


function App() {
  return (
    <MantineProvider>
      <AuthProvider>
      <div className="App">
      <Router>
          <Routes>
            <Route
              path="/*"
              element={
                <RouteGuard>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                    </Routes>
                  </Layout>
                </RouteGuard>
              }
            />
          </Routes>
          </Router>
      </div>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
