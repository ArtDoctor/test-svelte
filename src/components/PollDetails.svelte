<script>
    import Card from '../shared/Card.svelte';
    import PollStore from '../stores/PollStore.js';
    import Button from '../shared/Button.svelte';
    import { tweened } from 'svelte/motion';

    export let poll;

    // reactive values
    $: totalVotes = poll.votesA + poll.votesB + poll.votesC;
    $: percentA = Math.floor(poll.votesA / totalVotes * 100) || 0;
    $: percentB = Math.floor(poll.votesB / totalVotes * 100) || 0;
    $: percentC = Math.floor(poll.votesC / totalVotes * 100) || 0;

    // tweened percentages
    const tweenedPercentA = tweened(0);
    const tweenedPercentB = tweened(0);
    const tweenedPercentC = tweened(0);
    $: tweenedPercentA.set(percentA);
    $: tweenedPercentB.set(percentB);
    $: tweenedPercentC.set(percentC);

    // handle vote
    const handleVote = (option, id) => {
        PollStore.update(polls => {
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
            return copiedPolls;
        })
	};

    // Deleting a poll
    const handleDelete = (id) => {
        PollStore.update(polls => {
            return polls.filter(poll => poll.id != id);
        });
    }
</script>

<Card>
    <div class="poll">
        <h3>{ poll.question }</h3>
        <p>Total votes: { totalVotes }</p>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={() => handleVote('a', poll.id)}>
            <div class="percent percent-a" style="width: {$tweenedPercentA}%"></div>
            <span>{ poll.answerA } ({ poll.votesA })</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={() => handleVote('b', poll.id)}>
            <div class="percent percent-b" style="width: {$tweenedPercentB}%"></div>
            <span>{ poll.answerB } ({ poll.votesB })</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={() => handleVote('c', poll.id)}>
            <div class="percent percent-c" style="width: {$tweenedPercentC}%"></div>
            <span>{ poll.answerC } ({ poll.votesC })</span>
        </div>
        <div class="delete" >
            <Button flat={true} on:click={() => {handleDelete(poll.id)}}>Delete</Button>
        </div>
    </div>
</Card>

<style>
    h3{
        margin: 0 auto;
        color: #555;
    }
    p{
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }
    .answer{
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }
    .answer:hover{
        opacity: 0.6;
    }
    span{
        display: inline-block;
        padding: 10px 20px;
    }
    .percent{
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }
    .percent-a{
        background: rgba(217, 27, 66, 0.2);
        border-left: 4px solid rgba(217, 27, 66, 0.2);
    }
    .percent-b{
        background: rgba(27, 217, 59, 0.2);
        border-left: 4px solid rgba(27, 217, 59, 0.2);
    }
    .percent-c{
        background: rgba(52, 27, 217, 0.2);
        border-left: 4px solid rgba(52, 27, 217, 0.2);
    }
    .delete {
        margin-top: 30px;
        text-align: center;
    }
</style>