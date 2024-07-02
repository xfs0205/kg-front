<script setup lang="ts">
import { ref, nextTick } from 'vue'
import io from 'socket.io-client'
// import { Message } from './AnswerOut/HistoryChat';
import charts from './AnswerOut/chatsEenue.vue'
import axios from 'axios'
import { useTokenStore } from '@/stores/loginToken'

const store = useTokenStore()

const message = ref([
  {
    history_id: -1,
    chats: [{ type: 'server', text: '欢迎来带“智游”问答系统！！' }]
  }
])
const config = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${store.token.access_token}`
  }
}
const apiUrl1 = 'http://127.0.0.1:8017/backend/chat/get_chat'
const apiUrl2 = 'http://127.0.0.1:8017/backend/chat/chat'
const apiUrl3 = 'http://127.0.0.1:8017/backend/chat/history'
axios
  .get(apiUrl1, config)
  .then((response) => {
    // console.log('Response:', response.data)
    message.value = response.data
  })
  .catch((error) => {
    console.error('Error:', error)
    // 处理错误
  })

const checked = ref(-1)
const textarea = ref('')
const radio = ref('智能问答')
//聊天框
const socket = io('http://222.197.211.254:7002')
// const socket = io('http://192.168.50.203:8081')
const messages = ref({
  history_id: -1,
  chats: [{ type: 'server', text: '欢迎来带“智游”问答系统！！' }]
})

const onChange = (status: any) => {
  if (status != -1) {
    axios
        .get(apiUrl1, config)
        .then((response) => {
          console.log('Response:', response.data)
          message.value = response.data
        })
        .catch((error) => {
          console.error('Error:', error)
          // 处理错误
        })
    checked.value = status
    messages.value = message.value[status]
    nextTick(scrollToBottom)
  } else {
    checked.value = status
    messages.value = {
      history_id: -1,
      chats: [{ type: 'server', text: '欢迎来带“智游”问答系统！！' }]
    }
  }
}

async function sendMessage() {
  //发送信息
  if (textarea.value.trim()) {
    if (messages.value.history_id == -1) {
      await axios.post(apiUrl3, {}, config).then(async (res) => {
        messages.value.history_id = res.data.history_id
      })
      axios
        .post(
          apiUrl2,
          {
            type: 'user',
            text: `${textarea.value}`,
            history_id: `${messages.value.history_id}`,
            order: `${messages.value.chats.length}`
          },
          config
        )
        .then((response) => {
          // console.log('Response:', response.data)
        })
        .catch((error) => {
          console.error('Error:', error)
          // 处理错误
        })
      axios
        .get(apiUrl1, config)
        .then((response) => {
          // console.log('Response:', response.data)
          message.value = response.data
        })
        .catch((error) => {
          console.error('Error:', error)
          // 处理错误
        })
        checked.value = 0
    } else {
      axios
        .post(
          apiUrl2,
          {
            type: 'user',
            text: `${textarea.value}`,
            history_id: `${messages.value.history_id}`,
            order: `${messages.value.chats.length}`
          },
          config
        )
        .then((response) => {
          // console.log('Response:', response.data)
        })
        .catch((error) => {
          console.error('Error:', error)
          // 处理错误
        })
    }
    messages.value.chats.push({ text: textarea.value.replace(/\n/g, '<br>'), type: 'user' })
    socket.emit('question', textarea.value)
    textarea.value = ''
    nextTick(scrollToBottom)
  }
}

function receiveMessage(answer: string) {
  answer = answer.replace(/\n/g, '<br>');
  axios
    .post(
      apiUrl2,
      {
        type: 'server',
        text: `${answer}`,
        history_id: `${messages.value.history_id}`,
        order: `${messages.value.chats.length}`
      },
      config
    )
    .then((response) => {
      // console.log('Response:', response.data)
    })
    .catch((error) => {
      console.error('Error:', error)
      // 处理错误
    })
    axios
        .get(apiUrl1, config)
        .then((response) => {
          // console.log('Response:', response.data)
          message.value = response.data
        })
        .catch((error) => {
          console.error('Error:', error)
          // 处理错误
        })
  //接受信息
  console.log(answer)
  messages.value.chats.push({ text: answer, type: 'server' })
  nextTick(scrollToBottom)
}

socket.on('getAnswer', (data) => {
  //发送信息
  receiveMessage(data.answer)
})

function scrollToBottom() {
  //滚动条置底
  nextTick(() => {
    const elScrollbarRef = document.querySelector('.chat-field .el-scrollbar__wrap')
    if (elScrollbarRef) {
      elScrollbarRef.scrollTop = elScrollbarRef.scrollHeight
    }
  })
}

let so = 0
const handleKeydown = async (event: KeyboardEvent) => {
  // 如果用户按下了 Enter 并且没有按下 Shift 键
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    // sendMessage()
    if(so==0){
      messages.value.chats.push({ text: textarea.value.replace(/\n/g, '<br>'), type: 'user' })
      textarea.value = ''
      await new Promise(resolve => setTimeout(resolve, 1000))
      messages.value.chats.push({ text:"1919年5月中旬，北京五四运动的消息传到云南，云南民众积极响应，进行了广泛的社会动员，谴责北洋政府卖国行径，号召滇人起来，争回青岛，抵制日货。通过“宣言”及致全国和巴黎和会专使之通电多件，要求废除中日不平等条约，提出及巴黎中国专使不要在“和约”上签字，否则“誓不承认”，数千人举行游行示威。6月4日，由云南省议会、总商会、报界联合会、教育会、实业改进会、省农会、救国会、和平会、三迤总会、三省联合会、国民后援会、尚志学社等团体发起，在云华茶园（位于今云南省第一人民医院内）召开国民大会，各界群众上万人参会。会议历时3小时，通过了多件宣言及通电，痛斥北洋政府卖国行径，号召滇人起来和全国人民一道挽回外交败局，争回青岛，抵制日货，并预备最后以武力解决。会议呼吁：“声讨国贼，抵制日货，不达取消中日不平等条约，誓不终止。”致电巴黎中国专使“万勿签字”“若竟签字，誓不承认”。下午2时，与会群众学生数千人举行示威游行，高呼“还我青岛”“挽回国权”“反对二十一条”等口号。同年7月25日为抵制日货、12月25日为抗议日本军舰入闽逞凶，云南国民大会均分别召开。" , type: 'server' })
      so = 1
      nextTick(scrollToBottom)
    }
    else if(so==1){
      messages.value.chats.push({ text: textarea.value.replace(/\n/g, '<br>'), type: 'user' })
      textarea.value = ''
      await new Promise(resolve => setTimeout(resolve, 1000))
      messages.value.chats.push({ text: "2020年初，习近平总书记在云南看望慰问各族干部群众时指出，云南有光荣的革命传统，有很多感人肺腑的动人故事。要把这些故事作为生动教材，引导广大党员、干部不断检视初心、滋养初心，不断锤炼忠诚干净担当的政治品格。传承红色基因，落实主题教育要求，文史哲版面推出“牢记总书记嘱托 讲好云南红色故事”专栏，回溯中华民族伟大复兴的历史之根、思想之源，揭示党的百年奋斗从胜利走向新的胜利的思想密码和历史通过学习云南红色文化，可以深入了解中国革命历程，感受革命先烈的精神和牺牲精神，推动社会主义事业的持续发展。", type: 'server' })
      nextTick(scrollToBottom)
    }
  }
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main style="margin-top: 0; padding-top: 0">
        <div class="chat-field">
          <el-scrollbar>
            <div
              v-for="(message, index) in messages.chats"
              :key="index"
              :class="['message-container', message.type === 'server' ? 'received' : 'sent']"
            >
              <!-- 仅当消息由服务器发送时，添加服务器头像 -->
              <div class="avatar server-avatar" v-if="message.type === 'server'"></div>
              <div class="message">
                <span v-html="message.text"></span>
              </div>
              <!-- 仅当消息由用户发送时，添加用户头像 -->
              <div class="avatar user-avatar" v-if="message.type === 'user'"></div>
            </div>
          </el-scrollbar>
        </div>
        <el-container
          style="background-color: #ededed; border-radius: 5px; margin-top: 0px; margin-right: 15px"
        >
          <el-header
            style="height: 60px; align-items: center; display: flex; justify-content: space-between"
          >
            <el-radio-group v-model="radio">
              <!-- 修改v-model绑定 -->
              <el-radio-button label="对话聊天" value="对话聊天" />
              <el-radio-button label="智能问答" value="智能问答" />
              <el-radio-button label="AI助手" value="AI助手" disabled border />
            </el-radio-group>
            <el-tooltip class="box-item" effect="light" content="发送" placement="top-start">
              <el-button @click="sendMessage" type="info" :plain="false"
                ><el-icon> <IEpPromotion /> </el-icon
              ></el-button>
            </el-tooltip>
          </el-header>
          <el-main style="padding: 0px 15px 10px 18px">
            <div class="user-input">
              <div style="margin: 0" />
              <el-input
                v-model="textarea"
                :autosize="{ minRows: 3, maxRows: 3 }"
                type="textarea"
                placeholder="输入内容开始聊天（Shift+Enter 换行）"
                @keyup="handleKeydown"
                style="background-color: (0); width: 100%; max-height: 100px"
                resize="none"
              >
              </el-input>
            </div>
          </el-main>
        </el-container>
      </el-main>
      <el-aside width="30%" style="background-color: #eee; margin-top: 0; padding-top: 13px">
        <el-container>
          <el-main
            class="flex gap-2"
            style="padding-top: 5px; display: flex; justify-content: center; flex-direction: column"
          >
            <el-scrollbar height="80vh">
              <charts :value="-1" :text="'新的聊天'" :checked="checked" @update="onChange"></charts>
              <charts
                v-for="(i, key) in message"
                :key="key"
                :value="key"
                :text="i.chats.length > 0 ? i.chats[0].text : ''"
                :checked="checked"
                @update="onChange"
              >
              </charts>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.infinite-list {
  height: 530px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.text-field {
  width: 100%;
  height: 450px;
}

.tooltip-base-box {
  width: 600px;
}

.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tooltip-base-box .center {
  justify-content: center;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}

.chat-field {
  width: 100%;
  height: 60vh;
  /* background-color: #ededed; */
  background-color: rgb(0, 0, 0, 0);
  border-radius: 5px;
  padding-top: 15px;
  margin-top: 0;

  .message-container {
    display: flex;
    padding: 0.2em;
  }

  .message-container.received {
    justify-content: flex-start;
    /* 左对齐 */
  }

  .message-container.received .message {
    background-color: #e5bcbc;
  }

  .message-container.sent {
    justify-content: flex-end;
    /* 右对齐 */
  }

  .message-container.sent .message {
    background-color: aliceblue;
  }

  .message {
    display: inline-block;
    /* 使 div 根据内容调整宽度 */
    background-color: rgba(229, 226, 226, 0.309) 2;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
    word-break: break-word;
    /* 避免文本溢出 */
    max-width: calc(83%);
    /* 防止内容过长时占满整行留出空间 */
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .server-avatar {
    background-image: url('../../public/logo.png');
  }

  .user-avatar {
    background-image: url('../../public/userlogo.jpg');
    margin-left: 10px;
    order: 1;
  }

  .message-container.sent {
    justify-content: flex-end;
    /* 右对齐 */
  }

  .message-container.received .server-avatar {
    order: -1;
    /* 在flex布局中，这会把服务器头像显示在左侧 */
    margin-left: 0;
    /* 重置用户头像的左边距 */
    margin-right: 10px;
    /* 设置与消息框的空间 */
  }
}

.user-input {
  display: flex;

  .el-button.is-plain {
    height: 50px;
    width: 50px;
    border-radius: 2px;
  }
}

.el-main {
  margin-top: 0px;
  margin-left: 0px;
}

.el-aside {
  background-color: #eed6d6;
  height: calc(100vh - 60px);
}
</style>
