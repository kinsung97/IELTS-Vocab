const { ieltsWords } = require('../../utils/words')
const { getProgress } = require('../../utils/storage')

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

Page({
  data: {
    totalCount: ieltsWords.length,
    learnedCount: 0,
    dueCount: 0,
    completionRate: 0,
  },

  onShow() {
    const progress = getProgress()
    const learnedCount = Object.keys(progress).length
    const today = getTodayDate()
    const dueCount = Object.values(progress).filter((item) => item.nextReview <= today).length
    const completionRate = ieltsWords.length ? ((learnedCount / ieltsWords.length) * 100).toFixed(1) : 0

    this.setData({ learnedCount, dueCount, completionRate })
  },
})
