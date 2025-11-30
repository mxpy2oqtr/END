import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Layout from '../Layout.js';
import Dashboard from '../Pages/Dashboard.jsx';
import Activities from '../Pages/Activities.jsx';
import Nutrition from '../Pages/Nutrition.jsx';
import Sleep from '../Pages/Sleep.jsx';
import Hydration from '../Pages/Hydration.jsx';
import Goals from '../Pages/Goals.jsx';
import Progress from '../Pages/Progress.jsx';
import Reminders from '../Pages/Reminders.jsx';
import Chat from '../Pages/Chat.jsx';
import Settings from '../Pages/Settings.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function createPageUrl(pageName) {
  return `/${pageName.toLowerCase()}`;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
          <Route path="/activities" element={<Layout currentPageName="Activities"><Activities /></Layout>} />
          <Route path="/nutrition" element={<Layout currentPageName="Nutrition"><Nutrition /></Layout>} />
          <Route path="/sleep" element={<Layout currentPageName="Sleep"><Sleep /></Layout>} />
          <Route path="/hydration" element={<Layout currentPageName="Hydration"><Hydration /></Layout>} />
          <Route path="/goals" element={<Layout currentPageName="Goals"><Goals /></Layout>} />
          <Route path="/progress" element={<Layout currentPageName="Progress"><Progress /></Layout>} />
          <Route path="/reminders" element={<Layout currentPageName="Reminders"><Reminders /></Layout>} />
          <Route path="/chat" element={<Layout currentPageName="Chat"><Chat /></Layout>} />
          <Route path="/settings" element={<Layout currentPageName="Settings"><Settings /></Layout>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

// Exportar createPageUrl para uso en otros componentes
window.createPageUrl = createPageUrl;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

