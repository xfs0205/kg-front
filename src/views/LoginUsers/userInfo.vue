<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { user_head_img } from '@/utils/users';
import { request_user } from '@/utils/request'

const emit = defineEmits(['updateInfo', 'changUrl']);

const sendInfo = () => {
    emit('updateInfo', false);
};

const props = defineProps({
    headUrl: String,
    userNickname: String,
    userId: String
})

const headurl = ref(props.headUrl)

const headImageUpload: any = (file: { file: Blob; }) => {

    if (!file.file.type.match('image.*')) {
        ElMessage.error('Avatar picture must be an image format!');
        return false;
    }

    const formData = new FormData();
    formData.append('file', file.file);

    request_user({
        method: 'post',
        url: '/uploadfile/head/img',
        headers: {
            'accept': 'application/json',
        },
        data: formData,
    }).then(async response => {
        if (response.data.OK) {
            await user_head_img().then((res) => {
                // console.log("我被执行")
                if (res.data instanceof Blob) {
                    const imgUrl = URL.createObjectURL(res.data);
                    headurl.value = imgUrl;
                } else {
                    console.error('res.data is not a Blob!');
                }
            });
            emit("changUrl", headurl.value)
        }
    }).catch(error => {
        console.error('Upload error:', error);
    });
};


</script>

<template>
    <div class="ddd">
        <div class="userfo-container">
            <el-icon @click="sendInfo" class="close-button">
                <IEpClose color="white" />
            </el-icon>

            <div class="head-container">
                <el-upload class="avatar-uploader" :show-file-list="false" :http-request="headImageUpload">
                    <el-avatar class="head" :size="75" :src="headurl" />
                </el-upload>

                <div class="user-info">
                    <div class="user-nickname">{{ props.userNickname }}</div>
                    <div class="user-id">UID：{{ props.userId }}</div>
                </div>
                <div class="content">
                    <div class="content-item">
                        <h2>我的收藏</h2>
                    </div>
                    <div class="content-item">
                        <h2>我的绘制</h2>
                    </div>
                    <div class="content-item">
                        <h2>浏览记录</h2>
                    </div>
                </div>
                <el-link class="message-button" :underline="false">进入管理员系统<el-icon><IEpCaretRight /></el-icon></el-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ddd {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 251, 251, 0.5);
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    user-select: none;
}

.userfo-container {
    width: 350px;
    height: 470px;
    position: relative;
    z-index: 1000;
    background-color: rgb(4, 4, 4);
    border-radius: 5px;
    position: relative;
    /* 为了定位关闭按钮 */
}

.close-button {
    position: absolute;
    top: 1px;
    right: 1px;
    cursor: pointer;
}

.head {
    position: absolute;
    top: 15px;
    left: 10px;
    border: 1.5px solid #9e9e9e;
    border-radius: 50%;
}

.user-info {
    display: flex;
    position: absolute;
    left: 100px;
    top: 14px;
    flex-direction: column;
    align-items: flex-start;
}

.user-nickname,
.user-id {
    margin-top: 10px;
    margin-left: 0;
    color: white;
}

.content {
    width: 330px;
    height: 330px;
    position: absolute;
    bottom: 40px;
    left: 10px;
    border-radius: 7px;
    background-color: rgba(76, 76, 76, 0.5);
    display: flex;  
    flex-direction: column; 
    justify-content: space-between;  
}

.content-item {  
    flex: 1; 
    background-color: rgba(255, 255, 255, 0.2);  
    border-radius: 5px; 
    padding: 10px;  
    margin: 10px;
    box-sizing: border-box; 
}

.content-item h2 {  
    justify-content: center; 
    text-align: center;   
    color: white;
    font-size: 14px;
}

.message-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: white;
    font-size: 15px;
}
</style>