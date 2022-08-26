import './List.css';
import { ListItem } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pac from '../assets/pac.png';

export function List({ data, listToken, loading }) {
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
			timeFrame: 'Soon',
			subLabel: '7 days or less',
			filteredData: (item) => {
				return item.currentEstimate <= 7;
			},
		},
		{
			timeFrame: 'Kind of soon',
			subLabel: 'Between 7 and 30 days',
			filteredData: (item) => {
				return item.currentEstimate > 7 && item.currentEstimate < 30;
			},
		},
		{
			timeFrame: 'Not that soon',
			subLabel: 'Between 30 and 60 days',
			filteredData: (item) => {
				return item.currentEstimate >= 30 && item.currentEstimate < 60;
			},
		},
		{
			timeFrame: 'Inactive',
			subLabel: '60 days or more',
			filteredData: (item) => {
				return item.currentEstimate >= 60;
			},
		},
	];

	return (
		<div className="list-container">
			{loading ? (
				<p>Your list is loading...</p>
			) : (
				<>
					{data.length >= 1 ? (
						<div>
							<div>
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
							</div>
							<div>
								<ul>
									{groups.map((group) => {
										return (
											<section className={group.timeFrame}>
												<h1>{group.timeFrame}</h1>
												<p>({group.subLabel})</p>
												{searchResults
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
								</ul>
							</div>
						</div>
					) : (
						<div className="empty-list-container">
							<h3>
								Your smart shopping list is currently empty! Start picking
								products to fill your list.
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
		</div>
	);
}
