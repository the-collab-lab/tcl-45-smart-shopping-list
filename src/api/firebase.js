import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { initializeApp } from 'firebase/app';

import {
	collection,
	getFirestore,
	onSnapshot,
	addDoc,
	getDocs,
	query,
	updateDoc,
	deleteDoc,
	doc,
	orderBy,
} from 'firebase/firestore';

import { getDaysBetweenDates, getFutureDate } from '../utils';

const firebaseConfig = {
	apiKey: 'AIzaSyAieH45bdV9C9hCL0XaAi4JSlQgbPq9cos',
	authDomain: 'tcl-45-shop-ade-app.firebaseapp.com',
	projectId: 'tcl-45-shop-ade-app',
	storageBucket: 'tcl-45-shop-ade-app.appspot.com',
	messagingSenderId: '387528764275',
	appId: '1:387528764275:web:d4f5f8092fbe006e327306',
	measurementId: 'G-0M1MQ8GDFB',
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
	const alphabeticalList = query(listCollectionRef, orderBy('lowercase_name'));
	return onSnapshot(alphabeticalList, handleSuccess);
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
	return await addDoc(listCollectionRef, {
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
		lowercase_name: itemName.toLowerCase(),
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

export async function updateItemName(listId, itemData, itemName) {
	const itemRef = doc(db, listId, itemData.id);

	await updateDoc(itemRef, {
		name: itemName,
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
