export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/accept": [3],
		"/admin": [4],
		"/auth": [5],
		"/home": [6],
		"/login": [7],
		"/map": [8],
		"/matching": [9],
		"/notifications": [10],
		"/payment": [11],
		"/payment/cancel": [12],
		"/payment/success": [13],
		"/tripcomplete": [14],
		"/tripenroute": [15],
		"/tripover": [16],
		"/trippickup": [17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';