import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('mytoken',() =>{
    //ref相当于state
    const tokenJson= ref("")
    const token = computed(()=>{
        try{
            return JSON.parse(tokenJson.value || window.localStorage.getItem("TokenInfo") ||"{}")
        }catch(err){
            ElMessage.error("json字符串格式不对,转化对象时失败..")
            window.localStorage.setItem("TokenInfo", "")
            throw err
        }
        
    })
    function saveToken(data:string){
        tokenJson.value = data
        window.localStorage.setItem("TokenInfo", data)
    }

    //相外暴露
    return{token,saveToken}
})