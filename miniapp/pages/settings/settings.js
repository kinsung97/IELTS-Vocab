const { ieltsWords } = require('../../utils/words')
const { getSettings, setSettings, setProgress } = require('../../utils/storage')

Page({
  data: {
    categories: ['全部'],
    selectedCategory: '全部',
    autoPlayPronunciation: false,
  },

  onLoad() {
    const categorySet = new Set(ieltsWords.map((item) => item.category).filter(Boolean))
    const settings = getSettings()
    this.setData({
      categories: ['全部', ...Array.from(categorySet)],
      selectedCategory: settings.category,
      autoPlayPronunciation: settings.autoPlayPronunciation,
    })
  },

  onCategoryChange(event) {
    const idx = Number(event.detail.value)
    const selectedCategory = this.data.categories[idx]
    this.setData({ selectedCategory })
    setSettings({ category: selectedCategory })
    wx.showToast({ title: '已保存', icon: 'success' })
  },

  onAutoPlayChange(event) {
    const autoPlayPronunciation = event.detail.value
    this.setData({ autoPlayPronunciation })
    setSettings({ autoPlayPronunciation })
  },

  resetProgress() {
    setProgress({})
    wx.showToast({ title: '已清空', icon: 'success' })
  },
})
