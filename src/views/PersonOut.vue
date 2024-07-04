<script setup lang="ts">
import { ref } from 'vue'
import { request } from '../utils/request'
import nodes from './NodeGroup.vue'

const persons = ref([
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' },
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' },
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' },
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' },
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' },
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' },
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' },
  { id: '', name: '', time: '', path: '', href: '', info: '', home: '', img: '' }
])

const peoples = ref([[
  {name:"",href:""}
]])
const people = ref([{ name: '', href: '' }])
peoples.value.pop();

request({
  method: 'GET',
  url: '/backend/groups/to_person'
})
  .then((res) => {
    persons.value = res.data
  })
  .catch((error) => {
    // 处理任何可能出现的错误
    console.error('There was an error fetching the buttons data:', error)
  })

// request({
//   method: 'GET',
//   url: '/backend/groups/to_people'
// })
//   .then((res) => {
//     people.value = res.data
//     for(var i = 0;i<people.value.length;i+2){
//       if(i+1 < people.value.length)
//       peoples.value.push([people.value[i],people.value[i+1]])
//     }
//   })
//   .catch((error) => {
//     // 处理任何可能出现的错误
//     console.error('There was an error fetching the buttons data:', error)
//   })
</script>

<template>
  <div class="common-layout" style="margin-top: 15px;">
    <el-container>
      <el-header id="head-one">&nbsp;&nbsp;&nbsp;&nbsp;红色人物图谱</el-header>
      <el-header id="head-two">
        <div class="left-box">
          <h2>当代榜样人物</h2>
        </div>
        <div class="right-box">
          <el-card
            :body-style="{
              paddingTop: '5px',
              paddingLeft: '5px',
              paddingRight: '6px',
              display: 'flex'
            }"
            v-for="(person, i) in persons"
            :key="i"
            class="in-box"
            shadow="hover"
          >
            <div class="image-box">
              <div class="image" :style="{ backgroundImage: 'url(' + person.img + ')' }" />
              <div class="name-box">
                <span>{{ person.name }}</span>
              </div>
            </div>
            <div class="info-box">
              <span style="font-size: 10px"
                >&emsp;&emsp;{{ person.info }}
                <p></p
              ></span>
              <el-link :href="person.href" target="_blank">更多</el-link>
            </div>
          </el-card>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <div class="main-box">
            <nodes></nodes>
          </div>
          <div class="bottom-box">
            <h4 style="text-align: right; color: rgb(168, 24, 24); margin-top: 10px">红色图谱</h4>
          </div>
        </el-main>
        <el-aside width="200px">
          <el-scrollbar max-height="430px" style="margin-left: 10px">
            <el-row :gutter="20" v-for="(per,i) in peoples" :key="i" style="margin-bottom: 20px">
              <el-col :span="12" v-for="i in 2" :key="i"
                ><el-link
                  href=""
                  target="_blank"
                  style="font-size: 10px; font-weight: bold"
                  >App</el-link
                ></el-col>
            </el-row>
          </el-scrollbar>
        </el-aside>
      </el-container>
    </el-container>
    <video></video>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  background-color: #eee;
  align-items: center;
  margin-bottom: 18px;
  padding-left: 0;
  border-left: 4px solid black;
}
#head-two {
  border-left: 0px solid black;
  height: 75%;
  padding-top: 20px;
  padding-bottom: 20px;
  .left-box {
    writing-mode: vertical-rl;
    font-family: 'LiSu', '楷体', serif;
    margin-left: 10px;
    margin-right: 20px;
    h2 {
      font-size: 50px;
    }
  }
  .right-box {
    background-color: #f6eded;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 15px;
    padding-bottom: 10px;
    margin-left: 10px;
    margin-right: 5px;
    border: 2px solid black;
    .in-box {
      width: 200px;
      height: 140px;
      background-color: #ffffff;
      margin-left: 30px;
      margin-right: 20px;
      margin-top: 15px;
      margin-bottom: 10px;

      .image-box {
        width: 65px;
        height: 130px;
        background-color: rgb(0, 0, 0, 0);
        .name-box {
          width: 65px;
          height: 40px;
          text-align: center; /* 让文字水平居中 */
          line-height: 30px;
        }
        .image {
          width: 65px;
          height: 100px;
          display: block;
          background-size: cover;
          background-position: center;
        }
      }
      .info-box {
        flex: 1; /* 占据剩余空间 */
        margin-left: 10px;
        background-color: rgb(0, 0, 0, 0);
      }
    }
  }
}

//@at-root
.el-main {
  background-color: #eee;
  height: 500px;
  padding-right: 0;
  .main-box {
    height: 90%;
    width: 97%;
    border: 2px solid black;
  }
  .bottom.box {
    margin-bottom: 20px;
    font-family: '宋体';
    font-size: 2px;
  }
}
.el-aside {
  width: 20%;
  margin-left: 20px;
  background-color: #eee;
}
</style> 

