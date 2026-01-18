"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/lib/dictionaries/en.json";
import id from "@/lib/dictionaries/id.json";
import jp from "@/lib/dictionaries/jp.json";
import cn from "@/lib/dictionaries/cn.json";
import ar from "@/lib/dictionaries/ar.json";

type Language = "en" | "id" | "jp" | "cn" | "ar";
type Dictionary = typeof en;

interface LanguageContextType {
    language: Language;
    dictionary: Dictionary;
    setLanguage: (lang: Language) => void;
    direction: "ltr" | "rtl";
}

const dictionaries: Record<Language, Dictionary> = { en, id, jp, cn, ar };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [dictionary, setDictionary] = useState<Dictionary>(en);
    const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

    useEffect(() => {
        // Load saved language from local storage if available
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && dictionaries[savedLang]) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        setDictionary(dictionaries[language]);
        setDirection(language === "ar" ? "rtl" : "ltr");
        localStorage.setItem("language", language);

        // Set HTML dir attribute for RTL support
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, dictionary, setLanguage, direction }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
