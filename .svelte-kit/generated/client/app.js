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
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/accept": [3],
		"/admin": [4],
		"/auth": [5],
		"/driver": [6],
		"/home": [7],
		"/login": [8],
		"/map": [9],
		"/matching": [10],
		"/notifications": [11],
		"/payment": [12],
		"/payment/cancel": [13],
		"/payment/success": [14],
		"/tripComplete": [15],
		"/tripenroute": [16],
		"/tripover": [17],
		"/trippickup": [18]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';