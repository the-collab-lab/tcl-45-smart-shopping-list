import './ListMobileView.css';
import { ListItemMobileView } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDaysUntilNextPurchased } from '../utils';
import redblinky from '../../src/assets/red-blinky.png';
import pinkblinky from '../../src/assets/pink-blinky.png';
import yellowblinky from '../../src/assets/yellow-blinky.png';
import blueblinky from '../../src/assets/blue-blinky.png';

import toast from 'react-hot-toast';
import pac from '../assets/pac.png';

export function ListMobileView({ data, listToken, loading, confirmLogOut }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const navigateTo = useNavigate();

	function filterResults(query) {
		return data.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase()),
		);
	}

	useEffect(() => {
		setSearchResults(filterResults(searchQuery));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery, data]);

	function handleClearSearchQuery() {
		setSearchQuery('');
	}

	function handleNav() {
		navigateTo('/add-item');
	}

	const this_week = searchResults.filter(
		(item) => getDaysUntilNextPurchased(item.dateNextPurchased) <= 7,
	);
	const next_week = searchResults.filter(
		(item) =>
			getDaysUntilNextPurchased(item.dateNextPurchased) > 7 &&
			getDaysUntilNextPurchased(item.dateNextPurchased) <= 14,
	);
	const next_month = searchResults.filter(
		(item) => getDaysUntilNextPurchased(item.dateNextPurchased) > 14,
	);
	const inactive_array = searchResults.filter(
		(item) => getDaysUntilNextPurchased(item.dateNextPurchased) < 0,
	);

	const group_this_week = {
		timeFrame: 'SOON',
		subLabel: '7 days or less',
		image: '../../src/assets/red-blinky.png',
		alt: 'red ghost logo',
		array: this_week,
	};

	const group_next_week = {
		timeFrame: 'KIND OF SOON',
		subLabel: 'Between 8 and 14 days',
		image: '../../src/assets/pink-blinky.png',
		alt: 'pink ghost logo',
		array: next_week,
	};

	const group_next_month = {
		timeFrame: 'NOT SO SOON',
		subLabel: '15 days or more',
		image: '../../src/assets/yellow-blinky.png',
		alt: 'yellow ghost logo',
		array: next_month,
	};

	const group_inactive = {
		timeFrame: 'INACTIVE',
		subLabel: "Haven't bought it receintly",
		image: '../../src/assets/blue-blinky.png',
		alt: 'blue ghost logo',
		array: inactive_array,
	};

	const compareDuplicate = (itemNameToCompare) => {
		const match = data.find(
			(item) => itemNameToCompare.toLowerCase() === item.name.toLowerCase(),
		);

		if (match) {
			toast(
				'This item already exists on your list! Try adding a different item.',
			);
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			{loading ? (
				<p>Your list is loading...</p>
			) : (
				<>
					{data.length >= 1 ? (
						<div className="full-list-container-mobile">
							<div className="full-list-search-container">
								<h2>I NEED TO BUY...</h2>
								<form>
									<label htmlFor="search-items">
										Filter:{' '}
										<input
											name="search-items"
											id="search-items"
											type="text"
											placeholder="Search items"
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
										/>
										{searchQuery ? (
											<>
												{' '}
												<button type="button" onClick={handleClearSearchQuery}>
													Clear search
												</button>
											</>
										) : (
											''
										)}
									</label>
								</form>
							</div>
							<ul className="full-list-items-container">
								<div className="group-container">
									{group_this_week.array.length > 0 && (
										<div className="this-week-container" id="week-container">
											<h2 className="time-frame-name">
												{group_this_week.timeFrame}
											</h2>
											{group_this_week.array.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
													image={group_this_week.image}
													alt={group_this_week.alt}
												/>
											))}
										</div>
									)}
									{group_next_week.array.length > 0 && (
										<div className="this-week-container" id="week-container">
											<h2 className="time-frame-name">
												{group_next_week.timeFrame}
											</h2>
											{group_next_week.array.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
													image={group_next_week.image}
													alt={group_next_week.alt}
												/>
											))}
										</div>
									)}
									{group_next_month.array.length > 0 && (
										<div className="this-week-container" id="week-container">
											<h2 className="time-frame-name">
												{group_next_month.timeFrame}
											</h2>
											{group_next_month.array.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
													image={group_next_month.image}
													alt={group_next_month.alt}
												/>
											))}
										</div>
									)}
									{group_inactive.array.length > 0 && (
										<div className="this-week-container" id="week-container">
											<h2 className="time-frame-name">
												{group_inactive.timeFrame}
											</h2>
											{group_inactive.array.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
													image={group_inactive.image}
													alt={group_inactive.alt}
												/>
											))}
										</div>
									)}
								</div>
							</ul>
						</div>
					) : (
						<div className="empty-list-container">
							<h3>
								Your smart shopping list is currently empty! Start picking
								products to fill your needs.
							</h3>
							<button
								onClick={handleNav}
								className="empty-list-add-item-button"
							>
								ADD ITEM
							</button>
							<img
								src={pac}
								alt="A yellow Miss Pac Man with three dots coming out of her mouth."
							/>
						</div>
					)}{' '}
				</>
			)}
		</>
	);
}
