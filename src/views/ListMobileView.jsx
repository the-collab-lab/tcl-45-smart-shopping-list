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

	const group_this_week = {
		timeFrame: 'This week',
		subLabel: '7 days or less',
		image: <img className="blinkies" src={redblinky} alt="red-blinky logo" />,
		filteredData: (item) => {
			return item.currentEstimate <= 7;
		},
	};

	const group_next_week = {
		timeFrame: 'Next week',
		subLabel: 'Between 8 and 14 days',
		image: <img className="blinkies" src={pinkblinky} alt="pink-blinky logo" />,
		filteredData: (item) => {
			return item.currentEstimate > 7 && item.currentEstimate < 30;
		},
	};

	const group_next_month = {
		timeFrame: 'Next month',
		subLabel: 'Between 15 and 30 days',
		image: (
			<img className="blinkies" src={yellowblinky} alt="yellow-blinky logo" />
		),

		filteredData: (item) => {
			return item.currentEstimate >= 30 && item.currentEstimate < 60;
		},
	};

	const group_inactive = {
		timeFrame: 'Inactive',
		subLabel: '60 days or more',
		image: <img className="blinkies" src={blueblinky} alt="blue-blinky logo" />,
		filteredData: (item) => {
			return item.currentEstimate >= 60;
		},
	};

	const groups = [
		{
			timeFrame: 'This week',
			subLabel: '7 days or less',
			image: <img className="blinkies" src={redblinky} alt="red-blinky logo" />,
			filteredData: (item) => {
				return item.currentEstimate <= 7;
			},
		},
		{
			timeFrame: 'Next week',
			subLabel: 'Between 8 and 14 days',
			image: (
				<img className="blinkies" src={pinkblinky} alt="pink-blinky logo" />
			),
			filteredData: (item) => {
				return item.currentEstimate > 7 && item.currentEstimate < 30;
			},
		},
		{
			timeFrame: 'Next month',
			subLabel: 'Between 15 and 30 days',
			image: (
				<img className="blinkies" src={yellowblinky} alt="yellow-blinky logo" />
			),

			filteredData: (item) => {
				return item.currentEstimate >= 30 && item.currentEstimate < 60;
			},
		},
		{
			timeFrame: 'Inactive',
			subLabel: '60 days or more',
			image: (
				<img className="blinkies" src={blueblinky} alt="blue-blinky logo" />
			),
			filteredData: (item) => {
				return item.currentEstimate >= 60;
			},
		},
	];

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

	const this_week = data.filter(
		(item) => getDaysUntilNextPurchased(item.dateNextPurchased) <= 7,
	);
	const next_week = data.filter(
		(item) =>
			getDaysUntilNextPurchased(item.dateNextPurchased) > 7 &&
			getDaysUntilNextPurchased(item.dateNextPurchased) <= 30,
	);
	const next_month = data.filter(
		(item) =>
			getDaysUntilNextPurchased(item.dateNextPurchased) > 30 &&
			getDaysUntilNextPurchased(item.dateNextPurchased) <= 60,
	);
	let inactive_array = data.filter(
		(item) => getDaysUntilNextPurchased(item.dateNextPurchased) < 0,
	);

	console.log('this_week', this_week);
	console.log('next_week', next_week);
	console.log('next_month', next_month);
	console.log('inactive', inactive_array);

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
									{/* filter through groups array for each group to display by time frame */}
									{/* {groups.map((group) => {
										return (
											<section className="full-list-items">
												<div className="full-list-items-timeframe">
													<span>{group.image}</span>
													<h1>{group.timeFrame}</h1>
												</div>
												<div className="list-titles">
													<h3 className="item-title-1">Item</h3>
													<h3 className="item-title-2">Bought</h3>
													<h3 className="item-title-4">Edit</h3>
													<h3 className="item-title-3">Delete</h3>
												</div>
												{searchResults
													// within each group's filteredData, map through to each item to pass in as a prop
													.filter((item) => group.filteredData(item))
													.map((filteredItem) => {
														return (
															<ListItemMobileView
																compareDuplicate={compareDuplicate}
																key={filteredItem.id}
																item={filteredItem}
																listToken={listToken}
															/>
														);
													})}
											</section>
										);
									})} */}
									{this_week && (
										<div className="this-week-container" id="week-container">
											<h2>THIS WEEK</h2>
											{this_week.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
												/>
											))}
										</div>
									)}
									{next_week && (
										<div className="this-week-container" id="week-container">
											<h2>NEXT WEEK</h2>
											{next_week.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
												/>
											))}
										</div>
									)}
									{next_month !== [] && (
										<div className="this-week-container" id="week-container">
											<h2>NEXT MONTH</h2>
											{next_month.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
												/>
											))}
										</div>
									)}
									{inactive_array !== [] && (
										<div className="this-week-container" id="week-container">
											<h2>INACTIVE</h2>
											{inactive_array.map((item) => (
												<ListItemMobileView
													compareDuplicate={compareDuplicate}
													key={item.id}
													item={item}
													listToken={listToken}
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
