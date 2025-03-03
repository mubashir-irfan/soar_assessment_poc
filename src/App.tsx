import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Layout, RouteGuard } from './components';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';
import Dashboard from './Dashboard/Dashboard';
import Settings from './Settings/Settings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnReconnect: false,
      staleTime: 0,
    },
  },
});

function App() {
  const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ThemeProvider>
          <I18nProvider>
            <div className="App">
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route
                      path="/*"
                      element={
                        <RouteGuard>
                          <Layout>
                            <VercelAnalytics />
                            <VercelSpeedInsights />
                            <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/settings" element={<Settings />} />
                            </Routes>
                          </Layout>
                        </RouteGuard>
                      }
                    />
                  </Routes>
                </AuthProvider>
              </Router>
            </div>
          </I18nProvider>
        </ThemeProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
