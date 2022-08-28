import { useState } from 'react';
import { addItem } from '../api/firebase';
import './AddItem.css';

export function AddItem({ listToken, itemList, setData }) {
	const [daysUntilNextPurchase, setTimeFrame] = useState('7');
	const [itemName, setItem] = useState('');
	const [error, setError] = useState(false);
	const [duplicateError, setDuplicateError] = useState(false);
	const [success, setSuccess] = useState(false);
	// check for duplicate item in list
	const isDuplicate = (itemList) =>
		itemList.name.toLowerCase().replace(/ /g, '') ===
		itemName.toLowerCase().replace(/ /g, '');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const duplicateItem = itemList.some(isDuplicate);
		try {
			if (!duplicateItem) {
				setData({ itemName, daysUntilNextPurchase });
				addItem(listToken, { itemName, daysUntilNextPurchase });
				setError(false);
				setSuccess(true);
				setItem('');
			} else {
				setDuplicateError(true);
				setSuccess(false);
			}
		} catch (err) {
			console.log(err.message);
			setError(true);
		}
	};

	const handleName = (e) => {
		setSuccess(false);
		setDuplicateError(false);
		setItem(e.target.value);
	};

	const handleTime = (e) => {
		setTimeFrame(e.target.value);
		setSuccess(false);
	};
	return (
		<div className="item-form-container">
			<form onSubmit={handleSubmit}>
				<div className="item-name-container">
					<label htmlFor="item-name">
						Enter Item Name:{' '}
						<input
							required
							value={itemName}
							type="text"
							name="item-name"
							id="item-name"
							placeholder="name of item"
							onChange={handleName}
						/>
					</label>
				</div>
				<div className="date-container">
					<fieldset className="timeframe">
						<legend className="legend">
							How soon will you buy this again?
						</legend>
						<label
							className="time-frame-label"
							className="time-frame-label"
							htmlFor="soon"
						>
							<input
								type="radio"
								value="7"
								checked={daysUntilNextPurchase === '7'}
								name="time-frame"
								id="soon"
								onChange={handleTime}
							/>{' '}
							<img className="blinkies" src={redblinky} alt="red-blinky logo" />
							<span>This week</span>
						</label>

						<label
							className="time-frame-label"
							className="time-frame-label"
							htmlFor="kind-of-soon"
						>
							<input
								type="radio"
								name="time-frame"
								id="kind-of-soon"
								value="14"
								onChange={handleTime}
							/>{' '}
							<img
								className="blinkies"
								src={pinkblinky}
								alt="pink-blinky logo"
							/>
							<span>Next week</span>
						</label>

						<label
							className="time-frame-label"
							className="time-frame-label"
							htmlFor="not-soon"
						>
							<input
								type="radio"
								name="time-frame"
								id="not-soon"
								value="30"
								onChange={handleTime}
							/>{' '}
							<img
								className="blinkies"
								src={yellowblinky}
								alt="yellow-blinky logo"
							/>
							<span>Next month</span>
						</label>
					</fieldset>
				</div>
				<div className="button">
					<button type="submit">Add Item</button>
				</div>
				<span className="error-message">
					<span className="error-message">
						{error && <p>The item was not added</p>}
						{duplicateError && (
							<p>
								The item already exists on your list! Try adding a different
								item.
							</p>
						)}
						{success && <p>The item has been added</p>}
					</span>
				</span>
			</form>
		</div>
	);
}
