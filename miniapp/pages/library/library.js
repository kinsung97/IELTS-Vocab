const { ieltsWords } = require('../../utils/words')

Page({
  data: {
    categories: ['全部'],
    selectedCategory: '全部',
    keyword: '',
    filteredWords: [],
  },

  onLoad() {
    const categorySet = new Set(ieltsWords.map((item) => item.category).filter(Boolean))
    this.setData({
      categories: ['全部', ...Array.from(categorySet)],
      filteredWords: ieltsWords.slice(0, 200),
    })
    this.applyFilters()
  },

  onCategoryChange(event) {
    const idx = Number(event.detail.value)
    this.setData({ selectedCategory: this.data.categories[idx] })
    this.applyFilters()
  },

  onKeywordInput(event) {
    this.setData({ keyword: event.detail.value.trim().toLowerCase() })
    this.applyFilters()
  },

  applyFilters() {
    const { selectedCategory, keyword } = this.data
    const list = ieltsWords.filter((item) => {
      const categoryOk = selectedCategory === '全部' || item.category === selectedCategory
      const keywordOk = !keyword || item.word.toLowerCase().includes(keyword)
      return categoryOk && keywordOk
    })
    this.setData({ filteredWords: list.slice(0, 300) })
  },
})
