import './Layout.css';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../../src/assets/shop-ade.png';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>
						<img
							src={logo}
							alt="Bright yellow and orange logo that says SHOP-ADE in all caps."
						/>
					</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					{!listToken && (
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
					)}
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
