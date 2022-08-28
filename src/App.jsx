import './App.css';

import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AddItem, Home, Layout, List, About } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import toast from 'react-hot-toast';

export function App() {
	const navigateTo = useNavigate();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [confirmLogOut, setConfirmLogOut] = useState(false);
	const [copy, setCopy] = useState(false);
	const [about, setAbout] = useState(false);

	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 *
	 * `listToken` is `my test list` by default so you can see the list
	 * of items that was prepopulated for this project.
	 * You'll later set it to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when you allow a user
	 * to create and join a new list.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	function handleClick() {
		const token = generateToken();
		setListToken(token);
		navigateTo('/list');
	}

	useEffect(() => {
		if (!listToken) return;

		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database; then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */
		return streamListItems(listToken, (snapshot) => {
			/**
			 * Read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 */
			const nextData = getItemData(snapshot);

			/** Finally, we update our React state. */
			setData(nextData);
			setLoading(false);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listToken]);

	useEffect(() => {
		if (confirmLogOut) {
			localStorage.clear();
			setListToken('');
			navigateTo('/');
			setConfirmLogOut(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [confirmLogOut]);

	function handleCopy() {
		setCopy(true);
		navigator.clipboard.writeText(`${listToken}`);
		toast.success('Copied!');
		setTimeout(() => {
			setCopy(false);
		}, 2000);
	}

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<Layout
							listToken={listToken}
							handleCopy={handleCopy}
							copy={copy}
							confirmLogOut={setConfirmLogOut}
							setAbout={setAbout}
							about={about}
						/>
					}
				>
					<Route
						index
						element={
							<Home
								handleClick={handleClick}
								listToken={listToken}
								setListToken={setListToken}
							/>
						}
					/>
					<Route
						path="/list"
						element={
							<List
								data={data}
								loading={loading}
								listToken={listToken}
								confirmLogOut={setConfirmLogOut}
							/>
						}
					/>

					<Route
						path="/add-item"
						element={
							<AddItem
								listToken={listToken}
								itemList={data}
								setData={setData}
							/>
						}
					/>
					<Route path="/about" element={<About />} />
				</Route>
			</Routes>
		</div>
	);
}
