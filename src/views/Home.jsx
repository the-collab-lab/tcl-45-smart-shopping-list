import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findToken } from '../api/firebase';
import redBlinky from '../../src/assets/red-blinky.png';
import blueBlinky from '../../src/assets/blue-blinky.png';
import yellowBlinky from '../../src/assets/yellow-blinky.png';
import logo from '../../src/assets/shop-ade.png';

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
					<header className="home-header">
						<h1>
							<img
								src={logo}
								alt="Bright yellow and orange logo that says SHOP-ADE in all caps."
							/>
						</h1>
					</header>
					<div className="home-container">
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
										onChange={(e) => setJoinListName(e.target.value)}
									/>
								</label>
								<p className="join-list-token">Enter a three word token.</p>
								<div>
									<button type="submit" className="join-list-button">
										JOIN
									</button>
								</div>
								{error && (
									<p className="join-list-error">
										Oh no! That list does not exist.
									</p>
								)}
							</form>
						</div>
						<div className="existing-list-container">
							<img
								src={blueBlinky}
								alt="Blue character"
								className="character"
							/>
							<div className="existing-list">
								<p>Don't have a list?</p>
								<button onClick={handleClick} className="existing-list-button">
									CREATE
								</button>
							</div>
						</div>
						{/* <div className="join-list-container">
							<img
								src={yellowBlinky}
								alt="Blue character"
								className="character"
							/>
							<div className="existing-list">
								<button onClick="" className="existing-list-button">
									ABOUT
								</button>
							</div>
						</div> */}
					</div>
				</>
			)}
		</div>
	);
}
