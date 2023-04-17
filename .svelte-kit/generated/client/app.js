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
		"/accept2": [4],
		"/accept": [3],
		"/admin": [5],
		"/auth": [6],
		"/driver": [7],
		"/home": [8],
		"/login": [9],
		"/map": [10],
		"/matching": [11],
		"/matchmakingtest": [12],
		"/notifications": [13],
		"/passenger": [14],
		"/profile": [15],
		"/tripenroute": [16],
		"/tripover": [17],
		"/trippickup": [18]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';