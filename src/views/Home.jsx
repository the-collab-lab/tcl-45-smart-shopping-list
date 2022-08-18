import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findToken } from '../api/firebase';

export function Home({ handleClick, listToken, setListToken }) {
	const navigateTo = useNavigate();
	const [joinListName, setJoinListName] = useState('');
	const [error, setError] = useState(false);

	const handleJoinList = async (e) => {
		e.preventDefault();
		setError(false);
		const querySnapshot = await findToken(joinListName);
		if (querySnapshot.size >= 1) {
			setListToken(joinListName);
			navigateTo('/list');
		} else if (querySnapshot.empty) {
			setError(true);
		}
	};

	return (
		<div className="Home">
			<button onClick={handleClick}>Create New List</button>

			<div>
				<form onSubmit={handleJoinList}>
					<div className="list-name">
						<label htmlFor="list-name">
							List Name:{' '}
							<input
								required
								type="text"
								name="list-name"
								value={joinListName}
								id="list-name"
								placeholder="name of list"
								onChange={(e) => setJoinListName(e.target.value)}
							/>
						</label>
					</div>
					{error && <p>That list does not exist.</p>}
					<div>
						<button type="submit">Join List</button>
					</div>
				</form>
			</div>
		</div>
	);
}
