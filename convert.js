const fs = require('fs');

console.log("正在读取 vocabulary.txt...");
let text;
try {
    text = fs.readFileSync('vocabulary.txt', 'utf-8');
} catch (error) {
    console.error("❌ 找不到 vocabulary.txt，请检查文件名和位置是否正确！");
    process.exit(1);
}

const lines = text.split('\n');
const words = [];
let currentCategory = '未分类词汇'; 
let successCount = 0;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue; 

    // 1. 识别分类
    if (i + 1 < lines.length && lines[i+1].trim() === '+++') {
        currentCategory = line; 
        console.log(`📁 发现分类: ${currentCategory}`);
        continue;
    }

    // 2. 拦截垃圾分割线
    if (/^[-=+\s]+$/.test(line)) {
        continue;
    }

    // 3. 提取主单词
    const wordMatch = line.match(/^([a-zA-Z][a-zA-Z\s-]*)(.*)$/);
    
    if (wordMatch && wordMatch[1].trim().length > 1) {
        const word = wordMatch[1].trim();
        let restOfLine = wordMatch[2].trim();

        // 4. 提取音标
        let phonetic = "";
        const phoneticMatch = restOfLine.match(/(\[.*?\]|\/.*?\/)/);
        if (phoneticMatch) {
            phonetic = phoneticMatch[1];
            restOfLine = restOfLine.replace(phoneticMatch[1], '').trim();
        }

        // 5. 提取紫色小标签专用的词性
        let pos = "";
        const posBlockRegex = /\b(?:n|v|adj|adv|prep|conj|vt|vi|pron|num|art|int)\.(?:\/\s*[a-z]{1,4}\.)*/g;
        const posMatches = restOfLine.match(posBlockRegex);
        if (posMatches) {
            pos = [...new Set(posMatches)].join(' '); 
        }

        // 6. 【核心修复】：像英语老师一样拆解文本
        let meaningText = restOfLine.replace(/\|/g, '\n'); // 把所有的竖线先变成换行
        let lines_meaning = meaningText.split('\n');
        let final_meanings = [];
        let exampleText = "";

        lines_meaning.forEach(line => {
            let trimmed = line.trim();
            if (!trimmed) return;
            
            // 擦除原文本中可能自带的“例句”字眼
            trimmed = trimmed.replace(/^(例句|例|e\.g\.|ex)[:：]?\s*/i, '');
            
            // 规则A：如果这行全是英文（没中文），且【没有】 adj. / n. 这种词性标
            // 认定为：真正的独立例句！
            if (/^[A-Za-z\s,.'"-]{15,}$/.test(trimmed) && !/[\u4e00-\u9fa5]/.test(trimmed) && !/\b(?:adj|v|n|adv|prep|conj|vi|vt|pron)\./.test(trimmed)) {
                exampleText += trimmed + "\n";
                return;
            }
            
            // 规则B：如果是“中文 + 长英文句子”，且英文部分【没有】词性标
            // 认定为：前面是释义，后面粘连了例句！咔嚓切开！
            let match = trimmed.match(/(.*[\u4e00-\u9fa5；，。>）)])\s+([A-Za-z][A-Za-z\s,.'"-]{12,})$/);
            if (match) {
                let engPart = match[2].trim();
                if (!/\b(?:adj|v|n|adv|prep|conj|vi|vt|pron)\./.test(engPart)) {
                    exampleText += engPart + "\n";
                    trimmed = match[1].trim(); // 释义保留中文部分
                }
            }
            
            // 规则C：如果含有词性标（比如 spectacular adj.），它会躲过上面的拦截，稳稳进入释义区！
            final_meanings.push(trimmed);
        });

        // 7. 重新组装释义区，保留之前的复合词性 n./adj. 智能拆分逻辑
        let meaning = final_meanings.join('\n');

        meaning = meaning.replace(/([a-z]{1,4}\.)\/([a-z]{1,4}\.)\s*(.*?)(?=(?:\n|\b[a-z]{1,4}\.|$))/g, (match, p1, p2, text) => {
            let part1 = text;
            let part2 = "";
            let dotSplit = text.split('。');
            if (dotSplit.length >= 2 && dotSplit[1].trim() !== '') {
                part1 = dotSplit[0] + '。';
                part2 = dotSplit.slice(1).join('。');
            } else if (text.includes('；')) {
                let semiSplit = text.split('；');
                let splitIdx = 1; 
                for (let j = 0; j < semiSplit.length; j++) {
                    if (semiSplit[j].includes('的') && p2 === 'adj.') splitIdx = j;
                    if ((semiSplit[j].includes('使') || semiSplit[j].match(/^[动副]/)) && (p2 === 'v.' || p2 === 'adv.')) splitIdx = j;
                }
                if (splitIdx === 0) splitIdx = 1;
                part1 = semiSplit.slice(0, splitIdx).join('；') + (splitIdx < semiSplit.length ? '；' : '');
                part2 = semiSplit.slice(splitIdx).join('；');
            }
            if (part2) return `\n${p1} ${part1.trim()}\n${p2} ${part2.trim()}\n`;
            return `\n${p1} ${text.trim()}\n${p2}\n`;
        });

        // 给每个单独的词性前面强制加换行，排版更整齐
        meaning = meaning.replace(/(?<!\/)\b([a-z]{1,4}\.)(?!\/)/g, '\n$1 ');

        // 清理空行
        meaning = meaning.split('\n').map(s => s.trim()).filter(s => s.length > 0).join('\n');

        // 8. 拼装完美的最终成品
        if (exampleText.trim()) {
            meaning += '\n\n例句：\n' + exampleText.trim();
        }

        if (meaning) {
            words.push({
                word: word,
                category: currentCategory,
                pos: pos,             
                phonetic: phonetic,   
                meaning: meaning,
                example: "" 
            });
            successCount++;
        }
    }
}

const outputCode = `// 自动生成的雅思词库，共 ${successCount} 个单词\n\nconst ieltsWords = ${JSON.stringify(words, null, 4)};\n\nwindow.ieltsWords = ieltsWords;`;

fs.writeFileSync('words.js', outputCode, 'utf-8');
console.log(`\n🎉 转换大功告成！完美排版的 ${successCount} 个单词写入完毕。`);