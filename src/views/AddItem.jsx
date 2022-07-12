export function AddItem() {
	return (
		<div>
			<form>
				<div>
					<label for="item-name">
						Item Name:
						<input
							type="text"
							name="item-name"
							id="item-name"
							placeholder="name of item"
						/>
					</label>
				</div>
				<div>
					<label for="soon">
						<input
							type="radio"
							value=""
							checked="checked"
							name="time-frame"
							id="soon"
						/>
						Soon
					</label>
				</div>
				<div>
					<label for="kind-of-soon">
						<input type="radio" name="time-frame" id="kind-of-soon" />
						Kind of Soon
					</label>
				</div>
				<div>
					<label for="not-soon">
						<input type="radio" name="time-frame" id="not-soon" />
						Not Soon
					</label>
				</div>
				<button>Add Item</button>
			</form>
		</div>
	);
}
