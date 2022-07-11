import './Home.css';

export function Home() {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button
				onClick={() => {
					console.log('hello');
				}}
			>
				Create New List
			</button>
		</div>
	);
}
