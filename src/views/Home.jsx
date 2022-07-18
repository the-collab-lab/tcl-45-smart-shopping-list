import './Home.css';
import { findToken } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Home({ handleClick, listToken }) {
	const [listName, setListName] = useState('');
	const navigateTo = useNavigate();

	useEffect(() => {
		if (listToken) {
			navigateTo('/list');
		} else return;
	}, [listToken, navigateTo]);

	// const getListName = (e) => {
	// 	setListName(e.target.value);
	// 	alert(listName);
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await findToken(listName);
		} catch (err) {
			console.log(err.message);
			// setError(true);
		}
	};

	return (
		<div className="Home">
			<button onClick={handleClick}>Create New List</button>

			<div>
				<form onSubmit={handleSubmit}>
					<div className="list-name">
						<label htmlFor="list-name">
							List Name:{' '}
							<input
								required
								type="text"
								name="list-name"
								value={listName}
								id="list-name"
								placeholder="name of list"
								onChange={(e) => setListName(e.target.value)}
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
