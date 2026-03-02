<template>
    <!-- <div class="container"> -->
    <div class="match-container">
        <div class="question">{{ question }}</div>
        <!-- Column 1 -->
        <div class="define-container">
            <div v-for="(section, index) in sections" :key="section" draggable="false" class="def-row">
                <div class="definition-text">{{ section.def }}</div>

                <div class="answer-slot" @dragover.prevent @dragenter.prevent @drop="answerDrop(index)"
                    :id="`slot ${index}`">
                    <div v-if="answerSlots[index] != undefined" draggable="true" class="answer-box"
                        @dragstart="answerDrag(answerSlots[index])">
                        {{ answerSlots[index] }}
                    </div>
                </div>
            </div>
        </div>
        <!-- Column 2 -->
        <div class="grid-right">
            <div class="box-area" @dragover.prevent @dragenter.prevent @drop="returnAnswer()">
                <div v-for="choice in choicesList" :key="choice" :id="choiceId(choice)" draggable="true" class="box"
                    :class="{ smallerbox: (choicesList.length >= 6) }" @dragstart="answerDrag(choice)">{{ choice }}
                </div>
            </div>
        </div>
        <div class="submit-container" v-if="!postTest">
            <button class="submit" @click="submitAnswer()">CHECK ANSWER</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MatchComp',
    data() {
        return {
            currentDragged: undefined,
            answerSlots: [],
            choicesList: [],
        }
    },
    mounted() {
        this.choicesList = this.unusedChoices
    },
    // Note: Answers and definitions must be passed in where any given def[i] matches the answer[i]
    props: ['question', 'sections', 'choices', 'postTest', 'savedAnswer'],
    computed: {
        unusedChoices: function () {
            let temp = []
            this.choices.forEach((value) => {
                if (!this.answerSlots.includes(value)) {
                    temp.push(value)
                }
            })
            return temp;
        },
    },
    watch: {
        savedAnswer: {
            immediate: true,
            handler(val) {
                if (val != null) {
                    this.answerSlots = val
                    let temp = []
                    this.choices.forEach((value) => {
                        if (!val.includes(value)) {
                            temp.push(value)
                        }
                    })
                    this.choicesList = temp
                }
                else {
                    this.choicesList = this.choices
                    this.answerSlots = []
                }
            }
        }
    },
    methods: {
        answerDrag(dragged) {
            this.currentDragged = dragged
        },
        answerDrop(dest) {
            this.choicesList = this.choicesList.filter(word => word != this.currentDragged)
            let i = this.answerSlots.indexOf(this.currentDragged)
            if (i != -1) {
                this.answerSlots[i] = this.answerSlots[dest]
                this.answerSlots[dest] = this.currentDragged
            }
            else {
                if (this.answerSlots[dest] != undefined)
                    this.choicesList.push(this.answerSlots[dest])
                this.answerSlots[dest] = this.currentDragged
            }

            if (this.postTest) {
                this.$store.commit('changeAnswer', this.answerSlots)
            }
        },
        returnAnswer() {
            this.answerSlots = this.answerSlots.map(v => v == this.currentDragged ? undefined : v);
            if (!this.choicesList.includes(this.currentDragged))
                this.choicesList.push(this.currentDragged)

            if (this.postTest) {
                this.$store.commit('changeAnswer', this.answerSlots)
            }
        },
        //for all possible choices, check if the answer matches that sections key
        getCurrentAnswer() {
            for (let i = 0; i < this.choices.length; i++) {
                if (this.answerSlots[i] != this.sections[i].key) {
                    return false
                }
            }
            return true
        },
        submitAnswer() {
            let result = this.getCurrentAnswer()
            this.$store.commit('submitResults', result)

        },
        choiceId(choice) {
            if (this.$store.state.local) {
                let length = this.sections.length
                let id = 'ERROR'
                for (let i = 0; i < length; i++) {
                    if (choice == this.sections[i].key)
                        id = 'box ' + i
                }
                return id
            }
            else {
                return 'ID'
            }
        }
    }
}
</script>

<style scoped>
.match-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: .3fr 5fr .3fr;
    row-gap: 25px;
}

.box {
    background-color: #be9854;
    color: #222221;
    width: 85%;
    height: 15%;
    /* font-size: 1rem; */
    font-size: min(1.2vw, 1.2vh);
    box-shadow: 6px 3px 2px black;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.smallerbox {
    height: 10%;
}

.box-area {
    background-color: #0a1026;
    width: 65%;
    height: 100%;
    border-radius: 5px;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.answer-slot {
    box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.35);
    background-color: #be9854;
    height: 100%;
    width: 90%;
    border-radius: 5px;
    align-self: center;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 65px;
    min-height: 30px;

}

.define-container {
    display: grid;
    grid-auto-rows: 1fr;
    gap: 10px;
    grid-area: 2/1;
}

.def-row {
    display: grid;
    grid-template-columns: 75% 25%;
}

.grid-right {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    grid-area: 2/2;
}

.definition-text {
    font-size: 1.8vmin;
    margin: auto 0 auto 0;
}

.question {
    margin: auto;
    font-size: 2.2vmin;
    white-space: pre-wrap;
    text-align: center;
    line-height: 130%;
    grid-column: 1/3;
}

.answer-box {
    height: 85%;
    width: 85%;
    background: #0a1026;
    /* font-size: .95rem; */
    font-size: min(1.2vw, 1.2vh);
    /* white-space: nowrap; */
    box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.35);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.submit {
    color: black;
    max-width: 155px;
    text-align: center;
    background-color: #be9854;
    border-radius: 5px;
    z-index: 1;
    font-size: 2.3vmin;
    cursor: pointer;
    z-index: 1;
    align-self: right;
}

.submit-container {
    display: flex;
    height: 100%;
    margin-left: 50%;
    justify-content: center;
    grid-area: 3/2;
}

@media(max-width: 1124px) {
    .box {
        font-size: 1vh;
    }

    .answer-box {
        font-size: 1vh;
    }
}

@media(max-width: 945px) {
    .box {
        font-size: 0.8vh;
    }

    .answer-box {
        font-size: 0.8vh;
    }
}
</style>