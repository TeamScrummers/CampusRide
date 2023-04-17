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
<<<<<<< HEAD
	() => import('./nodes/19')
=======
	() => import('./nodes/19'),
	() => import('./nodes/20')
>>>>>>> matchmaking
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/accept": [3],
<<<<<<< HEAD
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
		"/settings": [16],
		"/tripenroute": [17],
		"/tripover": [18],
		"/trippickup": [19]
=======
		"/admin": [4],
		"/auth": [5],
		"/driver": [6],
		"/home": [7],
		"/login": [8],
		"/map": [9],
		"/matching": [10],
		"/notifications": [11],
		"/passenger": [12],
		"/payment": [13],
		"/payment/cancel": [14],
		"/payment/success": [15],
		"/profile": [16],
		"/settings": [17],
		"/tripenroute": [18],
		"/tripover": [19],
		"/trippickup": [20]
>>>>>>> matchmaking
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';