import './ListItem.css';
import { useState, useEffect } from 'react';
import ConfirmDialogWindow from './ConfirmDialogWindow';
import {
	updateItem,
	deleteItem,
	updateItemBack,
	updateItemCheckedStatus,
	updateItemName,
} from '../api';
// const one_day_in_ms = 60 * 2 * 1000; // 120 seconds for testing the reset timeframe
const one_day_in_ms = 24 * 60 * 60 * 1000;

export function ListItem({ item, listToken, compareDuplicate }) {
	const [boxChecked, setBoxChecked] = useState(false);
	const [isPurchased, setIsPurchased] = useState(item.isChecked);

	const [isEditing, setIsEditing] = useState(false);
	const [updatedName, setUpdatedName] = useState(item.name);

	const [confirmResponse, setConfirmResponse] = useState(false);

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

	// const handleDeleteItem = () => {
	// 	const confirm = window.confirm(
	// 		`Do you really want to delete ${item.name}?`,
	// 	);
	// 	try {
	// 		if (confirm) {
	// 			deleteItem(listToken, item);
	// 			// commenting out the lines below but keeping them for a11y dialog window to be implemented later
	// 			// 	alert(`${item.name} has been deleted!`);
	// 			// } else {
	// 			// 	alert(`${item.name} was not deleted`);
	// 		}
	// 	} catch (error) {
	// 		console.log('error', error);
	// 	}
	// };

	if (confirmResponse) {
		try {
			deleteItem(listToken, item);
		} catch (error) {
			console.log('error', error);
		}
	}

	const handleCancelEditItem = (e) => {
		e.preventDefault();
		setIsEditing(false);
		setUpdatedName(item.name);
	};

	let itemDisplay;

	if (isEditing) {
		itemDisplay = (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (compareDuplicate(updatedName)) {
						return;
					}
					setIsEditing(false);
					try {
						updateItemName(listToken, item, updatedName);
					} catch (error) {
						console.log('error', error);
					}
				}}
			>
				<label>
					Edit
					<input
						type="text"
						placeholder="Edit Item"
						value={updatedName}
						onChange={(e) => {
							setUpdatedName(e.target.value);
						}}
					/>
				</label>
				<button type="button" onClick={handleCancelEditItem}>
					Cancel
				</button>
				<button type="submit">Submit</button>
			</form>
		);
	} else {
		itemDisplay = (
			<>
				<div className="list-item-label-container">
					<label
						className="list-item-label"
						htmlFor={`${item.id}-${item.name}-checkbox`}
					>
						{item.name}
					</label>
				</div>
				<div className="list-item-input-container">
					<input
						className="list-item-input"
						type="checkbox"
						id={`${item.id}-${item.name}-checkbox`}
						name={item.name}
						onChange={handleCheckItem}
						checked={isPurchased}
					/>
				</div>
				<button type="button" onClick={() => setIsEditing(true)}>
					Edit
				</button>
			</>
		);
	}

	return (
		<div className="list-item-container">
			{itemDisplay}
			{/* <div className="list-item-label-container">
				<label
					className="list-item-label"
					htmlFor={`${item.id}-${item.name}-checkbox`}
				>
					{item.name}
				</label>
			</div>
			<div className="list-item-input-container">
				<input
					className="list-item-input"
					type="checkbox"
					id={`${item.id}-${item.name}-checkbox`}
					name={item.name}
					onChange={handleCheckItem}
					checked={isPurchased}
				/>
			</div> */}
			{/* <button type="button" onClick={handleDeleteItem}>
				Delete
			</button> */}
			<div className="delete-container">
				<ConfirmDialogWindow
					text={`Do you really want to delete ${item.name}?`}
					title="delete dialog"
					confirmAction={setConfirmResponse}
				/>
			</div>
		</div>
	);
}
