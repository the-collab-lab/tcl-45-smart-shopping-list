import { useA11yDialog } from 'react-a11y-dialog';
import { createPortal } from 'react-dom';
import './ConfirmDialogWindow.css';

const ConfirmDialogWindow = ({ text, title, confirmAction }) => {
	const [instance, attr] = useA11yDialog({
		id: 'confirm-dialog',
		role: 'dialog',
		title: 'Confirm action dialog',
	});

	const dialog = createPortal(
		<div {...attr.container} className="dialog-container">
			<div {...attr.overlay} className="dialog-overlay" />

			<div {...attr.dialog} className="dialog-content">
				<h1 {...attr.title} className="dialog-title">
					Confirm Dialog
				</h1>

				<p>{text}</p>

				<button {...attr.closeButton} className="dialog-close">
					x
				</button>
				<button
					type="button"
					className="cancel-action-button"
					onClick={() => {
						instance.hide();
					}}
				>
					Cancel
				</button>
				<button
					type="button"
					className="confirm-action-button"
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
			<button
				className="button-mobile"
				type="button"
				onClick={() => instance.show()}
			>
				{title === 'Log Out' ? 'Log Out' : 'Delete'}
			</button>

			{dialog}
		</>
	);
};

export default ConfirmDialogWindow;
