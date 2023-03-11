import { createRoot } from 'react-dom/client';
import App from './App';
import '@/assets/styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
