import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { initializeApp } from 'firebase/app';

import {
	collection,
	getFirestore,
	onSnapshot,
	setDoc,
	getDocs,
	query,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';

import { getDaysBetweenDates, getFutureDate } from '../utils';

const firebaseConfig = {
	apiKey: 'AIzaSyAKhXStVolfPKwMsQCo7KiSePpC_zcJY-4',
	authDomain: 'tcl-45-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-45-smart-shopping-list',
	storageBucket: 'tcl-45-smart-shopping-list.appspot.com',
	messagingSenderId: '190905054675',
	appId: '1:190905054675:web:f970100be58de6cfaeeb26',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see: https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	return snapshot.docs.map((docRef) => {
		/**
		 * We must call a special `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return await setDoc(doc(db, listId, itemName), {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll put a Date here when the item is purchased!
		previousDateLastPurchased: null,
		dateLastPurchased: null,
		previousDateNextPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		// This property will be used when we build out more of our UI.
		isChecked: false,
		name: itemName,
		totalPurchases: 0,
		previousEstimate: null,
		currentEstimate: parseInt(daysUntilNextPurchase),
	});
}

export async function updateItem(listId, itemData) {
	const itemRef = doc(db, listId, itemData.id);
	let daysSinceLastTransaction;
	itemData.dateLastPurchased
		? (daysSinceLastTransaction = getDaysBetweenDates(
				itemData.dateLastPurchased,
		  ))
		: (daysSinceLastTransaction = getDaysBetweenDates(itemData.dateCreated));

	// this line with "let previousEstimate = parseInt .." can be removed if the database is reset. This line is required for converting old time frame entriies to numbers.
	let currentEstimate = parseInt(itemData.previousEstimate);

	let newTimeEstimate = calculateEstimate(
		currentEstimate,
		daysSinceLastTransaction,
		itemData.totalPurchases,
	);

	await updateDoc(itemRef, {
		totalPurchases: itemData.totalPurchases,
		isChecked: itemData.isChecked,
		previousDateLastPurchased: itemData.dateLastPurchased,
		dateLastPurchased: new Date(),
		previousDateNextPurchased: itemData.dateNextPurchased,
		dateNextPurchased: getFutureDate(newTimeEstimate),
		previousEstimate: itemData.currentEstimate,
		currentEstimate: newTimeEstimate,
	});
}

export async function updateItemBack(listId, itemData) {
	const itemRef = doc(db, listId, itemData.id);

	await updateDoc(itemRef, {
		totalPurchases: itemData.totalPurchases,
		isChecked: itemData.isChecked,
		dateLastPurchased: itemData.previousDateLastPurchased,
		dateNextPurchased: itemData.previousDateNextPurchased,
		currentEstimate: itemData.previousEstimate,
	});
}

export async function updateItemCheckedStatus(listId, itemData) {
	const itemRef = doc(db, listId, itemData.id);

	await updateDoc(itemRef, {
		isChecked: itemData.isChecked,
	});
}

export async function deleteItem(listId, itemData) {
	await deleteDoc(doc(db, listId, itemData.id));
}

export async function findToken(listId) {
	const q = query(collection(db, listId));
	const querySnapshot = await getDocs(q);
	return querySnapshot;
}

//ALL CODE BELOW THIS LINE WILL NEED TO BE REWORKED OR REMOVED!!!

// write compare function to use for .sort()
// whether active or not is determined by daysUntilNextPurchase in line 17
// of ListItem
function compareActiveandInactive(items) {
	let sortedActiveAndInactive = items.sort((a, b) => a.value - b.value);
	console.log('sortedActiveAndInactive', sortedActiveAndInactive);
	return sortedActiveAndInactive;
}

// using this function to sort into a new array for display
export function comparePurchaseUrgency(items) {
	// we start with sorting active vs inactive
	//sort inactive items last
	let sortedListOfActiveAndInactive = compareActiveandInactive(items);
	console.log('sortedListOfActiveAndInactive', sortedListOfActiveAndInactive);
	// now we have new list of active and inactive sorted
	//sort items in this new array in ascending order of 'days until next purchase'
	let ascendingOrder = sortedListOfActiveAndInactive.sort(
		(a, b) => a.dateNextPurchased - b.dateNextPurchased,
	);
	console.log('ascendingOrder', ascendingOrder);
	//sort items with same 'days until next purchase' alphabetically
	let alphabeticalOrder = ascendingOrder.sort((a, b) => {
		// .toLowerCase() to account for case sensitivity
		const itemA = a.name.toLowerCase();
		const itemB = b.name.toLowerCase();
		if (itemA < itemB) {
			// if itemA is earlier in the alphabet, will be earlier index in the array
			return -1;
		}
		if (itemA > itemB) {
			return 1;
		}
		// if equal, then will stay
		return 0;
	});
	console.log('alphabeticalOrder', alphabeticalOrder);
	return alphabeticalOrder;
}
