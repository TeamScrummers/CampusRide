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
	() => import('./nodes/20'),
	() => import('./nodes/21')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/accept": [3],
		"/admin": [4],
		"/auth": [5],
		"/driveracceptingTest": [7],
		"/driver": [6],
		"/earthquakes": [8],
		"/home": [9],
		"/login": [10],
		"/map": [11],
		"/matching": [12],
		"/matchmakingtest": [13],
		"/notifications": [14],
		"/passenger": [15],
		"/payment": [16],
		"/payment/cancel": [17],
		"/payment/success": [18],
		"/tripenroute": [19],
		"/tripover": [20],
		"/trippickup": [21]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';