import React from 'react';

import Nav from './Nav';
import TitlePage from '../TitlePage';

export default class Sidebar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
	
		return (

			<aside id="sidebar">
				{this.props.inicio ? (
					<div className="inicio">
						hey
					</div>
				) : (
					<div>
						canvas
					</div>
				)}
			</aside>

		);

	}
}