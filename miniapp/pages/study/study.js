const { ieltsWords } = require('../../utils/words')
const { getProgress, setProgress, getSettings } = require('../../utils/storage')

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

Page({
  data: {
    currentWord: {},
    showMeaning: false,
    totalCount: ieltsWords.length,
    learnedCount: 0,
    currentCategory: '全部',
  },

  onShow() {
    this.progress = getProgress()
    this.settings = getSettings()
    this.pickNextWord()
    this.refreshStats()
    this.setData({ currentCategory: this.settings.category || '全部' })
  },

  toggleMeaning() {
    this.setData({ showMeaning: !this.data.showMeaning })
  },

  nextWord() {
    this.pickNextWord()
  },

  rateWord(event) {
    const intervalDays = Number(event.currentTarget.dataset.level)
    const today = getTodayDate()
    const nextReview = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)

    const current = this.data.currentWord.word
    this.progress[current] = {
      level: intervalDays,
      lastReview: today,
      nextReview,
    }

    setProgress(this.progress)
    this.refreshStats()
    this.pickNextWord()
  },

  refreshStats() {
    this.setData({ learnedCount: Object.keys(this.progress).length })
  },

  getFilteredWords() {
    const category = this.settings.category || '全部'
    if (category === '全部') {
      return ieltsWords
    }
    return ieltsWords.filter((item) => item.category === category)
  },

  pickNextWord() {
    const filteredWords = this.getFilteredWords()
    if (!filteredWords.length) return

    const today = getTodayDate()
    const dueWords = filteredWords.filter((item) => {
      const saved = this.progress[item.word]
      if (!saved) return true
      return saved.nextReview <= today
    })

    const source = dueWords.length ? dueWords : filteredWords
    const random = source[Math.floor(Math.random() * source.length)]
    this.setData({ currentWord: random, showMeaning: false, totalCount: filteredWords.length })
  },
})
