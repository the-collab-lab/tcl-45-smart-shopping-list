import './About.css';

export function About() {
	return (
		<>
			<h1>About</h1>
			<article className="about-article">
				<h2 className="article-title">What is Shop-Ade</h2>
				<p>
					<b>Shop-Ade</b> is a smart shopping list that learns your buying
					habits and helps you remember what you need to buy on your next trip
					to the store. Each time you buy the item, you mark it as purchased in
					the list. Over time, the app comes to understand the intervals at
					which you buy different items. If an item is likely to be due to be
					bought soon, it rises to the top of the shopping list.
				</p>
			</article>
			<article className="about-article">
				<h2 className="article-title">How to use Shop-Ade</h2>

				<ul>
					<li>
						To get started with your first list - click Create button in the
						Home screen.
					</li>
					<li>
						To join an already existing list - enter the list name in the first
						field.
					</li>
					<li>
						If you want to add an item to your list - click on Add Item button,
						enter the item name, select the time frame when you want to buy this
						item out of three options - "soon", which means within 7 days, "kind
						of soon" which means within 8-14 days, "not so soon", which means
						within 15-30 days.
					</li>
					<li>
						If made a mistake when entering the item name - you can re-enter the
						name by selecting Submit button. Click Submit when you finish
						correcting the item name. The name will be immediately updated.
					</li>
					<li>
						If you want to delete an item from your list - click X button near
						the item name. You will see a confirmation dialog, if you select OK
						in the dialog window the item will be immediately deleted.
					</li>
					<li>
						If you bought an item - mark it as purchased in the list by putting
						a checkmark. The item will uncheck itself after 24 hours. The app
						will use the purchase information to predict next purchase and will
						move the item to one of the four time frames.
					</li>
					<li>
						If you marked something as purchased by mistake you can uncheck it
						manually. The item purchase history will be restored.
					</li>
					<li>
						To share the list - click Copy Name button, the list name will be
						copied to the clipboard so you can send it to others.
					</li>
					<li>
						If you want to leave the list - click Log Out button. You will see a
						confirmation dialog asking you to proceed with the action or cancel
						it. If you select OK, the window will close and you will be
						transferred to the Home screen.
					</li>
				</ul>
			</article>
			<article className="about-article">
				<h2 className="article-title">Creators</h2>
				<p>
					Shop-Ade was developed by the TCL-45 team of The Collab Lab. We used
					React.js, Firebase/Firestore, CSS styling, and lots of teamwork magic
					to create it. The application theme is inspired the old-school arcade
					games, especially, <b>Pac-Man</b>. We worked remotedly using Agile
					methodology for two months. Our amazing and supportive mentors are{' '}
					<b>Lindsey Dinkel</b>,<b>Zenzi Ali</b>, <b>Nick Taylor</b> and{' '}
					<b>EJ Mason</b>.
				</p>
				<ul>
					Team members:
					<li>
						<a
							href="https://github.com/michellerenehey"
							target="_blank"
							rel="noreferrer"
							className="linkedin-link"
						>
							<b>Michelle Nygren</b>
						</a>
					</li>
					<li>
						<a
							href="https://github.com/mira-kine"
							target="_blank"
							rel="noreferrer"
							className="linkedin-link"
						>
							<b>Mira Kinebuchi</b>
						</a>
					</li>
					<li>
						<a
							href="https://github.com/N-Zubko"
							target="_blank"
							rel="noreferrer"
							className="linkedin-link"
						>
							<b>Nadia Zubko</b>
						</a>
					</li>
					<li>
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
		</>
	);
}
