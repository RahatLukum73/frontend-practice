import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Blog } from './Blog.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Blog />
	</BrowserRouter>
);
