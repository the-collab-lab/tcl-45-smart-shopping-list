import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';

const root = createRoot(document.getElementById('root'));
root.render(
	<Router>
		<Toaster />
		<App />
	</Router>,
);
