const PROGRESS_KEY = 'ielts-progress-v1'
const SETTINGS_KEY = 'ielts-settings-v1'

const defaultSettings = {
  category: '全部',
  autoPlayPronunciation: false,
}

function getProgress() {
  return wx.getStorageSync(PROGRESS_KEY) || {}
}

function setProgress(progress) {
  wx.setStorageSync(PROGRESS_KEY, progress)
}

function getSettings() {
  const saved = wx.getStorageSync(SETTINGS_KEY) || {}
  return { ...defaultSettings, ...saved }
}

function setSettings(nextSettings) {
  const merged = { ...getSettings(), ...nextSettings }
  wx.setStorageSync(SETTINGS_KEY, merged)
  return merged
}

module.exports = {
  getProgress,
  setProgress,
  getSettings,
  setSettings,
  defaultSettings,
}
