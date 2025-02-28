import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Layout, RouteGuard } from './components';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext'; // Import I18nProvider
import Dashboard from './Dashboard/Dashboard';
import Settings from './Settings/Settings';

function App() {
  const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <I18nProvider>
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
                          <Route path="/dashboard" element={<Dashboard />} /> {/* Added this line */}
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </Layout>
                    </RouteGuard>
                  }
                />
              </Routes>
            </Router>
          </div>
        </I18nProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
