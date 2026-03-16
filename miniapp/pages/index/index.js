const { ieltsWords } = require('../../utils/words')

const STORAGE_KEY = 'ielts-progress-v1'

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

Page({
  data: {
    currentWord: {},
    showMeaning: false,
    totalCount: ieltsWords.length,
    learnedCount: 0,
  },

  onLoad() {
    this.progress = wx.getStorageSync(STORAGE_KEY) || {}
    this.pickNextWord()
    this.refreshStats()
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

    wx.setStorageSync(STORAGE_KEY, this.progress)
    this.refreshStats()
    this.pickNextWord()
  },

  refreshStats() {
    this.setData({ learnedCount: Object.keys(this.progress).length })
  },

  pickNextWord() {
    if (!ieltsWords.length) return

    const dueWords = ieltsWords.filter((item) => {
      const saved = this.progress[item.word]
      if (!saved) return true
      return saved.nextReview <= getTodayDate()
    })

    const source = dueWords.length ? dueWords : ieltsWords
    const random = source[Math.floor(Math.random() * source.length)]
    this.setData({ currentWord: random, showMeaning: false })
  },
})
