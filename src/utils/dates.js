const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(lastTransaction) {
	let today = new Date();
	// get both dates in milliseconds
	let timeDifference = today.getTime() - lastTransaction.toMillis();
	// change milliseconds into days, rounding up
	let dayDifference = Math.ceil(timeDifference / ONE_DAY_IN_MILLISECONDS);
	return Math.abs(dayDifference);
}

export function getDaysUntilNextPurchased(dateNextPurchased) {
	let today = new Date();
	// get both dates in milliseconds
	let timeDifference = dateNextPurchased.toMillis() - today.getTime();
	// change milliseconds into days, rounding up
	let dayDifference = Math.ceil(timeDifference / ONE_DAY_IN_MILLISECONDS);
	return dayDifference;
}
