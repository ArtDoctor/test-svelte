<script>
    import PollStore from '../stores/PollStore.js';
    import { createEventDispatcher } from 'svelte';
    import Button from '../shared/Button.svelte';

    let dispatch = createEventDispatcher();
    let fields={ question: 'Do you like cookies?', answerA: 'Yes', answerB: 'No', answerC: 'Only with milk' };
    let errors = { question: '', answerA: '', answerB: '', answerC: '' };
    let valid = false;

    const submitHandler = () => {
        valid = true;

        // validate question
        if(fields.question.trim().length < 5){
            errors.question = 'Question has to be at least 5 characters long';
            valid = false;
        } else {
            errors.question = '';
        }

        // validate answer A
        if(fields.answerA.trim().length < 1){
            errors.answerA = 'Answer A cannot be empty';
            valid = false;
        } else {
            errors.answerA = '';
        }

        // validate answer B
        if(fields.answerB.trim().length < 1){
            errors.answerB = 'Answer B cannot be empty';
            valid = false;
        } else {
            errors.answerB = '';
        }

        // validate answer C
        if(fields.answerC.trim().length < 1){
            errors.answerC = 'Answer C cannot be empty';
            valid = false;
        } else {
            errors.answerC = '';
        }

        // add new poll
        if (valid) {
            let poll = {...fields, votesA: 0, votesB: 0, votesC: 0, id: Math.random()};
            // save poll to store
            PollStore.update(polls => {
                return [poll, ...polls];
            });
            dispatch('addPoll', poll);
        }
    }
</script>

<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="question">Poll Question:</label>
        <input type="text" id="question" bind:value={fields.question}>
        <div class="error">{ errors.question }</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A:</label>
        <input type="text" id="question" bind:value={fields.answerA}>
        <div class="error">{ errors.answerA }</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B:</label>
        <input type="text" id="question" bind:value={fields.answerB}>
        <div class="error">{ errors.answerB }</div>
    </div>
    <div class="form-field">
        <label for="answer-c">Answer C:</label>
        <input type="text" id="question" bind:value={fields.answerC}>
        <div class="error">{ errors.answerC }</div>
    </div>
    <Button type='secondary' flat={true}>Add Poll</Button>
</form>

<style>
    form{
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field{
        margin: 18px auto;
    }
    input{
        width: 100%;
        border-radius: 6px;
    }
    label{
        margin: 10px auto;
        text-align: left;
    }

    .error{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>