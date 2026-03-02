<!-- All blank spaces must use _________ (9 underscores) in order to work -->
<template>
    <div class="container">
        <p>
            <b style="font-size: 2.2vmin;">Fill in the Blank: </b>
            <span v-for="items, index in questionArray" :key="items" class="question">
                <input v-if="items == '_________'" class="blank" :id="createID(index)" placeholder="Type Here" />
                <template v-else>{{ items + ' ' }}</template>
            </span>
        </p>
        <div class="submit-container">
            <button class="submit" @click="submitAnswer()">CHECK ANSWER</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "FillComp",
    data() {
        return {
            answer: [],
            questionArray: null,
            idIndexArray: []
        }
    },

    //split question into an array of words in order to parse for the blank chaerachter
    mounted: function () {
        this.questionArray = this.question.split(' ')
    },
    methods: {

        //Gets all inputs and compares them with the answer key
        //Answer key must be in the order each blank space appears in
        getCurrentAnswer() {
            let answers = document.getElementsByClassName('blank');
            for (let i = 0; i < this.correctAnswer.length; i++) {
                //make all lower case to ignore case comparison
                let x = this.correctAnswer[i].map(v => v.toLowerCase());
                let y = answers[i].value.toLowerCase()
                console.log(x, y)
                if (!x.includes(y)) {
                    return false
                }
            }
            return true
        },        
        createID(index) {
            if (this.$store.state.local) {

                console.log(this.idIndexArray, this.correctAnswer.length, index)

                if (!this.idIndexArray.includes(index))
                    this.idIndexArray.push(index)

                let i = this.idIndexArray.indexOf(index)
                let id = this.correctAnswer[i][0]
                return id

            }
            else {
                return 'ID'
            }
        },
        submitAnswer() {
            let result = this.getCurrentAnswer()
            this.$store.commit('submitResults', result)
        }
    },
    props: ['question', 'correctAnswer']
}
</script>

<style scoped>
.question {
    margin: auto;
    font-size: 2.2vmin;
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
    /* padding-top: 5px; */
    grid-template-rows: 85% 15%;
    grid-auto-flow: column;
    gap: 3%;
    line-height: 200%;
}

.blank {
    border: 1px solid white;
    /* background-color: #0f162b; */
    background-color: #19213f;
    border-radius: 5px;
    font-size: 90%;
    height: 10%;
    width: 13%;
    padding-left: .5%;
    padding-right: .5%;
    margin-right: 1.3%;
    margin-left: .3%;
}
</style>

