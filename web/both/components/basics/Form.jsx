import React from 'react';

export default class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<form
				className={`form ${this.props.className}`}
				ref={this.props.reference}
				autoComplete={this.props.autoComplete}
				onSubmit={this.props.onSubmit}>
				{this.props.children}
			</form>
		)
	}
}
