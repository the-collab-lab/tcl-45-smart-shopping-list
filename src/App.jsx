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

		return streamListItems(listToken, (snapshot) => {
			const nextData = getItemData(snapshot);
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
								about={about}
								setAbout={setAbout}
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
					<Route
						path="/about"
						element={
							<About
								listToken={listToken}
								setListToken={setListToken}
								about={about}
								setAbout={setAbout}
							/>
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}
