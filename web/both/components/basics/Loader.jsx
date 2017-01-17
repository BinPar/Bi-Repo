import React from 'react';

export default class Loader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (

			<div className={`loader ${this.props.className || ''}`}>
				<div className="outer">
					<div className="inner"></div>
				</div>
			</div>

		)
	}

}
