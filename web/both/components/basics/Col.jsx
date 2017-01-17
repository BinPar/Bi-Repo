import React from 'react';

export default class Col extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return <div onScroll={(this.props.onScroll)?this.props.onScroll:null} id={this.props.id} className={`col ${this.props.className || ''}`}>{this.props.children}</div>
	}
}