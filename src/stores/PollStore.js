import { writable } from "svelte/store";

const PollStore = writable([{
    question: 'What do you code with?',
    answerA: 'Python',
    answerB: 'JS',
    answerC: 'Other',
    votesA: 3,
    votesB: 14,
    votesC: 17,
    id: 1
}]);

export default PollStore;