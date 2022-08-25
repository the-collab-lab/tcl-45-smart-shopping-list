import './ListItem.css';
import { useState, useEffect, useRef } from 'react';
// import { A11yDialog } from 'react-a11y-dialog';
import CustomDeleteDialog from '../utils/CustomDeleteDialog';

import {
	updateItem,
	deleteItem,
	updateItemBack,
	updateItemCheckedStatus,
} from '../api';
const one_day_in_ms = 24 * 60 * 60 * 1000;
// const one_day_in_ms = 60 * 2 * 1000; // 120 seconds for testing the reset timeframe

export function ListItem({ item, listToken }) {
	const [boxChecked, setBoxChecked] = useState(false);
	const [isPurchased, setIsPurchased] = useState(item.isChecked);
	const [deleteResponse, setDeleteResponse] = useState(false);

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
				await updateItemBack(listToken, item);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const dialog = useRef();

	useEffect(() => {
		if (
			timeElapsed > one_day_in_ms &&
			isPurchased === true &&
			boxChecked === true
		) {
			item.isChecked = isPurchased;
			updateItemCheckedStatus(listToken, item);
		} else if (
			timeElapsed > one_day_in_ms &&
			item.isChecked === true &&
			boxChecked === false
		) {
			item.isChecked = false;
			updateItemCheckedStatus(listToken, item);
		}
	});

	const handleCheckItem = (e) => {
		setIsPurchased(e.target.checked);
		handlePurchaseItem();
	};

	const handleDeleteItem = () => {
		dialog.current.show();
		// const confirm = window.confirm(
		// 	`Do you really want to delete ${item.name}?`,
		try {
			if (deleteResponse) {
				deleteItem(listToken, item);
				// commenting out the lines below but keeping them for a11y dialog window to be implemented later
				// 	alert(`${item.name} has been deleted!`);
				// } else {
				// 	alert(`${item.name} was not deleted`);
			}
		} catch (error) {
			console.log('error', error);
		}
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
			{/* <button type="button" onClick={handleDeleteItem}>
				Delete
			</button> */}

			<CustomDeleteDialog
				props={`Do you really want to delete ${item.name}?`}
			/>
		</div>
	);
}
