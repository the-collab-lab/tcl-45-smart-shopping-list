import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken, data, setData }) {
	const [daysUntilNextPurchase, setTimeFrame] = useState('7');
	const [itemName, setItem] = useState('');
	const [error, setError] = useState(false);
	const [duplicateError, setDuplicateError] = useState(false);
	const [success, setSuccess] = useState(false);

	// check for duplicate item in list
	const isDuplicate = (data) =>
		data.name.toLowerCase().replace(/ /g, '') ===
		itemName.toLowerCase().replace(/ /g, '');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const duplicateItem = data.some(isDuplicate);
		console.log('data', data);
		console.log('itemName', itemName);
		console.log('duplicateItem', duplicateItem);
		try {
			if (!duplicateItem) {
				setData({ itemName, daysUntilNextPurchase });
				addItem(listToken, { itemName, daysUntilNextPurchase });
				setError(false);
				setSuccess(true);
				setItem('');
				setTimeFrame('7');
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
		<div>
			<form onSubmit={handleSubmit}>
				<div className="item-name">
					<label htmlFor="item-name">
						Item Name:{' '}
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
				<div>
					<fieldset className="timeframe">
						<legend className="legend">
							How soon will you buy this again?
						</legend>
						<label htmlFor="soon">
							<input
								type="radio"
								value="7"
								checked={daysUntilNextPurchase === '7'}
								name="time-frame"
								id="soon"
								onChange={handleTime}
							/>
							Soon
						</label>

						<label htmlFor="kind-of-soon">
							<input
								type="radio"
								name="time-frame"
								id="kind-of-soon"
								value="14"
								onChange={handleTime}
							/>
							Kind of Soon
						</label>

						<label htmlFor="not-soon">
							<input
								type="radio"
								name="time-frame"
								id="not-soon"
								value="30"
								onChange={handleTime}
							/>
							Not Soon
						</label>
					</fieldset>
				</div>
				{error && <p>The item was not added</p>}
				{duplicateError && (
					<p>
						The item already exists on your list! Try adding a different item.
					</p>
				)}
				{success && <p>The item has been added</p>}

				<div className="button">
					<button type="submit">Add Item</button>
				</div>
			</form>
		</div>
	);
}
