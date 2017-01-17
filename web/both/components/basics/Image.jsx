import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Image extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			subscription: {
			},
		};
	}

	render() {

		return <img
					id={this.props.id}
					className={`img ${this.props.className || ''}`}
					src={this.props.src}
					alt={this.props.alt}
					title={this.props.title ? this.props.title : this.props.alt}
					data-pin-nopin />
	}
}
