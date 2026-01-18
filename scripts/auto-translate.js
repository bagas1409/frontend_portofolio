const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

// Configuration
const DICT_DIR = path.join(__dirname, '../lib/dictionaries');
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['id', 'jp', 'cn', 'ar'];

// Load Source Dictionary
const sourcePath = path.join(DICT_DIR, `${SOURCE_LANG}.json`);
const sourceDict = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

console.log(`🌍 Loaded Source: ${SOURCE_LANG.toUpperCase()}`);

// Helper: Traverse and Translate
async function translateObject(sourceObj, targetObj, langCode) {
    const result = {};

    for (const key in sourceObj) {
        if (typeof sourceObj[key] === 'object' && sourceObj[key] !== null) {
            // Recursive for nested objects
            result[key] = await translateObject(sourceObj[key], targetObj ? targetObj[key] : {}, langCode);
        } else {
            // Translate String
            if (targetObj && targetObj[key]) {
                // Skip if exists (Preserve manual edits)
                result[key] = targetObj[key];
            } else {
                // Translate if missing
                try {
                    console.log(`   Running: [${langCode}] Translating "${key}"...`);
                    // Map lang codes for translate-google if needed (cn -> zh-cn)
                    const mapLang = langCode === 'cn' ? 'zh-cn' : (langCode === 'jp' ? 'ja' : langCode);

                    const translated = await translate(sourceObj[key], { to: mapLang });
                    result[key] = translated;
                } catch (error) {
                    console.error(`   Error translating ${key}:`, error.message);
                    result[key] = sourceObj[key]; // Fallback to English
                }
                // Small delay to avoid rate limiting
                await new Promise(r => setTimeout(r, 200));
            }
        }
    }
    return result;
}

// Main Execution
(async () => {
    for (const lang of TARGET_LANGS) {
        console.log(`\n🚀 Processing: ${lang.toUpperCase()}...`);
        const targetPath = path.join(DICT_DIR, `${lang}.json`);

        let targetDict = {};
        if (fs.existsSync(targetPath)) {
            targetDict = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        }

        const newDict = await translateObject(sourceDict, targetDict, lang);

        fs.writeFileSync(targetPath, JSON.stringify(newDict, null, 2));
        console.log(`✅ Updated: ${lang}.json`);
    }
    console.log('\n✨ All translations updated successfully!');
})();
