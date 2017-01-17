import React from 'react';
import LoadingPage from '../pages/LoadingPage';
import Header from '../components/basics/layout/Header';
import Sidebar from '../components/basics/layout/Sidebar';

const CLOSE_MODAL_EVENT = 'bp.close.show';

export default class FlexLayout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// loaded: !!BinPar.ready,
			showModal: false,
			modal: null
		};
		/*if(!BinPar.ready) BinPar.onLoad(()=> {
			this.setState({loaded: true});
		});
		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);*/
	}

	componentDidMount() {
		/*window.addEventListener(SHOW_MODAL_EVENT, this.handleModalOpen);
		window.addEventListener(CLOSE_MODAL_EVENT, this.handleModalClose);*/
	}


	componentDidUpdate() {
		let metaInfo = {name: "viewport", content: "width=device-width, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0"};
		DocHead.addMeta(metaInfo);
	}

	componentWillUnmount() {
		/*window.removeEventListener(SHOW_MODAL_EVENT, this.handleModalOpen);
		window.removeEventListener(CLOSE_MODAL_EVENT, this.handleModalClose);*/
	}

	/*handleModalOpen(event) {
		let modal = event.detail;
		this.setState({showModal: true, modal })
	}

	handleModalClose() {
		this.setState({showModal: false, modal: null })
	}*/

	render() {
		let user = Meteor.user();
		if(Meteor.loggingIn()) {
			return (
				<section className="main">
					<LoadingPage />
				</section>
			);
		} else {
			return (
				<div id="flexSiteHolder" >
					<Header />
					<section className="mainSection">
						<section className="content">
							{this.props.content()}
						</section>
						<Sidebar inicio />
					</section>
					{this.state.showModal ? this.state.modal : null}
				</div>
			);
		}
	}
}
