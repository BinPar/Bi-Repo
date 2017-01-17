import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

export default class View extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
	
		return (

			<section id={this.props.id} className={`view ${this.props.className || ''}`} >

				{this.props.children}

			</section>

		);

	}
}