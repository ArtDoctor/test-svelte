<script>
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
	let polls = [{
		question: 'What do you code with?',
		answerA: 'Python',
		answerB: 'JS',
		answerC: 'Other',
		votesA: 3,
		votesB: 14,
		votesC: 17,
		id: 1
	}];

	const handleAdd = (e) => {
		const poll = e.detail;
		polls = [poll, ...polls];
		console.log(polls);
		activeItem = 'Current Polls';
	};

	const handleVote = (e) => {
		const {option, id} = e.detail;

		let copiedPolls = [...polls];
		let upvotedPoll = copiedPolls.find(poll => poll.id == id);

		if (option === 'a'){
			upvotedPoll.votesA++;
		}
		if (option === 'b'){
			upvotedPoll.votesB++;
		}
		if (option === 'c'){
			upvotedPoll.votesC++;
		}

		polls = copiedPolls;
	};
</script>

<Header />
<main>
	<Tabs {activeItem} {items} on:tabChange={tabChange}></Tabs>
	<p>This is a polls app. What would you choose?</p>
	{#if activeItem === 'Current Polls'}
		<PollList {polls} on:vote={handleVote}/>
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