<template>
    <div class="container">
        <div class="question">{{ question }}</div>
        <div class="choices">
            <div v-for="(choice, index) in choices" :key="choice" class="cont">
                <input type="checkbox" :id="choiceId(index)" :name=choice @change="toggle(index)">
                <label :for=choice>{{ choice }}</label>
            </div>
        </div>
        <div class="submit-container">
            <button class="submit" @click="submitAnswer()">CHECK ANSWER</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "MultiComp",
    data() {
        return {
            answers: [],
        }
    },

    //set answer size for each choice
    mounted: function () {
        for (let i = 0; i < this.choices.length; i++)
            this.answers.push(false)
    },
    methods: {
        submitAnswer() {
            let results = true
            for (let i = 0; i < this.correctAnswer.length; i++) {
                if (this.answers[i] !== this.correctAnswer[i]) {
                    results = false
                }
            }
            this.$store.commit('submitResults', results)
        },
        toggle(index) {
            this.answers[index] = !this.answers[index]
        },
        choiceId(index) {
            if (this.$store.state.local) {
                if (this.correctAnswer[index])
                    return "correct"
                else
                    return "incorrect"
            }
            else {
                return 'ID'
            }
        }
    },
    props: ['question', 'choices', 'correctAnswer']
}
</script>

<style scoped>
input[type="checkbox"] {
    appearance: none;
    font: inherit;
    border: 0.15px solid #be9854;
    display: grid;
    place-content: center;
    cursor: pointer;
}

input[type="checkbox"]::before {
    content: "";
    width: 2.7vmin;
    height: 2.7vmin;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 20px 20px #be9854;
    background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
    transform: scale(1);
}

.cont {
    position: relative;
    align-items: center;
    display: flex;
    width: 100%;
}

.question {
    margin: auto;
    font-size: 2.2vmin;
}

label {
    margin-left: 2%;
    font-size: 2.2vmin;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
}

.submit {
    color: black;
    width: 100%;
    max-width: 155px;
    text-align: center;
    height: 90%;
    background-color: #be9854;
    border-radius: 5px;
    z-index: 1;
    font-size: 100%;
    cursor: pointer;
    z-index: 1;
    align-self: right;
}

.submit-container {
    display: flex;
    height: 100%;
    width: 95%;
    justify-content: right;
}

.container {
    display: grid;
    height: 80%;
    width: 100%;
    grid-template-rows: 15% 70% 15%;
    grid-auto-flow: column;
    gap: 3%;
}

.choices {
    display: grid;
    padding-left: 3%;
    grid-template-rows: auto;
}
</style>

