<template>
    <div class="container" :class="{ 'container-long': long }">
        <div class="question" :class="{ 'question-long': long }">{{ question }}</div>
        <div class="choices">
            <button v-for="choice in choices" :key="choice" :id="choiceId(choice)"
                :style="isSelected(choice) ? { 'background-color': '#be9854', 'color': 'white' } : null"
                @click="selectAnswer(choice)" :class="contains(choice)">{{ choice }}
            </button>
        </div>
        <div class="submit-container" v-if="!postTest">
            <button class="submit"
                @click="this.$store.commit('submitResults', this.currentAnswer == this.correctAnswer)">CHECK
                ANSWER</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "multiComp",
    data() {
        return {
            currentAnswer: '',
        }
    },
    methods: {
        selectAnswer(answer) {
            this.currentAnswer = answer
            if (this.postTest) {
                this.$store.commit('changeAnswer', answer)
            }
        },
        isSelected(answer) {
            if (answer == this.currentAnswer)
                return true
            else
                return false
        },
        isLongAnswer(choice) {
            if (choice.length > 100) {
                return true
            }
            else {
                return false
            }
        },
        contains(string) {
            if (string.includes("Ill")) {
                return 'answer-button2'
            }

            return 'answer-button'
        },
        choiceId(choice) {
            if (this.$store.state.local) {
                if (choice == this.correctAnswer)
                    return "correct"
                else
                    return "incorrect"
            }
            else {
                return 'ID'
            }
        }
    },
    watch: {
        savedAnswer: {
            immediate: true,
            // deep: true,
            handler(val) {
                this.currentAnswer = val
            }
        }
    },
    props: ['question', 'choices', 'correctAnswer', 'savedAnswer', 'postTest', 'long']
}
</script>

<style scoped>
@font-face {
    font-family: MyWebFont;
    src: local('Trebuchet MS');
    unicode-range: U+006C;
}

.answer-button,
.answer-button2 {
    font-family: Arial, Helvetica, sans-serif;
    display: block;
    border: none;
    border-radius: 125px;
    background-color: #19213f;
    /* color: #EBAD1B; */
    height: 80%;
    /* min-height: 50px; */
    width: 65vw;
    margin: auto;
    /* font-size: 2.3vmin; */
    font-size: 2vmin;
}

.answer-button2 {
    font-family: MyWebFont, Arial, Helvetica, sans-serif;
}

.answer-button:hover {
    color: white;
    cursor: pointer;
}

.question {
    margin: auto;
    font-size: 2.2vmin;
    white-space: pre-wrap;
    text-align: center;
    line-height: 130%;
}

.question-long {
    margin: auto;
    font-size: 2vmin;
    white-space: pre-wrap;
    text-align: center;
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

.container,
.container-long {
    display: grid;
    height: 80%;
    width: 100%;
    /* padding-top: 5px; */
    grid-template-rows: 18% 67% 15%;
    grid-auto-flow: column;
    gap: 3%;
}

.container-long {
    grid-template-rows: 25% 60% 15%;
}

.choices {
    display: grid;
    padding-left: 3%;
    padding-right: 3%;
    grid-template-rows: auto auto auto auto auto;
    justify-content: center;
    gap: 2%;
}
</style>
