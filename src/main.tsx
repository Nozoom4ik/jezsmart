import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FirebaseProvider } from './lib/FirebaseProvider.tsx';
import { LanguageProvider } from './LanguageContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </LanguageProvider>
  </StrictMode>,
);
