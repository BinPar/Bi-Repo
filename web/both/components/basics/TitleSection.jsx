import React from 'react';
import GoBack from './GoBack';

export default class TitleSection extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
	
		return (
			<h2>
				{this.props.pageMode ? <GoBack /> : null}
				{this.props.title}
			</h2>
		)

	}
}