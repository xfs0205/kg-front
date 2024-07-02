<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  checked: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update']);

const handleChange = (checked: boolean) => {
  if (checked) {
    emit('update', props.value);
  } else {
    emit('update', null); // or any other value you want when unchecked
  }
};

</script>

<template>
    <div style="width: 88%;height: 60px;margin-top: 25px;padding-left: 15px;">
      <el-check-tag :checked="props.checked === props.value"
      @change="handleChange" size="large"
      :style="{boxShadow: `var(--el-box-shadow-lighter)`,}"
      style="width: 88%;height: 100%;"
      >
        <span style="font-family: '宋体';color: black;">{{ props.text }}</span>
      </el-check-tag>
    </div>
</template>
