import React from 'react';

const SHOW_MODAL_EVENT = 'bp.show.modal';

export default class AlertAPI {

	constructor() {

	}

	static alertDefaults = {
		okText: 'OK',
		callback: null,
		scroll: false
	};

	static confirmDefaults = {
		confirmText: 'Si',
		cancelText: 'No',
		confirmFn: null,
		cancelFn: null,
		scroll: false
	};

	static alert(title, message, options) {
		options = Object.assign({}, AlertAPI.alertDefaults, options);
		//window.dispatchEvent(new CustomEvent(SHOW_MODAL_EVENT, { detail: <ModalAlert title={title} message={message} options={options} /> }));
	}

	static confirm(title, message, options) {
		options = Object.assign({}, AlertAPI.confirmDefaults, options);
		//window.dispatchEvent(new CustomEvent(SHOW_MODAL_EVENT, { detail: <ModalConfirm title={title} message={message} options={options}/> }));
	}
}

