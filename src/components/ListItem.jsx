import './ListItem.css';

export function ListItem({ name }) {
	return (
		<div className="ListItem">
			<input type="checkbox" checked id={`${name}-checkbox`} name={name} />
			<label htmlFor={`${name}-checkbox`}>{name}</label>
		</div>
	);
}
