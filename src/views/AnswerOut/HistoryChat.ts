import { ref } from 'vue'
import { chatinfo } from '@/utils/get_chat_history'
import { chatStore } from '@/stores/historyChat'
import { useTokenStore } from '@/stores/loginToken'

const stores = useTokenStore()
const chatstore = chatStore()

const Message = await chatinfo(stores.token.ID).then((res)=>{
    return res.data
})

chatstore.savehistoryMessage(JSON.stringify(Message))

export { Message }