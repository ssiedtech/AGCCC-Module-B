<template>
    <div class="container">
        <div class="question">{{ question }}</div>
        <div class="matching-grid-container">
            <div class="answer-slots-container">
                <div v-for="(section, index) in sections" :key="section" class="answer-slot" draggable="false"
                    @dragover.prevent @dragenter.prevent @drop="answerDrop(index)">
                    <div class="answer-slot-container">

                        <div class="answer-box-area" @dragover.prevent @dragenter.prevent @drop="answerDrop(index)"
                            :id="`slot ${index}`">
                            <div v-if="answerSlots[index] != undefined" draggable="true" class="answer-box"
                                @dragstart="answerDrag(answerSlots[index])">
                                {{ answerSlots[index] }}
                            </div>
                        </div>

                        <ul>
                            <li v-for="item in section.list" :key="item" class="answer-slot-title">{{ item }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="choices-container">
                <div class="box-area" @dragover.prevent @dragenter.prevent @drop="returnAnswer()">
                    <div v-for="answer in choicesList" :key="answer" :id="choiceId(answer)" draggable="true" class="box"
                        @dragstart="answerDrag(answer)">{{ answer }}</div>
                </div>
            </div>
        </div>
        <div class="submit-container">
            <button class="submit" @click="submitAnswer()">CHECK ANSWER</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'categoryMatchComp',
    data() {
        return {
            currentDragged: undefined,
            titles: [],
            answerSlots: [],
            choicesList: [],
        }
    },
    mounted() {
        this.choicesList = this.choices
    },
    // Note: Answers and definitions must be passed in where any given def[i] matches the answer[i]
    props: ['question', 'sections', 'choices'],
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
        },
        returnAnswer() {
            this.answerSlots = this.answerSlots.map(v => v == this.currentDragged ? undefined : v);
            if (!this.choicesList.includes(this.currentDragged))
                this.choicesList.push(this.currentDragged)
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
.matching-grid-container {
    display: grid;
    grid-template-columns: 75% 25%;
    gap: 1%;
    /* border: 1px solid red; */
}

.answer-slots-container {
    display: grid;
    grid-auto-flow: column;
    gap: 3%;
}

.answer-slot-container {
    display: grid;
    width: 100%;
    grid-template-rows: 25% 75%;
}

.answer-slot {
    /* box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.35); */
    /* background-color: #0a1026; */
    flex: 1 1 0px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
}

.answer-slot-title {
    font-size: 1.8vmin;
    margin-bottom: 5%;
    margin-right: 12%;
    margin-left: 4%;
}

.question {
    margin: auto;
    font-size: 2.2vmin;
    white-space: pre-wrap;
    text-align: center;
    line-height: 130%;
}

.choices-container {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    width: 100%;
    height: 100%;
}

.box {
    background-color: #be9854;
    color: #222221;
    width: 70%;
    height: 18%;
    /* font-size: 70%; */
    box-shadow: 6px 3px 2px black;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.6vmin;
}

.box-area {
    background-color: #0a1026;
    width: 90%;
    height: 90%;
    border-radius: 5px;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
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

hr {
    color: #19213f;
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

.answer-box-area {
    box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.35);
    background-color: #be9854;
    height: 85%;
    width: 80%;
    border-radius: 5px;
    align-self: center;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;

}

.answer-box {
    height: 80%;
    width: 80%;
    background: #0a1026;
    font-size: 70%;
    box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.35);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.4vmin;
}
</style>