import './Layout.css';
import { Outlet, NavLink } from 'react-router-dom';

export function Layout({ listToken, logOut }) {
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
							<header className="header">
								<div className="header-left">
									<h3>Your list: </h3>
									<h3>{listToken}</h3>
								</div>
								<div className="header-center">
									<h3>COPY NAME BUTTON</h3>
								</div>
								<div className="header-right">
									<button onClick={logOut}>Log Out</button>
								</div>
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
