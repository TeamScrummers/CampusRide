<script>
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { firstName1, lastName1, latestArrival1, firstName2, lastName2, latestArrival2} from './stores.js';
	import { User } from './user.js'; 

	// Stlying for fade effect (I think)
	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	// Test Objects
	let user1 = new User('Zachery', 'McDonald', latestArrival1)
	let user2 = new User('Jason', 'Bourne', latestArrival2)


	// List of data in todo
	let todos = [
		{ id: 1, done: false, description: firstName1 + " " + lastName1},
		{ id: 2, done: false, description: latestArrival1},
		{ id: 3, done: false, description: latestArrival2},
		{ id: 4, done: false, description: "ABS:" + Math.abs(latestArrival2.getTime() - latestArrival1.getTime())},
		{ id: 5, done: false, description: "NORM:" + (latestArrival2.getTime() - latestArrival1.getTime())},
		{ id: 6, done: false, description: user1.compareTime(user1.latestArrival, user2.latestArrival)},
	];
	
	// unique id
	let uid = todos.length + 1;

	// adds to list
	function add(input) {
		const todo = {
			id: uid++,
			done: false,
			description: input.value
		};

		todos = [todo, ...todos];
		input.value = '';
	}
	// removes from list
	function remove(todo) {
		todos = todos.filter(t => t !== todo);
	}
 
	/*
	Two arrivals within 20 min
	1:10 vs 1:20
	x >= y && x <= y
	Requires strict input in 24hr format, e.g. 13:24:00
	Stretch goal is to worry about time zones
	30 min to ms = 1800000 ms
	*/
	// let thirthyMin = 1800000;

	// Useful calls:
	// var.setHours(x,y,z)
	// var.getTime(x,y,z)
</script>

<div class='board'>
	<input
		class="new-todo"
		placeholder="what needs to be done?"
		on:keydown="{event => event.key === 'Enter' && add(event.target)}"
	>

	<div class='left'>
		<h2>todo</h2>
		{#each todos.filter(t => !t.done) as todo (todo.id)}
			<label
				in:receive="{{key: todo.id}}"
				out:send="{{key: todo.id}}"
				animate:flip
			>
				<input type=checkbox bind:checked={todo.done}>
				{todo.description}
				<button on:click="{() => remove(todo)}">x</button>
			</label>
		{/each}
	</div>

	<div class='right'>
		<h2>done</h2>
		{#each todos.filter(t => t.done) as todo (todo.id)}
			<label
				in:receive="{{key: todo.id}}"
				out:send="{{key: todo.id}}"
				animate:flip
			>
				<input type=checkbox bind:checked={todo.done}>
				{todo.description}
				<button on:click="{() => remove(todo)}">x</button>
			</label>
		{/each}
	</div>
</div>

<style>
	.new-todo {
		font-size: 1.4em;
		width: 100%;
		margin: 2em 0 1em 0;
	}

	.board {
		max-width: 36em;
		margin: 0 auto;
	}

	.left, .right {
		float: left;
		width: 50%;
		padding: 0 1em 0 0;
		box-sizing: border-box;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
	}

	label {
		top: 0;
		left: 0;
		display: block;
		font-size: 1em;
		line-height: 1;
		padding: 0.5em;
		margin: 0 auto 0.5em auto;
		border-radius: 2px;
		background-color: #eee;
		user-select: none;
	}

	input { margin: 0 }

	.right label {
		background-color: rgb(180,240,100);
	}

	button {
		float: right;
		height: 1em;
		box-sizing: border-box;
		padding: 0 0.5em;
		line-height: 1;
		background-color: transparent;
		border: none;
		color: rgb(170,30,30);
		opacity: 0;
		transition: opacity 0.2s;
	}

	label:hover button {
		opacity: 1;
	}
</style>

<a href="/">Back</a>