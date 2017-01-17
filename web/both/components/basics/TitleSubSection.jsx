import React from 'react';
import GoBack from './GoBack';

export default class TitleSubSection extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
	
		return (
			<h3>
				<GoBack />
				{this.props.title}
			</h3>
		)

	}
}