import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem() {
	const [timeFrame, setTimeFrame] = useState('7');
	const [itemName, setItem] = useState('');
	const [data, setData] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setData({ itemName, timeFrame });
		addItem(data);
		console.log('working');
		console.log('timeFrame', timeFrame);
	};
	console.log('data', data);

	const handleName = (e) => {
		setItem(e.target.value);
	};

	const handleTime = (e) => {
		setTimeFrame(e.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label for="item-name">
						Item Name:
						<input
							type="text"
							name="item-name"
							id="item-name"
							placeholder="name of item"
							onChange={handleName}
						/>
					</label>
				</div>
				<div>
					<label for="soon">
						<input
							type="radio"
							value="7"
							checked={timeFrame === '7'}
							name="time-frame"
							id="soon"
							onChange={handleTime}
						/>
						Soon
					</label>
				</div>
				<div>
					<label for="kind-of-soon">
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
					<label for="not-soon">
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
