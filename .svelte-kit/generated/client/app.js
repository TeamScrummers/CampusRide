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
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/accept2": [4],
		"/accept": [3],
		"/admin": [4],
		"/auth": [5],
		"/driveracceptingTest": [7],
		"/driver": [6],
		"/home": [8],
		"/login": [9],
		"/map": [10],
		"/matching": [11],
		"/matchmakingtest": [12],
		"/notifications": [13],
		"/passenger": [14],
		"/payment": [15],
		"/payment/cancel": [16],
		"/payment/success": [17],
		"/tripenroute": [18],
		"/tripover": [19],
		"/trippickup": [20]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';