import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Home extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount(){
		DocHead.setTitle(Meteor.settings.public.title);
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}
