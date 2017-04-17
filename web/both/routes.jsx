import React from 'react';
import {mount} from 'react-mounter';
import Home from './pages/Home';
import Login from './pages/Login';
import ThisIsPreview from './pages/ThisIsPreview';
import FlexLayout from './layouts/FlexLayout';

if(Meteor.isClient){
	// FlowRouter.wait();
	/*Meteor.subscribe("getUser",()=>{
		FlowRouter.initialize();
	});*/
}

function checkAdmin (ctx, redirect) {
	let userId = Meteor.userId();
	if (Roles.userIsInRole(userId, ["admin"]) == false || !userId) {
		redirect('/');
	}
}

function checkLoggedIn (ctx, redirect) {
	let loggedIn = !!Meteor.userId();
	if (!loggedIn && ctx.path.indexOf('/login') === -1) {
		redirect('/login');
	} else if(loggedIn && ctx.path.indexOf('/login') !== -1) {
		redirect('/');
	}
}


let lastRoute = null;
const setLastRoutePath = (context, redirect, stop) => {
	let newRoutePath = context.path;
	FlowRouter.lastRoutePath = lastRoute;
	lastRoute = newRoutePath;
};

// FlowRouter.triggers.enter([setLastRoutePath, checkLoggedIn]);

FlowRouter.route('/', {
	action(_params) {
		mount(FlexLayout, {
			content: props => <Home {...props} />
		});
	}
});

FlowRouter.route('/login', {
	action(_params) {
		mount(FlexLayout, {
			content: props => <Login {...props} />
		});
	}
});

FlowRouter.route('/preview', {
	name: 'preview',
	action(_params) {
		mount(FlexLayout, {
			content: props => <ThisIsPreview />
		});
	}
});