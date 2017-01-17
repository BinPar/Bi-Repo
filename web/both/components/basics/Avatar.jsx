import React from 'react';

import Image from '../basics/Image';
import Field from '../basics/Field';

export default class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			editProfile: false,
			userInfo:Meteor.user(),
		};
		this.onChangeAvatar = this.onChangeAvatar.bind(this);
	}



	onChangeAvatar(e){
		let that = this;
		let file = e.target.files[0];
		let formData = new FormData();

		// Create an image
		let img = document.createElement("img");
		// Create a file reader
		let reader = new FileReader();
		// Set the image once loaded into file reader
		reader.onload = function(e) {
			img.src = e.target.result;

			let canvas = document.createElement("canvas");
			let ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);

			let MAX_WIDTH = 300;
			let MAX_HEIGHT = 300;
			let width = img.width;
			let height = img.height;

			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}
			canvas.width = width;
			canvas.height = height;
			ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, width, height);

			let dataurl = canvas.toDataURL("image/png");
			let blob = that.dataURItoBlob(dataurl);
			formData.append('file', blob);

			that._makeAsyncUpload(formData, (err)=>{
				if (err) {
					console.log(err);
				} else {
					that.setState({edit:true, avatarId: (that.state.userInfo.profile.avatar)?that.state.userInfo.profile.avatar.data:null});
				}
			});
		};
		// Load files into file reader
		reader.readAsDataURL(file);
	}

	dataURItoBlob(dataURI) {
		let byteString = atob(dataURI.split(',')[1]);
		let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		let ab = new ArrayBuffer(byteString.length);
		let ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], {type: mimeString});
	}

	_makeAsyncUpload(formData, callback) {
		let xhr = new XMLHttpRequest();

		function getError() {
			return new Meteor.Error(xhr.statusText + " - " + xhr.status,
				"Fallo en la subida del backup");
		}

		xhr.addEventListener("load", function () {
			if (xhr.status < 400) {
				callback && callback(null, true);
			}
			else {
				callback && callback(getError());
			}
		});

		xhr.addEventListener("error", function () {
			callback && callback(getError());
		});

		xhr.addEventListener("abort", function () {
			callback && callback(new Meteor.Error("Aborted",
				"The upload has been aborted by the user"));
		});

		xhr.open("POST", window.location.origin + '/userAvatarUpload?uid='+Meteor.userId(), true);

		xhr.send(formData);
	}


	_getPresentationContent() {
		if(this.state.userInfo.profile.avatar){
			let userId = Meteor.userId();
			return userId? ('/userAvatar?id=' + userId + '&v=' + new Date().getTime()) : '';
		}else{
			return null;
		}
	}

	render() {

		let img = this._getPresentationContent();
		return (
			<figure className="selectAvatar">
				<Image
					src={(img)?img:"/img/profile-img.jpg"}
					className='avatar'
					title='Thumbnail'
					alt='Thumbnail' />
				{this.props.editProfile == true || this.props.editProfile == null? <Field
					propsInput = {{"onChange":this.onChangeAvatar}}
					className='uploadImage'
					type='file'
					accept='image/*' /> : null }
			</figure>
		)
	}
}
