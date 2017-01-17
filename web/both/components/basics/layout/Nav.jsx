import React from 'react';

import UserZone from '../../UserZone';

export default class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		};

		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.setState({showMenu: !this.state.showMenu});
	}

	render() {
	
		return (

			<nav id="navigation">
			</nav>

		);

	}
}