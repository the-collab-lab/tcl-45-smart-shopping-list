import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Home({ handleClick, listToken }) {
	const navigateTo = useNavigate();

	useEffect(() => {
		if (listToken) {
			navigateTo('/list');
		} else return;
	}, [listToken, navigateTo]);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleClick}>Create New List</button>
		</div>
	);
}
