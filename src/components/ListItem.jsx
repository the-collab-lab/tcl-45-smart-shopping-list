import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';
import { serverTimestamp } from 'firebase/firestore';

export function ListItem({ item, listToken }) {
	const [isPurchased, setIsPurchased] = useState(false);

	const handlePurchaseItem = async () => {
		try {
			setIsPurchased(true);
			item.totalPurchases++;
			await updateItem(listToken, { item });
		} catch (error) {
			console.log('error', error);
		}

		// set 24 hour time
		// import and call updateItem on Firebase
		// update isChecked and nextPurchasedDate snd totalPurchases
	};

	return (
		<div className="ListItem">
			<input
				type="checkbox"
				id={`${item.name}-checkbox`}
				name={item.name}
				onClick={handlePurchaseItem}
				defaultChecked={isPurchased}
			/>
			<label htmlFor={`${item.name}-checkbox`}>{item.name}</label>
		</div>
	);
}
