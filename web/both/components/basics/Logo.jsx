import React from 'react';

import Image from './Image';
import Link from './Link';

export default class Logo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
	
		return (

			<Image
				className={`logo ${this.props.className || ''}`}
				src="/img/logo-panamericana.svg"
				alt="Editorial Médica Panamericana" />

		);

	}
}