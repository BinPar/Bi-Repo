import React from 'react';

export default class SectionTitle extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
	
		return (
			<h2>
				{this.props.title}
			</h2>
		)

	}
}