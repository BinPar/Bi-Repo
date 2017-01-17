import React from 'react';
import Link from '../components/basics/Link';
import Loader from '../components/basics/Loader';

export default class LoadingPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {

		return <Loader />

	}

}