import React from 'react';
import TitleSection from '../TitleSection';

export default class SubSectionHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<header className="sectionHeader" >
				<TitleSection pageMode={this.props.pageMode} title={this.props.title}/>
				{this.props.children}
			</header>
		)

	}
}