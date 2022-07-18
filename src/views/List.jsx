import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	function handleSearch(e) {
		e.preventDefault();
		setSearchQuery(e.target.value);
		let filteredResults = [...searchResults];
		console.log('filteredResults', filteredResults);
		console.log('data', data);

		filteredResults = data.filter((item) => console.log('item', item));

		setSearchResults(filteredResults);
	}
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
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
