import React from 'react';
import TitleSubSection from '../TitleSubSection';

export default class SubSectionHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<header className="sectionHeader">
				<TitleSubSection goBack={this.props.goBack} title={this.props.title} />
				{this.props.children}
			</header>
		)

	}
}