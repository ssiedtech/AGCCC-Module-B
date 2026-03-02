<template>
    <div class="frame-content">
        <div class="header1-area">
            <img class="left-line" src="../assets/line-left.svg">
        </div>
        <div class="header3-area">
            <nav-comp v-if="!$store.state.home && !$store.state.completed" />
        </div>
        <div class="content-area-flex">
            <div class="content-area">
                <component :is="asyncPageName"></component>
            </div>
        </div>
        <div class="footer3-area">
            <div class="page-counter">
                <span v-if="!$store.state.home && !$store.state.completed">
                    {{ $store.state.pageNum }}/{{ $store.state.totalPages[$store.state.lessonNum - 1] }}
                </span>
            </div>
            <img class="right-line" src="../assets/line-right.svg">
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import navComp from "./navComp.vue"
import pipwerks from '@/assets/scorm-api-wrapper.js'

export default {
    name: 'frameComp',
    components: {
        navComp
    },
    data() {
        return {
            active: pipwerks.SCORM.connection.isActive,
        }
    },
    mounted() {
        var url = window.location.origin
        if (url.includes('clle.blackboard.com')) {
            setInterval(() => {
                this.active = pipwerks.SCORM.connection.isActive
                console.log("CHECKING CONNECTION", pipwerks.SCORM.connection.isActive)
            }, 5000)
        }
        else {
            this.active = true
        }
    },
    computed: {
        asyncPageName() {
            if (this.active) {
                if (this.$store.state.home)
                    return defineAsyncComponent(() => import(`@/components/pages/homePage`));
                else if (this.$store.state.postTest)
                    return defineAsyncComponent(() => import(`@/components/pages/postTest`));
                if (this.$store.state.completed)
                    return defineAsyncComponent(() => import(`@/components/pages/completedPage`));
                else {
                    var page = this.$store.state.pageNum;
                    var lesson = this.$store.state.lessonNum;
                    return defineAsyncComponent(() => import(`@/components/pages/lesson${lesson}/slide${page}`));
                }
            }
            else {
                if (this.$store.state.completed)
                    return defineAsyncComponent(() => import(`@/components/pages/completedPage`));
                else
                    return defineAsyncComponent(() => import(`@/components/pages/connectionLostPage`));
            }
        },
    }
}
</script>

<style>
.frame-content {
    background-color: #0f162b;
    font-size: 2.3vh;
    width: 100%;
    height: 100%;
    border-radius: 19px;
    box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.35);
    display: grid;
    grid-template-rows: 15% 75% 10%;
    grid-template-columns: 0.4fr 10fr 1fr;
    grid-template-areas:
        "header1 content header3"
        ". content ."
        "footer1 content footer3";
}

.content-area-flex {
    height: 100%;
    width: 100%;
    display: flex;
    grid-area: content;
    align-items: center;
    justify-content: center;
}

.content-area {
    height: 92%;
    width: 95%;
}

.header1-area {
    height: 100%;
    width: 100%;
    grid-area: header1;
}

.header3-area {
    height: 100%;
    width: 100%;
    grid-area: header3;
}

.footer3-area {
    height: 100%;
    width: 100%;
    grid-area: footer3;
    display: flex;
    justify-content: space-evenly;
    /* gap: 25%; */
}

.left-line {
    height: 70%;
    margin-left: 50%;
    animation-name: fadeIn;
    animation-duration: 1.2s;
}

.right-line {
    height: 100%;
    width: 45px;
    animation-name: fadeIn;
    animation-duration: 1.2s;
}

.page-counter {
    width: 45%;
    align-self: center;
    text-align: right;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 100;
    }
}

/* style shared in all slides */
.page{
  width: 100%;
  height: 100%;
}

.title {
    /* font-size: 3vh; */
    font-size: 3vmin;
    margin-bottom: 6.4vmin;
}

.body-text {
    font-size: 2vmin;
}

.homebutton {
    color: black;
    width: 100%;
    max-width: 455px;
    text-align: center;
    margin-top: 8vmin;
    height: 7vh;
    background-color: #be9854;
    border-radius: 5px;
    z-index: 1;
    font-size: 100%;
    cursor: pointer;
    z-index: 1;
}

@media(max-width: 1600px) {
    .page {
        overflow-y: auto;
    }
}

</style>
