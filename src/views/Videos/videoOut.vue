  <script setup>  
  import { ref, onMounted } from 'vue';  
  import axios from 'axios';  
    
  const videoUrl = ref(null);  
    
  onMounted(async () => {  
    const profileId = '0003eb';  
    try {  
      // 假设后端API直接以流的形式返回视频  
      const response = await axios.get(`http://127.0.0.1:8017/uploadfile/get/video?profile_id=${profileId}`, {  
        responseType: 'blob', // 告诉axios期望一个blob响应  
      });  
      const videoBlob = new Blob([response.data], { type: 'video/mp4' });  
      videoUrl.value = URL.createObjectURL(videoBlob); // 创建一个Blob URL供<video>标签使用  
    } catch (error) {  
      console.error('Error fetching video:', error);  
    }  
  });  
  </script>
  <template>  
    <div>  
      <video v-if="videoUrl" width="750" controls :src="videoUrl" type="video/mp4"></video>  
      <p v-else>Loading video...</p>  
    </div>  
  </template>