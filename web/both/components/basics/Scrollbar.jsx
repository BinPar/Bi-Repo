import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

export default class Scrollbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getScrollbarElement() {
		return this.refs.scrollbar;
	}

	render() {
		return(
			<div className='scrollbarHolder'>
				<Scrollbars
					{...this.props}
					ref="scrollbar"
					renderThumbVertical={this.renderThumbVertical}
					autoHide={true}
					autoHideTimeout={1000}
					autoHideDuration={200} >
					{this.props.children}
				</Scrollbars>
			</div>
		)
	}
}
