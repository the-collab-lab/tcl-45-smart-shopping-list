import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api';
import { getDaysBetweenDates } from '../utils';
const one_day_in_ms = 24 * 60 * 60 * 1000;
// const one_day_in_ms = 60 * 2 * 1000; // 120 seconds for testing the reset timeframe

export function ListItem({ item, listToken }) {
	const currentDate = new Date();
	const currentTimeInMilliseconds = Math.floor(currentDate.getTime());
	const dateLastPurchasedInMilliseconds = item.dateLastPurchased
		? item.dateLastPurchased.seconds * 1000
		: null;
	let timeElapsed = currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	const [isPurchased, setIsPurchased] = useState(item.isChecked);

	const handlePurchaseItem = async () => {
		try {
			if (item.isChecked === false) {
				item.totalPurchases++;
				item.isChecked = true;
				await updateItem(listToken, item);
			} else {
				item.totalPurchases--;
				item.isChecked = false;
				await updateItem(listToken, item);
			}
		} catch (error) {
			console.log('error', error);
		}
	};
	// getDaysBetweenDates of lastPurchasedDate and now

	useEffect(() => {
		if (timeElapsed > one_day_in_ms) {
			item.isChecked = false;
			updateItem(listToken, item);
		}
	});

	const handleCheckItem = (e) => {
		setIsPurchased(e.target.checked);
		handlePurchaseItem();
	};

	return (
		<div className="ListItem">
			<input
				type="checkbox"
				id={`${item.id}-${item.name}-checkbox`}
				name={item.name}
				onChange={handleCheckItem}
				checked={isPurchased}
			/>
			<label htmlFor={`${item.id}-${item.name}-checkbox`}>{item.name}</label>
		</div>
	);
}
