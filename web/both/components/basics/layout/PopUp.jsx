import React from 'react';
import Scrollbar from '../Scrollbar';

export default class PopUp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div id={this.props.id} className={`popUp ${this.props.className || ''}`}>
				<div className="inner">
					<Scrollbar>
						<section className="modal">
							{this.props.children}
						</section>
					</Scrollbar>
				</div>
			</div>
		);
	}
}