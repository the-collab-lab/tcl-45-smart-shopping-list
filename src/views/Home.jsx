import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findToken } from '../api/firebase';
import redBlinky from '../../src/assets/red-blinky.png';

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
			{listToken ? (
				navigateTo('/list')
			) : (
				<>
					<div className="join-list-container">
						<img src={redBlinky} alt="Red character" className="character" />
						<form onSubmit={handleJoinList} className="join-list">
							<label htmlFor="list-name" className="join-list-input">
								Join an existing list:{' '}
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
							<p>Enter a three word token.</p>
							<div>
								<button type="submit" className="join-list-button">
									JOIN
								</button>
							</div>
							{error && <p>That list does not exist.</p>}
						</form>
					</div>
					<button onClick={handleClick}>Create New List</button>
				</>
			)}
		</div>
	);
}
