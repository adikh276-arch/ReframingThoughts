import { MAJOR_LOCALES, useTranslation } from "@/context/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLocale = MAJOR_LOCALES.find((l) => l.code === locale) || MAJOR_LOCALES[0];

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-card/80 backdrop-blur-md border border-border/50 px-4 py-2 rounded-full shadow-sm hover:border-primary/50 transition-all"
                >
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{currentLocale.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-[-1]"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-48 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl overflow-hidden py-1"
                            >
                                {MAJOR_LOCALES.map((loc) => (
                                    <button
                                        key={loc.code}
                                        onClick={() => {
                                            setLocale(loc.code);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors flex items-center justify-between ${locale === loc.code ? "text-primary font-bold" : "text-foreground/80"
                                            }`}
                                    >
                                        {loc.name}
                                        {locale === loc.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
