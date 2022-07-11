import './Home.css';

export function Home({ handleClick }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleClick}>Create New List</button>
		</div>
	);
}
