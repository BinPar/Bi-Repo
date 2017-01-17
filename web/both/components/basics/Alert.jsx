import React from 'react';

export default class Alert extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
	
		return <p className={`alertMessage ${this.props.className || ''}`}>{this.props.children}</p>

	}
}