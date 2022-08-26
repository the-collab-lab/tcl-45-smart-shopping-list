import { useA11yDialog } from 'react-a11y-dialog';
import { createPortal } from 'react-dom';
import './ConfirmDialogWindow.css';

const ConfirmDialogWindow = ({ text, confirmAction }) => {
	// `instance` is the `a11y-dialog` instance.
	// `attr` is an object with the following keys:
	// - `container`: the dialog container
	// - `overlay`: the dialog overlay (sometimes called backdrop)
	// - `dialog`: the actual dialog box
	// - `title`: the dialog mandatory title
	// - `closeButton`:  the dialog close button
	const [instance, attr] = useA11yDialog({
		id: 'confirm-delete-dialog',
		role: 'dialog',
		title: 'Confirm delete dialog',
	});

	const dialog = createPortal(
		<div {...attr.container} className="dialog-container">
			<div {...attr.overlay} className="dialog-overlay" />

			<div {...attr.dialog} className="dialog-content">
				<h1 {...attr.title} className="dialog-title">
					Confirm Delete Dialog
				</h1>

				<p>{text}</p>

				<button {...attr.closeButton} className="dialog-close">
					<img
						src="../../public/img/x.png"
						width="16"
						height="16"
						alt="close dialog button"
					/>
				</button>
				<button
					type="button"
					className="delete-cancel-button"
					onClick={() => {
						instance.hide();
					}}
				>
					Cancel
				</button>
				<button
					type="button"
					className="delete-confirm-button"
					onClick={() => {
						confirmAction(true);
						instance.hide();
					}}
				>
					OK
				</button>
			</div>
		</div>,
		document.body,
	);

	return (
		<>
			<button type="button" onClick={() => instance.show()}>
				X
			</button>
			{dialog}
		</>
	);
};

export default ConfirmDialogWindow;