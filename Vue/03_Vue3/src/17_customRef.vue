<template>
  <!-- <input v-model="keyWord" />
  <h3>{{ keyWord }}</h3> -->
  <input v-model="keyWordRef" />
  <h3>{{ keyWordRef }}</h3>
  <input v-model="keyWordMyRef" />
  <h3>{{ keyWordMyRef }}</h3>
</template>

<script>
import { ref, customRef } from "vue";
export default {
  name: "App",
  setup() {
    // let keyWord = ref('hello'); //使用vue提供的内置ref,
    // let keyWord = myRef("hello"); //使用自定义ref
    let keyWordRef = ref("hello"); //使用vue提供的内置ref,
    let keyWordMyRef = myRef("hello"); //使用自定义ref

    //自定义ref(customRef)
    function myRef(value) {
      return customRef((track, trigger) => { // customRef
        let timer;
        return {
          get() {
            console.log(`从myRef这个容器读取数据,data:${value}`);
            track(); //通知追踪value的变化(跟getter商量一下让它明确你这个value是有用的) // 否则只会读取第一次的value值
            return value; //读取的时候就会调用get
          },
          set(nv) {
            console.log(`myRef容器中的数据被修改,data改为${nv}`);
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = nv;
              trigger(); //trigger通知vue重新解析模版 //防抖
            }, 500);
          },
        };
      });
    }

    return {
      // keyWord,
      keyWordRef,
      keyWordMyRef,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>