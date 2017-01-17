import React from 'react';
import Icon from './Icon';

export default class GoBack extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
		this.volver=this.volver.bind(this);
	}

	volver() {
		//FlowRouter.go(FlowRouter.lastRoutePath);
		window.history.back();
	}

	render() {

		return (
			<Icon className="goBack" onClick={this.volver} />
		);
	}
}
