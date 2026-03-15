# 雅思词汇闪卡 (IELTS Vocabulary Flashcards) 🚀



一个简洁、优雅且高效的雅思词汇背诵工具。专为备考雅思的同学设计，基于艾宾浩斯遗忘曲线原理（简易版），通过闪卡（Flashcards）形式帮助你快速斩获核心词汇。

本项目是 **Vibe Coding** 的典型实践：由 Gemini 指导架构设计，搭配 OpenClaw 进行快速迭代。它打破了传统背词软件的臃肿，回归最纯粹的闪卡记忆逻辑。

本项目由openclaw创建。

---



## 🔗 在线使用（推荐）



**👉 [https://kinsung97.github.io/IELTS-Vocab/](https://kinsung97.github.io/IELTS-Vocab/)**



无需安装，打开即用！支持 PC、平板、手机全平台访问。



---



## ✨ 核心功能



| 功能 | 说明 |

|------|------|

| 📱 **全平台使用** | 响应式设计，完美适配 PC、平板、手机 |

| 🔒 **本地存储** | 所有数据保存在浏览器本地，**不上传任何数据到服务器**，保护隐私 |

| 📊 **Excel 导出** | 今日背诵单词可一键导出为 **CSV/Excel** 格式，方便复盘 |

| 💾 **进度备份** | 支持 JSON 格式的进度导出/导入，换设备无缝衔接 |

| 📝 **自定义词库** | 修改 `words.js` 即可使用自己的词汇表 |

| 🎴 **智能闪卡** | 隐藏释义，强制回忆，点击翻转 |

| 🌙 **夜间模式** | 深度适配暗色主题，深夜刷词不刺眼 |

| 🔊 **在线发音** | 支持标准美式/英式发音 |



---

## 📖 使用指南



1. **选择词库**：在侧边栏下拉菜单选择目标分类

2. **刷词流程**：

   - 看到单词 → 尝试回忆 → **点击卡片**查看释义

   - 根据记忆程度点击：**生疏 (1d)**、**模糊 (2d)**、**熟悉 (4d)** 或 **简单 (7d)**

   - 系统会自动安排下一次复习时间

3. **导出今日学习**：点击侧边栏 **"导出 CSV"** 生成 Excel 报表

4. **备份进度**：点击 **"备份进度"** 下载 JSON 文件，换电脑时 **"恢复进度"** 上传即可



---




## 🚀 快速开始



### 在线使用（最简单）

直接访问：**https://kinsung97.github.io/IELTS-Vocab/**



### 本地运行



1. 点击 [Download ZIP](https://github.com/kinsung97/IELTS-Vocab/archive/refs/heads/main.zip) 下载并解压

2. 双击 `index.html` 即可在浏览器中打开



### 自定义词库



编辑 `words.js` 文件，按照现有格式添加或修改词汇即可使用自己的词库。



---




## 🛠️ 技术栈



- **Core**: 纯原生前端（HTML5 + CSS3 + Vanilla JavaScript）

- **Storage**: 浏览器 **LocalStorage**，100% 本地运行，无需服务器

- **Icons/Styles**: 现代化 UI 设计，平滑过渡动画



---



## 📚 数据来源



词汇数据来自 [hefengxian/my-ielts](https://github.com/hefengxian/my-ielts) 项目，包含《雅思词汇真经》等优质雅思备考资料。



感谢原作者的整理和分享！



---



## 📦 目录结构



```text

.

├── index.html          # 主程序文件（包含样式与逻辑）

├── words.js           # 词汇数据库（可自定义扩展）

├── README.md          # 项目文档

└── LICENSE            # MIT 开源协议

```



---



## 🤝 参与贡献



如果你有更好的词汇数据，或者发现了代码中的 Bug，欢迎提交 **Pull Request** 或 **Issue**！



1. Fork 本仓库

2. 新建功能分支 (`git checkout -b feature/AmazingFeature`)

3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)

4. 推送到分支 (`git push origin feature/AmazingFeature`)

5. 开一个 Pull Request



---



## 📄 许可证



本项目采用 [MIT License](LICENSE) 许可协议。



---



**💡 备考建议：** 雅思不仅是单词量，更是逻辑与表达。愿这个小工具能陪你度过枯燥的刷词时光！
