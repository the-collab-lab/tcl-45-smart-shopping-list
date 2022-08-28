import './List.css';
import { ListItem } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import redblinky from '../../src/assets/red-blinky.png';
import pinkblinky from '../../src/assets/pink-blinky.png';
import yellowblinky from '../../src/assets/yellow-blinky.png';
import blueblinky from '../../src/assets/blue-blinky.png';

import './List.css';

import pac from '../assets/pac.png';

export function List({ data, listToken, loading, confirmLogOut }) {
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

	const groups = [
		{
			timeFrame: 'This week',
			subLabel: '7 days or less',
			image: <img className="blinkies" src={redblinky} alt="red-blinky logo" />,
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
			image: (
				<img className="blinkies" src={blueblinky} alt="blue-blinky logo" />
			),
			filteredData: (item) => {
				return item.currentEstimate >= 60;
			},
		},
	];

	return (
		<div className="list-container">
			<Toaster />
			{loading ? (
				<p>Your list is loading...</p>
			) : (
				<>
<<<<<<< HEAD
=======
					<button onClick={handleCopy}>
						{!copy ? <span>Copy List Name</span> : <span>Copied!</span>}
					</button>
					<ConfirmDialogWindow
						text={`If you're ready to log out, make sure to write down your list name before you click ok! It is "${listToken}".`}
						title="Log Out"
						confirmAction={confirmLogOut}
					/>
					<p>
						Your list name is{' '}
						<span style={{ color: 'salmon' }}>{listToken}</span>.
					</p>
>>>>>>> a7df4d4 (Remove extra logOut button)
					{data.length >= 1 ? (
						<>
							<h3>Find what you're looking for!</h3>
							<form>
								<label htmlFor="search-items">
									Search Items:{' '}
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
						</>
					) : (
						<>
							<h3>
								Your list is empty! Click the button below to start building
								your list.
							</h3>
							<button onClick={handleNav}>Add Item</button>
						</>
					)}{' '}
				</>
			)}
			<ul>
				<div className="group-container">
					{/* filter through groups array for each group to display by time frame */}
					{groups.map((group) => {
						return (
							<section className={group.timeFrame}>
								<div className="group-title">
									<span>{group.image}</span>
									<h1>{group.timeFrame}</h1>
								</div>
								<div className="list-titles">
									<h3 className="item-title">Item</h3>
									<h3>Bought</h3>
									<h3>Delete</h3>
								</div>
								{searchResults
									// within each group's filteredData, map through to each item to pass in as a prop
									.filter((item) => group.filteredData(item))
									.map((filteredItem) => {
										return (
											<ListItem
												key={filteredItem.id}
												item={filteredItem}
												listToken={listToken}
											/>
										);
									})}
							</section>
						);
					})}
				</div>
			</ul>
		</div>
	);
}
