# 雅思词汇闪卡 (IELTS Vocabulary Flashcards) 🚀

一个简洁、优雅且高效的雅思词汇背诵工具。

本项目是 **Vibe Coding** 的典型实践：由 Gemini 指导架构设计，搭配 OpenClaw 进行快速迭代。它打破了传统背词软件的臃肿，回归最纯粹的闪卡记忆逻辑。
本项目由openclaw创建。

---

## 🔗 在线工作站

**👉 [https://kinsung97.github.io/IELTS-Vocab/](https://kinsung97.github.io/IELTS-Vocab/)**

> **Vibe Check**: 无需安装，即开即用，进度随身。支持 PC、平板、手机全平台响应。

---

## ✨ 核心能力

| 维度 | 功能描述 | 核心逻辑 |
|------|------|------|
| 🧠 **记忆引擎** | 智能闪卡模式 | 隐藏释义强制回忆，基于艾宾浩斯曲线自动安排复习周期 |
| 🛡️ **数据主权** | 100% LocalStorage | 零后端依赖，所有数据锁死在浏览器本地，彻底保护隐私 |
| 🌗 **视觉交互** | 三态主题系统 | 支持日间、夜间及**自动跟随系统**模式，深夜刷词不刺眼 |
| 📊 **资产管理** | 多维备份方案 | 支持 JSON 全量进度备份与 CSV/Excel 学习记录导出 |
| 🔊 **多维感官** | 在线 TTS 发音 | 深度集成浏览器原声，支持标准美式/英式发音 |

---

## 🛠️ Vibe 技术栈

- **Engine**: Vanilla JavaScript (ES6+)
- **UI Architecture**: CSS3 Flexbox/Grid + Responsive Viewport
- **Storage Strategy**: LocalStorage API + JSON Serialization
- **Design Philosophy**: 极简主义、响应式优先、零外部依赖

---

## 🚀 开发者指南 (Vibe Workflow)

### 快速启动
1. `git clone https://github.com/kinsung97/IELTS-Vocab.git`
2. 直接在浏览器打开 `index.html`。

### 自定义词库 (Skill Expansion)
编辑 `words.js`，按照 JSON 格式注入你的私域词汇表，即可瞬间完成工具个性化。

### 进度迁移
通过侧边栏执行 **"备份进度"** 获取 JSON 指纹，在任意新设备通过 **"恢复进度"** 即可完成记忆镜像迁移。

---

## 📖 方法论：如何高效背诵？

1. **沉浸 (Immerse)**：在侧边栏选择你的目标词库分类。
2. **回忆 (Recall)**：看到单词先在大脑中构建释义，点击卡片验证。
3. **反馈 (Feedback)**：
   - **生疏 (1d)**：完全陌生或记忆错误。
   - **模糊 (2d)**：需要较长时间思考才能想起。
   - **熟悉 (4d)**：瞬间反应出主要释义。
   - **简单 (7d)**：已形成长期记忆。
4. **复盘 (Review)**：利用 **"导出 CSV"** 功能，定期将高频生疏词汇导入 Excel 进行二次分析。

---

## 📚 数据与致谢

- **数据源**: 词汇数据继承自 [hefengxian/my-ielts](https://github.com/hefengxian/my-ielts)，涵盖《雅思词汇真经》等核心语料。
- **指导 AI**: 本项目在开发过程中深度参考了 AI 编程的最佳实践。

---

## 📦 目录结构

```text
.
├── index.html          # 主程序：逻辑、样式、结构的原子化集成
├── words.js           # 数据仓库：核心词汇数据库
├── README.md          # 节点说明：项目方法论与指南
└── LICENSE            # MIT 开源协议

```

---

## 📄 许可证

本项目采用 [MIT License](https://www.google.com/search?q=LICENSE) 许可协议。

**💡 备考建议：** 雅思不仅是单词量，更是逻辑与表达。愿这个小工具能陪你度过枯燥的刷词时光！

```
