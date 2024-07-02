import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const chatStore = defineStore('mychat',() =>{
    //ref相当于state
    const historyMessage = ref('')
    const historyChat = computed(()=>{
        try{
            return JSON.parse(historyMessage.value || window.localStorage.getItem("historyMessage") ||"{}")
        }catch(err){
            ElMessage.error("json字符串格式不对,转化对象时失败..")
            window.localStorage.setItem("historyMessage", "")
            throw err
        } 
    })
    function savehistoryMessage(data:string){
        historyMessage.value = data
        window.localStorage.setItem("historyMessage", data)
    }

    //相外暴露
    return{historyChat,savehistoryMessage}
})