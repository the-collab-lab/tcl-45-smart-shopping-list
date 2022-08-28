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
									<h3>Your list name: </h3>
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
							<div className="footer">
								<NavLink to="/list" className="nav-link">
									SEE LIST
								</NavLink>
								<NavLink to="/add-item" className="nav-link">
									ADD ITEM
								</NavLink>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
