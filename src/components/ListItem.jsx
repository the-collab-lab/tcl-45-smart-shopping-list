import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api';

export function ListItem({ item, listToken }) {
	// const one_day_in_ms = 24 * 60 * 60 * 1000;
	const one_day_in_ms = 60 * 2 * 1000; // 180 seconds for testing the reset timeframe
	const currentDate = new Date();
	const currentTimeInMilliseconds = Math.floor(currentDate.getTime());
	const dateLastPurchasedInMilliseconds =
		item && item.dateLastPurchased
			? item.dateLastPurchased.seconds * 1000
			: null;
	const timeElapsed =
		currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	const [isPurchased, setIsPurchased] = useState(item.isChecked);

	const handlePurchaseItem = async () => {
		try {
			item.totalPurchases++;
			item.isChecked = true;
			await updateItem(listToken, item);
		} catch (error) {
			console.log('error', error);
		}
		console.log('item was purchased');
	};

	useEffect(() => {
		if (timeElapsed > one_day_in_ms) {
			item.isChecked = false;
			updateItem(listToken, item);
			console.log('times up!');
		}
	}, [item]);

	const handleCheckItem = (e) => {
		setIsPurchased(e.target.checked);
		handlePurchaseItem();
	};

	// useEffect(() => {
	// 	const updatePurchased = async () => {
	// 		try {
	// 			if (
	// 				timeElapsed > one_day_in_ms
	// 			) {
	// 				item.isChecked = false;
	// 				setIsPurchased(false);
	// 				await updateItem(listToken, item);
	// 			}
	// 		} catch (error) {
	// 			console.log('error', error);
	// 		}
	// 	};
	// 	updatePurchased();
	// }, [dateLastPurchasedInMilliseconds, item, listToken]);

	console.log(item.name, dateLastPurchasedInMilliseconds, item.isChecked);

	return (
		<div className="ListItem">
			<input
				type="checkbox"
				id={`${item.id}-checkbox`}
				name={item.name}
				onChange={handleCheckItem}
				// defaultChecked={isPurchased}
				checked={isPurchased}
				//put the calculation here ??
			/>
			<label htmlFor={`${item.id}-checkbox`}>{item.name}</label>
		</div>
	);
}
