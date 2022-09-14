import './About.css';
import { useNavigate } from 'react-router-dom';
export function About({ about, setAbout, listToken }) {
	const navigateTo = useNavigate();

	const handleHome = () => {
		navigateTo('/');
		setAbout(false);
	};

	return (
		<div className="about-page-container">
			<header className="about-header">
				<h1>About</h1>
				{about && !listToken && (
					<button className="about-button" onClick={handleHome}>
						Back
					</button>
				)}
			</header>
			<article className="about-article">
				<h2 className="article-title">What is Shop-Ade</h2>
				<p>
					<b>Shop-Ade</b> is a smart shopping list that learns your buying
					habits and helps you remember what you need to buy on your next trip
					to the store.
				</p>
			</article>
			<article className="about-article">
				<h2 className="article-title">How to use Shop-Ade</h2>
				<p>
					Getting started with <b>Shop-Ade</b> is easy!
				</p>
				<p>
					On your first visit, simply create a new list and start adding the
					items that you need to purchase. Include the frequency at which you
					typically buy them to help the app get smarter (do you buy toilet
					paper on the weekly? lobster rolls every month?).
				</p>
				<p>
					Once you have a few items in your list, the app will help keep you
					organized by managing your purchase frequency. Did you mark 'lobster
					rolls' as a 'not so soon' purchase, but then you bought them today? We
					will help you better understand that maybe, in fact, you tend to
					purchase them weekly (or daily?!) instead of monthly. Next time you
					look at your list, you'll see the adjustments to your typical purchase
					timelines. We're here for your organizing needs.
				</p>
				<p>
					You can interact with your list items to help the app get even
					smarter: mark the items as purchased (if you mark an item as purchased
					within the timeframe you selected, it will stay in the specified
					timeframe bucket; if you purchase an item sooner or later than you
					thought, it will move timeframe buckets accordingly); edit the item as
					you wish; and delete it when/if you're finished (actually, we don't
					need those monthly lobster rolls...).
				</p>
				<p>
					The more you use the app the more it learns your behaviors! Have fun!
				</p>
				<details className="about-details">
					<summary className="about-summary">Getting Started</summary>
					To get started with your first list - click Create button in the Home
					screen. To join an already existing list - enter the list name in the
					first field.
				</details>
				<details className="about-details">
					<summary className="about-summary">Adding Item</summary>
					If you want to add an item to your list - click on Add Item button,
					enter the item name, select the time frame when you want to buy this
					item out of three options - this week, next week and next month.
				</details>
				<details className="about-details">
					<summary className="about-summary">Editing Item</summary>
					If you made a mistake when entering the item name - you can re-enter
					the name by selecting Submit button. Click Submit when you finish
					correcting the item name. The name will immediately be updated.
				</details>
				<details className="about-details">
					<summary className="about-summary">Deleting Item</summary>
					If you want to delete an item from your list - click the X button near
					the item name. You will see a confirmation dialog, if you select OK in
					the dialog window the item will immediately be deleted.
				</details>
				<details className="about-details">
					<summary className="about-summary">Marking Item as Purchased</summary>
					If you bought an item - mark it as purchased in the list by putting a
					checkmark. The item will uncheck itself after 24 hours. The app will
					use the purchase information to predict next purchase and will move
					the item to one of the four time frames. If you marked something as
					purchased by mistake you can uncheck it manually. The item purchase
					history will be restored.
				</details>
				<details className="about-details">
					<summary className="about-summary">Sharing List</summary>
					To share the list - click Copy Name button, the list name will be
					copied to the clipboard so you can send it to others.
				</details>
				<details className="about-details">
					<summary className="about-summary">Logging Out</summary>If you want to
					leave the list - click Log Out button. You will see a confirmation
					dialog asking you to proceed with the action or cancel it. If you
					select OK, the window will close and you will be transferred to the
					Home screen.
				</details>
			</article>
			<article className="about-article">
				<h2 className="article-title">Creators</h2>
				<p>
					Shop-Ade was developed by the TCL-45 team of The Collab Lab. We used
					React.js, Firebase/Firestore, CSS styling, and lots of teamwork magic
					to create it. The application theme is inspired the old-school arcade
					games, especially, <b>Pac-Man</b>. We worked remotedly using Agile
					methodology for two months. Our amazing and supportive mentors are{' '}
					<a
						href="https://github.com/lindseyindev"
						target="_blank"
						rel="noreferrer"
					>
						<b>Lindsey Dinkel</b>
					</a>
					,
					<a
						href="https://github.com/zeeatwork"
						target="_blank"
						rel="noreferrer"
					>
						<b>Zenzi Ali</b>
					</a>
					,
					<a
						href="https://github.com/nickytonline"
						target="_blank"
						rel="noreferrer"
					>
						<b>Nick Taylor</b>
					</a>
					{' and '}
					<a href="https://github.com/mxmason" target="_blank" rel="noreferrer">
						<b>EJ Mason</b>
					</a>
					.
				</p>
				<ul>
					Team members:
					<li className="teammate">
						<a
							href="https://github.com/michellerenehey"
							target="_blank"
							rel="noreferrer"
							className="linkedin-link"
						>
							<b>Michelle Nygren</b>
						</a>
					</li>
					<li className="teammate">
						<a
							href="https://github.com/mira-kine"
							target="_blank"
							rel="noreferrer"
							className="linkedin-link"
						>
							<b>Mira Kinebuchi</b>
						</a>
					</li>
					<li className="teammate">
						<a
							href="https://github.com/N-Zubko"
							target="_blank"
							rel="noreferrer"
							className="linkedin-link"
						>
							<b>Nadia Zubko</b>
						</a>
					</li>
					<li className="teammate">
						<a
							href="https://github.com/Trevor-Rezac"
							target="_blank"
							rel="noreferrer"
							className="linkedin-link"
						>
							<b>Trevor Rezac</b>
						</a>
					</li>
				</ul>
			</article>
		</div>
	);
}
