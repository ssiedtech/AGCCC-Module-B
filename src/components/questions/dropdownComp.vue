<template>
    <div class="container">
        <div class="question">{{ question }}</div>

        <div class="define-container">
            <div v-for="(def, index) in defs" :key="def" draggable="false" class="def-row">
                <div class="definition-text">{{ def }}</div>

                <select class="answer-slot" v-on:change="(e)=>onChange(e, index)" :id="createID(index)">
                    <option value="none" selected disabled hidden>Select an Option</option>
                    <option v-for="choice in choices" :key="choice" :value="choice">{{ choice }}</option>
                </select>

            </div>
        </div>
        <div class="submit-container">
            <button class="submit" @click="submitAnswer()">CHECK ANSWER</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DropdownComp',
    data() {
        return {
            answers: [],
        }
    },

    //set answer size for each correctAnswer
    mounted: function () {
        for (let i = 0; i < this.correctAnswer.length; i++)
            this.answers.push(null)
    },
    props: ['question', 'defs', 'choices', 'correctAnswer'],
    methods: {
        onChange(e, index) {
            console.log(e.target.value)
            // let value = document.getElementById(`box${index}`).value;
            this.answers[index] = e.target.value
        },
        //checks to see that answers are in the order they were passed in
        getCurrentAnswer() {
            for (let i = 0; i < this.correctAnswer.length; i++) {
                if (this.answers[i] != this.correctAnswer[i]) {
                    return false
                }
            }
            return true
        },
        submitAnswer() {
            let result = this.getCurrentAnswer()
            this.$store.commit('submitResults', result)
        },
        createID(index) {
            if (this.$store.state.local) {
                return this.correctAnswer[index]
            }
            else {
                return 'ID'
            }
        },
    }
}
</script>

<style scoped>
.container {
    display: grid;
    height: 80%;
    width: 100%;
    /* padding-top: 5px; */
    grid-template-rows: 15% 70% 15%;
    grid-auto-flow: column;
    gap: 3%;
}

.question {
    text-align: center;
    margin-bottom: 1%;
    font-size: 2.2vmin;
}

.answer-slot {
    box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.35);
    background-color: #19213f;
    font-size: 80%;
    height: 70%;
    width: 80%;
    border-radius: 5px;
    justify-self: center;
    margin-top: auto;
    margin-bottom: auto;
}

.define-container {
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 100%;
    gap: 5%;
    margin-bottom: 2%;
}

.def-row {
    display: grid;
    grid-template-columns: 65% 35%;
    margin-left: 5%;
    height: 65%;
}

.definition-text {
    font-size: 2.2vmin;
    margin-top: auto;
    margin-bottom: auto;
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
</style>