'use client'
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SavedScore } from "./CanastraCalculator";


interface ScoreContextType {
    scoreList: SavedScore[], isScoreLoading: boolean, clearAll: () => void, removeItem: (id: string) => void, handleSave: (score: SavedScore) => void;
}
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);


export const ScoreContextProvider = ({ children }: { children: React.ReactNode }) => {


    const LS_KEY = "canastra:saved-scores";
    const [scoreList, setScoreList] = useState<SavedScore[]>([]);
    const [isScoreLoading, setIsScoreLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(LS_KEY);
            setScoreList(raw ? JSON.parse(raw) : []);
        } catch {
            setScoreList([]);
        } finally {
            setIsScoreLoading(false);
        }

    }, [])

    const removeItem = (id: string) => {
        const next = scoreList.filter((i) => i.id !== id);
        window.localStorage.setItem(LS_KEY, JSON.stringify(next));
        setScoreList(next);
    };

    const clearAll = () => {
        window.localStorage.removeItem(LS_KEY);
        setScoreList([]);
    };

    const handleSave = (score: SavedScore) => {
        const next = [score, ...scoreList];
        window.localStorage.setItem(LS_KEY, JSON.stringify(next));
        setScoreList(next);
    }
    


    return <ScoreContext.Provider value={{ scoreList, isScoreLoading, clearAll, removeItem, handleSave }}>

        {children}
    </ScoreContext.Provider>

}

export const useScoreContext = () => {
    const context = useContext(ScoreContext);
    if (!context) throw new Error(`must be used within ScoreContext`);
    return context;
}