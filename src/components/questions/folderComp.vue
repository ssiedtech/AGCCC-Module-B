<template>
    <div class="container">
        <div class="question">{{ question }} <br> <span class="hint">Click &quot;Empty Folder&quot; to reset the
                options.</span></div>
        <div class="question-content">
            <div class="folder-inside">
            </div>
            <div class="folder-container">
                <div style="height: 60%;" id="folderdrop" @drop="hideItem()">
                    <img v-show="!folderStatus" draggable="false" @dragenter="openFolder()" @drop="hideItem()"
                        class="folderClosed" src="@/assets/folderClosed.png" />
                    <img v-show="folderStatus" draggable="false" @dragover.prevent @dragenter.prevent
                        @dragleave="closeFolder()" @drop="hideItem()" class="folderOpened" src="@/assets/folderOpen.png" />
                </div>
                <button class="emptyButton" @click="emptyFolder()">Empty Folder</button>
            </div>
            <div class="choices">
                <div v-for="choice in choicesList" :key="choice">
                    <button draggable="true" @dragstart="updateDraggedItem(choice)" class="box" :id="choiceId(choice)">
                        {{ choice }}</button>
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
    name: 'folderComp',
    data() {
        return {
            choicesList: [],
            hidden: [],
            folderStatus: false,
            currentDraggedItem: undefined,
        }
    },
    mounted() {
        for (let i = 0; i < this.choices.length; i++) {
            this.choicesList.push(this.choices[i])
        }
        // console.log("mounted correct answer:", this.correctAnswer)
    },
    props: ['question', 'choices', 'correctAnswer', 'savedAnswer'],
    methods: {
        openFolder() {
            this.folderStatus = true
        },
        closeFolder() {
            this.folderStatus = false
        },
        updateDraggedItem(item) {
            this.currentDraggedItem = item
            console.log("updated current drag:", this.currentDraggedItem)
        },
        hideItem() {
            //add to hidden array
            this.hidden.push(this.currentDraggedItem)

            //splice choices to remove hidden item
            var index = this.choicesList.indexOf(this.currentDraggedItem);
            if (index !== -1) {
                this.choicesList.splice(index, 1);
            }
            this.folderStatus = false;
        },
        emptyFolder() {
            //reset choices and hidden lists
            this.hidden = [];
            for (let i = 0; i < this.choices.length; i++) {
                if (!this.choicesList.includes(this.choices[i])) {
                    this.choicesList.push(this.choices[i])
                }
            }
        },
        getCurrentAnswer() {
            //check correct answers against hidden, remove each time its correct and return false if its wrong
            let tempHidden = [...this.hidden]
            for (let i = 0; i < this.correctAnswer.length; i++) {
                if (!tempHidden.includes(this.correctAnswer[i])) {
                    return false
                }
                else {
                    tempHidden.splice(tempHidden.indexOf(this.correctAnswer[i]), 1);
                }
            }
            // console.log("processed tempHidden", tempHidden)

            if (tempHidden.length < 1) {
                return true
            }
        },
        submitAnswer() {
            let result = this.getCurrentAnswer()
            this.$store.commit('submitResults', result)
        },
        choiceId(choice) {
            if (this.$store.state.local) {
                if (this.correctAnswer.includes(choice))
                    return "correct"
                else
                    return "incorrect"
            }
            else {
                return 'ID'
            }
        }
    }
}
</script>

<style scoped>
.container {
    display: grid;
    height: 80%;
    width: 100%;
    grid-template-rows: 18% 67% 15%;
    grid-auto-flow: column;
    gap: 3%;
    /* border: 1px solid red; */
}

.question {
    margin: auto;
    font-size: 2.2vmin;
    white-space: pre-wrap;
    text-align: center;
    line-height: 130%;
}

.question-content {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    gap: 8%;
    /* border: 1px solid purple; */
    justify-content: center;
}

.choices {
    display: flex;
    width: 40%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    /* border: 1px solid red; */
}

.choice {
    color: black;
    padding: 5px;
}

.folderClosed {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-self: center;
    align-self: center;
}

.folderOpened {
    height: 100%;
    justify-self: center;
    align-self: center;
}

.emptyButton {
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 125px;
    background-color: #19213f;
    width: 80%;
    height: 12%;
    font-size: min(1.5vw, 1.5vh);
    box-shadow: 4px 3px 2px black;
    justify-self: center;
    align-self: center;
}

.folder-container {
    display: flex;
    gap: 5%;
    flex-direction: column;
    align-items: center;
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

.box {
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 125px;
    background-color: #19213f;
    height: 100%;
    width: 20vw;
    font-size: min(1.5vw, 1.5vh);
    box-shadow: 4px 3px 2px black;
}

.hint {
    font-size: 1.9vmin;
    text-align: center;
}
</style>