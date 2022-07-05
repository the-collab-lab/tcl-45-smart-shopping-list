import { ListItem } from '../components';

export function List({ data }) {
	console.log('data', data);
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item) => (
					<div key={item.id}>
						<ListItem name={item.name} />
					</div>
				))}
			</ul>
		</>
	);
}
