import React from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import View from '../components/basics/layout/View';

import Scrollbar from '../components/basics/Scrollbar';

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
			<View>
				<section className="content">
					<Scrollbar>
						hey
					</Scrollbar>
				</section>
				<aside>
					heuy
				</aside>
			</View>
		);
	}
}
