import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Badge extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<span className={`badge ${this.props.topLeft ? 'topLeft' : this.props.bottomLeft ? 'bottomLeft' : this.props.bottomRight ? 'bottomRight' : 'topRight'} ${this.props.className || ''}`}>
				{this.props.children}
			</span>
		);

	}
}