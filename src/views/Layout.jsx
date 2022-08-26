import './Layout.css';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../../src/assets/shop-ade.png';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout">
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					{listToken && (
						<>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						</>
					)}
				</nav>
			</div>
		</>
	);
}
