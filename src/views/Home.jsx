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
			<button onClick={handleClick}>Create New List</button>

			<div>
				<form>
					<div className="list-name">
						<label htmlFor="list-name">
							List Name:{' '}
							<input
								required
								type="text"
								name="list-name"
								id="list-name"
								placeholder="name of list"
							/>
						</label>
					</div>
					{/* {error && <p>The item was not added</p>}
				{success && <p>The item has been added</p>} */}

					<div className="button">
						<button type="submit">Join List</button>
					</div>
				</form>
			</div>
		</div>
	);
}
