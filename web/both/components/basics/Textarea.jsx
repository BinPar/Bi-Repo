import React from 'react';

export default class Textarea extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	getValue() {
		if(this.refs.textArea) {
			return this.refs.textArea.value;
		}
		return null;
	}

	render() {

		return (
			<textarea
				className={`textarea ${this.props.className || ''}`}
				{...this.props}
				ref="textArea"
				disabled={this.props.disabled} >
				{this.props.value}
			</textarea>
		)
	}
}
