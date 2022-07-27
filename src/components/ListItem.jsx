import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';
import { useEffect } from 'react';

export function ListItem({ item, listToken }) {
	const one_day_in_seconds = 24 * 60 * 60;
	// const one_day_in_seconds = 3;

	const [isPurchased, setIsPurchased] = useState(false);

	const handlePurchaseItem = async () => {
		try {
			setIsPurchased(true);
			item.totalPurchases++;
			item.isChecked = true;
			// update dateLastPurchased
			await updateItem(listToken, item);
		} catch (error) {
			console.log('error', error);
		}

		// set 24 hour time function
		// useEffect or useState ???
		// update item.isChecked ?
	};
	const convertedDateLastPurchased =
		item && item.dateLastPurchased ? item.dateLastPurchased.seconds : null;

	useEffect(() => {
		const updatePurchased = async () => {
			try {
				console.log('in updatePurchased');
				console.log('convertedDateLastPurchased ', convertedDateLastPurchased);
				console.log(
					'purchase + 24 h ',
					convertedDateLastPurchased + one_day_in_seconds,
				);
				if (
					// convertedDateLastPurchased >=
					// convertedDateLastPurchased + one_day_in_seconds
					new Date() - convertedDateLastPurchased ===
					one_day_in_seconds
				) {
					console.log('in if-statement updatePurchased');

					item.isChecked = false;
					setIsPurchased(false);
					await updateItem(listToken, item);
				}
			} catch (error) {
				console.log('error', error);
			}
		};
		updatePurchased();
	}, [convertedDateLastPurchased, item, listToken]);

	console.log(convertedDateLastPurchased, item.isChecked);

	return (
		<div className="ListItem">
			<input
				type="checkbox"
				id={`${item.name}-checkbox`}
				name={item.name}
				onClick={handlePurchaseItem}
				defaultChecked={item.isChecked}
				//put the calculation here ??
			/>
			<label htmlFor={`${item.name}-checkbox`}>{item.name}</label>
		</div>
	);
}
