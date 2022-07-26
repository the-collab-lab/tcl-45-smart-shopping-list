import { ListItem } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function List({ data }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const navigateTo = useNavigate();
	// user type in search item - query
	// as letters come in, filters items rendered on page
	// set query to searchQuery
	// render onto page search Results -> setting whatever is filtered into searchResults

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

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{data.length > 1 ? (
				<form>
					<label htmlFor="search-items">
						Search Items:
						<input
							name="search-items"
							id="search-items"
							type="text"
							placeholder="Search items"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{searchQuery ? (
							<button type="button" onClick={handleClearSearchQuery}>
								Clear search
							</button>
						) : (
							''
						)}
					</label>
				</form>
			) : (
				<button onClick={handleNav}>Add Item</button>
			)}

			<ul>
				{!searchQuery
					? data.map((item) => <ListItem key={item.id} name={item.name} />)
					: searchResults.map((item) => (
							<ListItem key={item.id} name={item.name} />
					  ))}
			</ul>
		</>
	);
}
