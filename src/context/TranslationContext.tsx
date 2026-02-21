import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { lingo } from "@/lib/lingo";

export const MAJOR_LOCALES = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "hi", name: "हिन्दी" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "pt", name: "Português" },
    { code: "it", name: "Italiano" },
    { code: "ru", name: "Русский" },
    { code: "ar", name: "العربية" },
    { code: "bn", name: "বাংলা" },
];

type TranslationContextType = {
    locale: string;
    setLocale: (locale: string) => void;
    translate: (text: string) => Promise<string>;
    loading: boolean;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get("lang") || "en";
    });
    const [loading, setLoading] = useState(false);

    const setLocale = (newLocale: string) => {
        setLocaleState(newLocale);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", newLocale);
        window.history.pushState({}, "", url);
    };

    const translate = useCallback(
        async (text: string) => {
            if (locale === "en" || !text) return text;
            try {
                const result = await lingo.localizeText(text, {
                    sourceLocale: "en",
                    targetLocale: locale,
                });
                return result;
            } catch (error) {
                console.error("Translation error:", error);
                return text;
            }
        },
        [locale]
    );

    return (
        <TranslationContext.Provider value={{ locale, setLocale, translate, loading }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const T: React.FC<{ children: string }> = ({ children }) => {
    const [translated, setTranslated] = useState(children);
    const { translate, locale } = useTranslation();

    useEffect(() => {
        let isMounted = true;
        translate(children).then((res) => {
            if (isMounted) setTranslated(res);
        });
        return () => {
            isMounted = false;
        };
    }, [children, locale, translate]);

    return <>{translated}</>;
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
};
