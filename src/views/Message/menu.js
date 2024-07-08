import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const menuList = () => {
  return request({
    url:'/menus'
  })
}
