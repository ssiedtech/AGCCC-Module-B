<template>
    <div class="container">
        <div class="question">{{ question }}</div>

        <div class="define-container">

            <!-- Title section -->
            <div class="row-container">
                <div class="choices-title">
                    <div class="title">{{ choices[0] }}</div>
                    <div class="title">{{ choices[1] }}</div>
                </div>
            </div>

            <!-- Body Section -->
            <div class="row-container" v-for="(def, index) in defs" :key="def">
                <div class="choices">
                    <input type="radio" :id="createId(index, 1)" :value="true" v-model="answers[index]">
                    <input type="radio" :id="createId(index, 2)" :value="false" v-model="answers[index]">
                </div>
                <div class="def">{{ def }}</div>
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
        for (let i = 0; i < this.correctAnswer.length; i++) {
            this.answers.push(null)
        }
    },
    props: ['question', 'defs', 'choices', 'correctAnswer'],
    methods: {
        onChange(def, index) {
            let value = document.getElementById(def).value;
            this.answers[index] = value
        },
        //checks to see that answers are in the order they were passed in
        getCurrentAnswer() {
            for (let i = 0; i < this.correctAnswer.length; i++) {
                if (this.answers[i] != this.correctAnswer[i]) {
                    console.log(this.answers[i], "!=", this.correctAnswer[i])
                    return false
                }
            }
            return true
        },
        submitAnswer() {
            let result = this.getCurrentAnswer()
            this.$store.commit('submitResults', result)

        },
        toggleAnswer(choice, index) {
            this.answers[index] = choice
        },
        createId(index, option) {
            if (this.$store.state.local) {
                if (option == 1) {
                    if (this.correctAnswer[index])
                        return "correct"
                    else
                        return "incorrect"
                }
                else if (option == 2) {
                    if (!this.correctAnswer[index])
                        return "correct"
                    else
                        return "incorrect"
                }
            }
            else {
                return 'ID'
            }
        }
    }
}
</script>

<style scoped>
input[type="radio"] {
    appearance: none;
    font: inherit;
    border: 0.15px solid #be9854;
    display: grid;
    place-content: center;
    cursor: pointer;
    z-index: 2;
}

input[type="radio"]::before {
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

input[type="radio"]:checked::before {
    transform: scale(1);
}

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
    border: 1px solid red;
}

.define-container {
    display: grid;
    width: 100%;
    /* grid-template-rows: 20%; */
    /* border: 1px solid red; */
}

.row-container {
    display: grid;
    width: 100%;
    grid-template-rows: 100%;
    grid-template-columns: 20% 80%;
    /* border: 1px solid white; */
}

.def {
    /* border: 1px solid white; */
    padding: 0.5%;
}

.choices {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-around;
}

.choice {
    appearance: none;
    font: inherit;
    width: 2%;
    height: 2.7vmin;
    /* border: 0.15px solid #be9854; */
    display: grid;
    place-content: center;
    cursor: pointer;
    margin: auto;
}

.selection {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #be9854;
}

.title {
    text-align: center;
    margin: 0;
    /* font-weight: bold; */
}

.left-choice {
    grid-area: left;
    border-right: white;
}

.choices-title {
    display: grid;
    grid-template-columns: 50% 50%;
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