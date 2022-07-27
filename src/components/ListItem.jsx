import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';

export function ListItem({ item, listToken }) {
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
	console.log('dateLastPurchased', item.dateLastPurchased);
	return (
		<div className="ListItem">
			<input
				type="checkbox"
				id={`${item.name}-checkbox`}
				name={item.name}
				onClick={handlePurchaseItem}
				defaultChecked={isPurchased}
				//put the calculation here ??
			/>
			<label htmlFor={`${item.name}-checkbox`}>{item.name}</label>
		</div>
	);
}
