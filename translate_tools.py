import json
import os
import time

try:
    from deep_translator import GoogleTranslator
except ImportError:
    print("Installing deep-translator...")
    os.system("pip install deep-translator")
    from deep_translator import GoogleTranslator

# Configuration
SOURCE_FILE = "lib/dictionaries/id.json"
TARGET_FILES = {
    "en": "lib/dictionaries/en.json",
    "jp": "lib/dictionaries/jp.json",
    "cn": "lib/dictionaries/cn.json",
    "ar": "lib/dictionaries/ar.json"
}

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def translate_recursive(data, dest_lang):
    if isinstance(data, dict):
        return {k: translate_recursive(v, dest_lang) for k, v in data.items()}
    elif isinstance(data, str):
        try:
            # Map languages for Google Translate
            target = dest_lang
            if dest_lang == 'jp': target = 'ja'
            if dest_lang == 'cn': target = 'zh-CN'
            
            translator = GoogleTranslator(source='id', target=target)
            translated = translator.translate(data)
            
            print(f"[{dest_lang}] Translated: {data[:20]}... -> {translated[:20]}...")
            return translated
        except Exception as e:
            print(f"Error translating '{data}': {e}")
            return data
    elif isinstance(data, list):
        return [translate_recursive(item, dest_lang) for item in data]
    else:
        return data

def main():
    print("🚀 Starting Auto-Translation from ID (Indonesian)...")
    
    if not os.path.exists(SOURCE_FILE):
        print(f"Error: Source file {SOURCE_FILE} not found!")
        return

    source_data = load_json(SOURCE_FILE)

    for lang_code, file_path in TARGET_FILES.items():
        print(f"\n🌍 Translating to {lang_code.upper()}...")
        translated_data = translate_recursive(source_data, lang_code)
        save_json(file_path, translated_data)
        print(f"✅ Saved to {file_path}")

    print("\n✨ All translations completed!")

if __name__ == "__main__":
    main()
