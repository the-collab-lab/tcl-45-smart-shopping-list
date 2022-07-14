import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	const [daysUntilNextPurchase, setTimeFrame] = useState(7);
	const [itemName, setItem] = useState('');
	const [itemData, setData] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setData({ itemName, daysUntilNextPurchase });
		await addItem(listToken, { itemName, daysUntilNextPurchase });
	};

	const handleName = (e) => {
		setItem(e.target.value);
	};

	const handleTime = (e) => {
		setTimeFrame(e.target.value);
	};
	// TODO: require input for item name
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="item-name">
						Item Name:
						<input
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
					<label htmlFor="soon">
						<input
							type="radio"
							value="7"
							checked={daysUntilNextPurchase === 7}
							name="time-frame"
							id="soon"
							onChange={handleTime}
						/>
						Soon
					</label>
				</div>
				<div>
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
				</div>
				<div>
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
				</div>
				<button onClick={handleSubmit} type="submit">
					Add Item
				</button>
			</form>
		</div>
	);
}
