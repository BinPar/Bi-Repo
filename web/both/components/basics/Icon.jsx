import React from 'react';

export default class Icon extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div onClick={(this.props.onClick)?this.props.onClick:null} className={`iconHolder ${this.props.className || ''}`}>
				<div className={`icon ${this.props.iconClass || ''}`}></div>
			</div>
		);
	}
}
