import './ListItem.css';
import { useState } from 'react';

export function ListItem({ name }) {
	const [isPurchased, setIsPurchased] = useState(false);

	const handlePurchaseItem = () => {
		setIsPurchased(true);
		// set 24 hour time
		// import and call updateItem on Firebase
		// update isChecked and nextPurchasedDate snd totalPurchases
	};

	console.log(isPurchased);

	return (
		<div className="ListItem">
			<input
				type="checkbox"
				id={`${name}-checkbox`}
				name={name}
				onChange={handlePurchaseItem}
			/>
			<label htmlFor={`${name}-checkbox`}>{name}</label>
		</div>
	);
}
