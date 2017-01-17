import React from 'react';

export default class Row extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
	
		return <div onScroll={(this.props.onScroll)?this.props.onScroll:null} id={this.props.id} style={this.props.style} className={`row ${this.props.className || ''}`}>{this.props.children}</div>

	}
}