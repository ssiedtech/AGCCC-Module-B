<template>
    <div class="title" :id="questionType">Post-Test</div>
    <multi-comp v-if="questionType == 'Multiple Choice' || questionType == 'True or False'"
        :question="questionText" 
        :choices="selections"
        :savedAnswer="savedAnswer"
        :correctAnswer="correctAnswer"
        :postTest = true 
        :key="$store.state.pageNum"
        :long = "true"
    />

    <match-comp v-if="questionType == 'Matching'"
        :question="questionText"
        :sections="definitions"
        :choices="selections"
        :savedAnswer="savedAnswer"
        :postTest = true 
        :key="$store.state.pageNum"
    />

    <div class="submit-container" v-show="end" :id="end">
        <button class="submit" @click="modal = true">SUBMIT <br/> TEST</button>
    </div>

    <MultiModal v-if="modal">
      <div>Are you sure you want to submit?</div>
      <br/>
      <div class="confirm-container">
      <button class="confirm" @click="this.$store.commit('submitPostTest')" id="Yes">Yes</button>
      <button class="confirm" @click="modal = false">No</button>
    </div>
    </MultiModal>

</template>

<script>
import multiComp from '@/components/questions/multiComp.vue'
import MatchComp from '@/components/questions/matchComp.vue'
import MultiModal from '@/components/MultiModal.vue'

export default {
    name: 'postTest',
    components: {
        multiComp,
        MatchComp,
        MultiModal
    },
    data() {
        return {
            postTest: null,
            modal: false
        }
    },
    mounted() {
        this.$store.commit('pageloaded')
        console.log(this.$store.state.examInfo)
        console.log(this.$store.state.pageNum)
    },
    computed: {
        // a computed getter
        questionType() {
            return this.$store.state.examInfo[this.$store.state.pageNum -1].questionType
        },
        questionText() {
            return this.$store.state.examInfo[this.$store.state.pageNum -1].questionText
        },
        correctAnswer() {
            return this.$store.state.examInfo[this.$store.state.pageNum -1].correctAnswer
        },
        selections() {
            return this.$store.state.examInfo[this.$store.state.pageNum -1].selections
        },
        definitions() {
            return this.$store.state.examInfo[this.$store.state.pageNum -1].definitions
        },
        end() {
            return this.$store.state.pageNum == this.$store.state.examInfo.length
        },
        savedAnswer() {
            return this.$store.state.examAnswers[this.$store.state.pageNum -1]
        }
    }
}
</script>

<style scoped>
.submit {
    color: black;
    width: 100%;
    max-width: 155px;
    text-align: center;
    height: 90%;
    background-color: #be9854;
    border-radius: 5px;
    z-index: 1;
    font-size: 2.5vmin;
    cursor: pointer;
    z-index: 1;
    align-self: right;
}


.submit-container {
    display: flex;
    width: 95%;
    justify-content: right;
    margin-top: -3vh;
}

.confirm {
    color: black;
    width: 100%;
    max-width: 155px;
    text-align: center;
    height: 100%;
    background-color: #be9854;
    border-radius: 5px;
    z-index: 1;
    font-size: 2.5vmin;
    cursor: pointer;
    z-index: 1;
    align-self: right;
}

.confirm-container {
    display: flex;
    width: 100%;
    height: 5vmin;
    justify-content: center;
    gap: 2%;
}
</style>