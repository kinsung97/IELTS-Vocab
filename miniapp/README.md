# IELTS Vocab 微信小程序版（基础骨架）

这是从网页版迁移过来的首个小程序版本骨架，目标是先跑通核心学习链路：

- 抽词
- 翻卡
- 评分
- 复习调度
- 本地存储

## 目录结构

```text
miniapp/
├── app.js
├── app.json
├── app.wxss
├── sitemap.json
├── pages/
│   └── index/
│       ├── index.js
│       ├── index.json
│       ├── index.wxml
│       └── index.wxss
└── utils/
    └── words.js      # 自动生成，请勿手改
```

## 使用方式

1. 在仓库根目录执行：
   ```bash
   node scripts/build-miniapp-words.js
   ```
2. 微信开发者工具中导入 `miniapp/`。

## 数据同步

小程序词库由 `scripts/build-miniapp-words.js` 从根目录 `words.js` 自动生成。

当你更新了 `words.js` 后，重新运行脚本即可同步到小程序版本。
