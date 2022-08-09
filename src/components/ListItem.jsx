import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem, deleteItem } from '../api';
const one_day_in_ms = 24 * 60 * 60 * 1000;
// const one_day_in_ms = 60 * 2 * 1000; // 120 seconds for testing the reset timeframe

export function ListItem({ item, listToken }) {
	const [boxChecked, setBoxChecked] = useState(false);
	const [isPurchased, setIsPurchased] = useState(item.isChecked);
	const [isDeleting, setIsDeleting] = useState(false);

	const currentDate = new Date();
	const currentTimeInMilliseconds = Math.floor(currentDate.getTime());
	const dateLastPurchasedInMilliseconds = item.dateLastPurchased
		? item.dateLastPurchased.seconds * 1000
		: null;
	let timeElapsed = currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	const handlePurchaseItem = async () => {
		try {
			if (item.isChecked === false) {
				item.totalPurchases++;
				item.isChecked = true;
				setBoxChecked(true);
				await updateItem(listToken, item);
			} else {
				item.totalPurchases--;
				item.isChecked = false;
				setBoxChecked(false);
				await updateItem(listToken, item);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	useEffect(() => {
		if (
			timeElapsed > one_day_in_ms &&
			isPurchased === true &&
			boxChecked === true
		) {
			item.isChecked = isPurchased;
			updateItem(listToken, item);
		} else if (
			timeElapsed > one_day_in_ms &&
			item.isChecked === true &&
			boxChecked === false
		) {
			item.isChecked = false;
			updateItem(listToken, item);
		}
	});

	const handleCheckItem = (e) => {
		setIsPurchased(e.target.checked);
		handlePurchaseItem();
	};

	const handleDeleteItem = () => {
		const res = window.confirm('Do you really want to delete this item?');
		if (res) {
			setIsDeleting(true);
			setTimeout(() => deleteItem(listToken, item), 2000);
		} else {
			setIsDeleting(false);
		}
	};
	console.log('isDeleting', isDeleting);

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
			<button type="button" className="" onClick={handleDeleteItem}>
				Delete
			</button>
			{isDeleting && <span>The item is being deleted.</span>}
		</div>
	);
}
