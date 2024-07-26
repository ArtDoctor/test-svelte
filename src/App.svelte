<script>
    import PollStore from './stores/PollStore.js';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import PollList from './components/PollList.svelte';
	import Tabs from './shared/Tabs.svelte';
	import PollForm from './components/CreatePollForm.svelte';

	// tabs
	let items = ['Current Polls', 'Add New Poll'];
	let activeItem = items[0];

	const tabChange = (e) => {
		activeItem = e.detail;
	};

	// polls
	const handleAdd = (e) => {
		activeItem = 'Current Polls';
	};
</script>

<Header />
<main>
	<Tabs {activeItem} {items} on:tabChange={tabChange}></Tabs>
	<p>This is a polls app. What would you choose?</p>
	{#if activeItem === 'Current Polls'}
		<PollList/>
	{:else if activeItem === 'Add New Poll'}
		<PollForm on:addPoll={handleAdd}/>
	{:else}
		<p>404 Not Found</p>
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
	p {
		text-align: center;
		color: #333;
	}
</style>