import React from 'react';

export default class Button extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<button
				onBlur={this.props.onBlur}
				onClick={this.props.onClick}
				className={`${this.props.noStyle ? '' : 'button'} ${this.props.className || ''}`} >
				{this.props.children}
			</button>
		)
}
}