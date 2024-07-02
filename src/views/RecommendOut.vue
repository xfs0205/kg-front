<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import TextBox from './Recommend/TextBox.vue';
import RecomBox from './Recommend/RecomBox.vue';
import runM from './RecommentOut/runMa.vue'
import tui3 from './RecommentOut/isTui01.vue'
import { useTokenStore } from '@/stores/loginToken';
import axios from 'axios';

const store = useTokenStore()
// 获取时间
const currentTime = ref('')
const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString()
}
setInterval(updateCurrentTime, 1000)
const images = ref([
  '../../public/recommend/re01.png',
  '../../public/recommend/re02.png',
  '../../public/recommend/re03.png',
  '../../public/recommend/re04.png'
])

//搜索内容
const input = ref<string>('')
const is_search = ref(false)
const is_tui = ref({
  is_open: false,
  index: 0
})
const goTo = (i: any) => {
  console.log(i)
  if (i == 1) input.value = '党史百科';
  else if (i == 2) input.value = '红色影像';
  else if (i == 3) input.value = '云南长征';
};


const recom = ref([{
  title: '赓续红色血脉 培育时代新人',
  text: '习近平总书记在十九届中央政治局第三十一次集体学习时发表重要讲话指出：“红色是中国共产党、中华人民共和国最鲜亮的底色，在我国960多万平方公里的广袤大地上红色资源星罗棋布，在我们党团结带领中国人民进行百年奋斗的伟大历程中红色血脉代代相传。”党的十八大以来，习近平总书记在各地考察调研时多次瞻仰具有重大历史意义的革命圣地、红色旧址、革命历史纪念场所，反复强调要铭记光辉历史、发扬红色传统，用好红色资源、传承红色基因，把红色江山世世代代传下去。青少年阶段是人生的“拔节孕穗期”，是世界观、人生观、价值观形成的关键时期，要强化红色资源的教育功能，引导青少年树立正确的国家观、民族观、历史观、文化观，扣好人生的第一粒扣子，确保红色血脉代代相传，红色江山永不变色。',
  link: 'http://www.qstheory.cn/dukan/hqwg/2021-10/27/c_1127999772.htm'
},
{
  title: '弘扬红色文化 建设文化强国',
  text: '建设社会主义文化强国是实现中华民族伟大复兴的内在要求，也是建设社会主义现代化强国的重要任务。党的十九届五中全会从战略全局出发对推进文化强国建设作出规划设计。在建设文化强国的历史新征程中，我们必须充分认识红色文化在举旗帜、聚民心、育新人、兴文化、展形象中的重要地位和作用，大力弘扬红色文化，着力加强社会主义精神文明建设，真正做到“把红色资源利用好、把红色传统发扬好、把红色基因传承好”',
  link: 'http://www.qstheory.cn/dukan/hqwg/2020-12/28/c_1126916907.htm'
},])

//推荐数据
const recoms = ref()
const config = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${store.token.access_token}`
  }
};
const apiUrl = 'http://127.0.0.1:8017/backend/recommend';
const apiUrl_S = 'http://127.0.0.1:8017/backend/chat/query';
axios.get(apiUrl, config)
  .then(response => {
    recoms.value = response.data
  })
  .catch(error => {
    console.error('Error:', error);
    // 处理错误
  });


// 组件加载完成后开始更新时间
onMounted(updateCurrentTime)

const handleKeydown = async (event: KeyboardEvent) => {
  // 如果用户按下了 Enter 并且没有按下 Shift 键
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    if (input.value) {
      const params = {
        q: input.value
      };
      await axios.get(apiUrl_S, {
        params,
        headers: config.headers
      }).then(response => {
        recoms.value = response.data
        is_search.value = true
        input.value = ''
      })
        .catch(error => {
          console.error('Error:', error);
          // 处理错误
        });
    }

  }
}

function kk(index: any){
  is_tui.value.is_open = true
  is_tui.value.index = index
}
function kkk(iso: any){
  if(!iso){
    is_tui.value.is_open=false
    is_tui.value.index = 0
  }
}
</script>

<template>
  <div>
    <div v-if="!is_tui.is_open" class="common-layout" style="margin-top: 15px;">
      <el-container id="top">
        <el-header>
          <el-row style="width: 100%; height: 100%">
            <el-col :span="12" style="display: flex; justify-content: left; align-items: center">
              <h3 style="font-family: '宋体';">主题推荐</h3>
            </el-col>
            <el-col :span="12" style="display: flex; justify-content: flex-end; align-items: center">
              <span>当前时间：{{ currentTime }}</span>
            </el-col>
          </el-row>
        </el-header>
        <el-header style="position: relative;width: vh-to-px(100); ">
          <el-input v-model="input" style="width: 67%;" placeholder="输入搜索内容" :suffix-icon="Search"
            @keyup="handleKeydown" />
          <el-button type="info" style="position: absolute;left:70%;
           background-color: rgb(0,0,0,0);border: 0;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              font-size: 18px;" @click="goTo(1)">党史百科</el-button>
          <el-button type="info" style="position: absolute;left:80%;
           background-color: rgb(0,0,0,0);border: 0;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              font-size: 18px;" @click="goTo(2)">红色影像</el-button>
          <el-button type="info" style="position: absolute;left:90%;
           background-color: rgb(0,0,0,0);border: 0;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              font-size: 18px;" @click="goTo(3)">云南长征</el-button>
        </el-header>
      </el-container>
      <el-container v-if="!is_search" id="mai">
        <el-main>
          <runM @deal-clicked="kk"></runM>
        </el-main>
        <el-aside>
          <el-space direction="vertical">
            <TextBox v-for="(i,) in recom" :key="i.title" :title="i['title']" :text="i['text']" :link="i['link']">
            </TextBox>
          </el-space>
        </el-aside>
      </el-container>
      <RecomBox :data="recoms"></RecomBox>
    </div> 
    <tui3 v-if="is_tui.is_open&&(is_tui.index==3)" @isopen="kkk"></tui3>
  </div> 
</template>

<style scoped>
/* @import '../styles/utils.scss'; */

#top {
  height: 12vh;
  display: flex;
  padding-right: 10px;

  .el-header {
    height: 40px;
    padding-left: 15px;
    background-color: rgb(107, 117, 205, 0);
  }

  .el-carousel .el-carousel-item img {
    max-width: 100%;
    height: 100%;
  }
}

#mai {
  margin-left: 15px;

  .el-main {
    flex: 1;
    background-color: #eee;
    border-radius: 5px;
    padding-bottom: 0;
  }

  .el-aside {
    width: 400px;
    margin-left: 20px;
    margin-right: 14px;
    padding-top: 0;
    background-color: rgb(250, 144, 15, 0);
  }
}
</style>
