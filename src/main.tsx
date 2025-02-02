import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ReactFlowProvider } from 'reactflow';
import App from './App';
import './index.css';
import 'reactflow/dist/style.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);