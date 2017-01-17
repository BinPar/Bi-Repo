import React from 'react';

export default class Option extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value !== this.props.value) {
			this.setState({ value: nextProps.value });
		}
	}

	handleClick(e) {
		e.preventDefault();
		this.props.onClick && this.props.onClick(this.state.value, this.props.children);
	}

	render() {
		return (
			<div className={`option${this.props.className ? (' ' + this.props.className) : ''}`} onClick={this.handleClick}>
				{this.props.children}
			</div>
		);
	}
}
