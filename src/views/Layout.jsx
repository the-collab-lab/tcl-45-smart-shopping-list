import './Layout.css';
import { Outlet, NavLink } from 'react-router-dom';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout">
				{!listToken && (
					<main className="Layout-main">
						<Outlet />
					</main>
				)}
				<div className="layout-container">
					{listToken && (
						<>
							<header className="app-header">
								<h1>HELLO!</h1>
							</header>
							<main className="Layout-main">
								<Outlet />
							</main>
							<div className="nav">
								<NavLink to="/list" className="Nav-link">
									List
								</NavLink>
								<NavLink to="/add-item" className="Nav-link">
									Add Item
								</NavLink>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
