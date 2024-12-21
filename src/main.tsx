import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ReactFlowProvider } from 'reactflow';
import { StripeProvider } from './lib/stripe/StripeProvider';
import App from './App';
import './index.css';
import 'reactflow/dist/style.css';

// Initialize i18n
import './i18n/config';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StripeProvider>
          <ReactFlowProvider>
            <App />
          </ReactFlowProvider>
        </StripeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);