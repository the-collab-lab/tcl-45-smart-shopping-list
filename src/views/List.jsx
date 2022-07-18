import { ListItem } from '../components';
import { useState } from 'react';
import { useEffect } from 'react';

export function List({ data }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState(data);
	// user type in search item - query
	// as letters come in, filters items rendered on page
	// set query to searchQuery
	// render onto page search Results -> setting whatever is filtered into searchResults
	function filterResults(data, searchQuery) {
		return data.filter((item) => item.name.toLowerCase().includes(searchQuery));
	}

	function handleSearch(e) {
		e.preventDefault();
		setSearchQuery(e.target.value);
		// searchQuery acts as filter parameter
		const result = filterResults(data, searchQuery);
		// set as searchResults
		setSearchResults(result);
		return searchResults;
	}

	// useEffect(() => {
	// 	handleSearch();
	// }, []);

	console.log('searchQuery', searchQuery);
	console.log('searchResults', searchResults);
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<form>
				<label htmlFor="search-items-input">
					Search Items:
					<input
						name="search-items"
						id="search-items"
						type="text"
						placeholder="Search items"
						value={searchQuery}
						onChange={handleSearch}
					/>
				</label>
			</form>
			<ul>
				{searchResults.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
