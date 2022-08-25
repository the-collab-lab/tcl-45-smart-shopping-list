import { useA11yDialog } from 'react-a11y-dialog';
import { createPortal } from 'react-dom';

const CustomDeleteDialog = (text) => {
	// `instance` is the `a11y-dialog` instance.
	// `attr` is an object with the following keys:
	// - `container`: the dialog container
	// - `overlay`: the dialog overlay (sometimes called backdrop)
	// - `dialog`: the actual dialog box
	// - `title`: the dialog mandatory title
	// - `closeButton`:  the dialog close button
	const [instance, attr] = useA11yDialog({
		// The required HTML `id` attribute of the dialog element, internally used
		// a11y-dialog to manipulate the dialog.
		id: 'my-dialog',
		// The optional `role` attribute of the dialog element, either `dialog`
		// (default) or `alertdialog` to make it a modal (preventing closing on
		// click outside of ESC key).
		role: 'dialog',
		// The required dialog title, mandatory in the document
		// to provide context to assistive technology.
		title: 'My dialog',
	});

	const dialog = createPortal(
		<div {...attr.container} className="dialog-container">
			<div {...attr.overlay} className="dialog-overlay" />

			<div {...attr.dialog} className="dialog-content">
				<h1 {...attr.title} className="dialog-title">
					Confirm Dialog
				</h1>

				<p>{text.props}</p>

				<button {...attr.closeButton} className="dialog-close">
					X
				</button>
				<button type="button" className="delete-cancel-button" onClick="">
					Cancel
				</button>
				<button type="button" className="delete-confirm-button" onClick="">
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

export default CustomDeleteDialog;
