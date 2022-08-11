import { ListItem } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';
// import { comparePurchaseUrgency } from '../api';

export function List({ data, listToken, loading }) {
	// const sortedData = comparePurchaseUrgency(data)
	// console.log('sortedData', sortedData)
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const navigateTo = useNavigate();
	// user type in search item - query
	// as letters come in, filters items rendered on page
	// set query to searchQuery
	// render onto page search Results -> setting whatever is filtered into searchResults
	// console.log('data from List', data);

	function filterResults(query) {
		return data.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase()),
		);
	}

	useEffect(() => {
		setSearchResults(filterResults(searchQuery));

		// ignoring dependency array warning for now
		// adding filterResults causes infinite re-render
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	function handleClearSearchQuery() {
		setSearchQuery('');
	}

	function handleNav() {
		navigateTo('/add-item');
	}

	//based on previousEstimate, decide 'soon', etc..
	//4 groups, within each group
	//order items by previousEstimate within the group
	//then alphabetize

	const groups = [
		{
			timeFrame: 'Soon',
			subLabel: '7 days or less',
			filteredData: data.filter((item) => {
				return item.previousEstimate <= 7;
			}),
		},
		{
			timeFrame: 'Kind of soon',
			subLabel: 'Between 7 and 30 days',
			filteredData: data.filter((item) => {
				return item.previousEstimate > 7 && item.previousEstimate < 30;
			}),
		},
		{
			timeFrame: 'Not that soon',
			subLabel: 'Between 30 and 60 days',
			filteredData: data.filter((item) => {
				return item.previousEstimate >= 30 && item.previousEstimate < 60;
			}),
		},
		{
			timeFrame: 'Inactive',
			subLabel: '60 days or more',
			filteredData: data.filter((item) => {
				return item.previousEstimate >= 60;
			}),
		},
	];

	console.log('groups', groups);
	return (
		<div className="list-container">
			{loading ? (
				<p>Your list is loading...</p>
			) : (
				<>
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
				{!searchQuery
					? data.map((item) => (
							<ListItem key={item.id} item={item} listToken={listToken} />
					  ))
					: searchResults.map((item) => (
							<ListItem key={item.id} item={item} listToken={listToken} />
					  ))}
			</ul>
		</div>
	);
}
