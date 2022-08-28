import './Layout.css';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import ConfirmDialogWindow from '../components/ConfirmDialogWindow';

export function Layout({
	listToken,
	handleCopy,
	copy,
	confirmLogOut,
	about,
	setAbout,
}) {
	const navigateTo = useNavigate();

	const handleAbout = () => {
		setAbout(true);
		navigateTo('/about');
	};

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
									<button onClick={handleCopy} className="copy-button">
										{!copy ? <span>Copy List Name</span> : <span>Copied!</span>}
									</button>
								</div>
								<div className="header-right">
									<ConfirmDialogWindow
										text={`If you're ready to log out, make sure to write down your list name before you click ok! It is "${listToken}".`}
										title="Log Out"
										confirmAction={confirmLogOut}
									/>
								</div>
								<div>
									{' '}
									<button className="copy-button" onClick={handleAbout}>
										About
									</button>
								</div>
							</header>
							<main className="Layout-main">
								<Outlet />
							</main>
							{!about && (
								<div className="footer">
									<NavLink to="/list" className="nav-link">
										SEE LIST
									</NavLink>
									<NavLink to="/add-item" className="nav-link">
										ADD ITEM
									</NavLink>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
}
