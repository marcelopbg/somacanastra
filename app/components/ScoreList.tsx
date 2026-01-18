"use client";
import { Trash } from "lucide-react";
import { useMemo } from "react";
import { PlayerScore } from "./CanastraCalculator";
import { navLinkClass } from "../lib/styleElements";
import Link from "next/link";

/* =======================
   TYPES
======================= */
type SavedScore = {
    id: string;
    ownerName: string;
    total: number;
    playerBateu: boolean;
    playerNaoPegouMorto: boolean;
    score: PlayerScore;
    createdAt: string;
};

const LS_KEY = "canastra:saved-scores";

/* =======================
   COMPONENT
======================= */

interface ScoreListProps {
    items: SavedScore[];
    removeItem: (id: string) => void;
    clearAll: () => void;
    isScoreLoading: boolean;

}

export default function ScoreList({ items, removeItem, clearAll, isScoreLoading }: ScoreListProps) {


    const sortedItems = useMemo(
        () => [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
        [items]
    );

    const totalsByPlayer = useMemo(() => {
        const map = new Map<string, number>();
        for (const item of items) {
            map.set(item.ownerName, (map.get(item.ownerName) ?? 0) + item.total);
        }

        return Array.from(map.entries())
            .map(([ownerName, total]) => ({ ownerName, total }))
            .sort((a, b) => b.total - a.total);
    }, [items]);
    
    const container = "flex flex-col gap-10  max-w-[400px] w-full";
    const headerRow = "flex items-center justify-between mb-4";

    const card =
        "relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-white/10 backdrop-blur p-4 shadow-sm";

    const name = "text-sm font-semibold uppercase tracking-wide";
    const totalScore = "text-2xl font-bold";

    const badge =
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

    const badgeGreen =
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
    const badgeRed =
        "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

    const trashBtn =
        "absolute top-2 right-2 rounded-md p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30";

    const danger =
        "bg-[#ff5858] text-white rounded-md px-3 py-1 text-sm font-medium";

    const playerTotalsSection = ''

    /* =======================
       RENDER
    ======================= */

    return (
        <div className={container}>
            {/* Dashboard */}
            {totalsByPlayer.length > 0 && (
                <section className={playerTotalsSection}>
                    <h2 className="text-sm font-semibold mb-2 opacity-80">
                        Total por jogador
                    </h2>

                    <div className="grid gap-2">
                        {totalsByPlayer.map((p) => (
                            <div
                                key={p.ownerName}
                                className="flex items-center justify-between rounded-lg border px-3 py-2 bg-white/60 dark:bg-white/5"
                            >
                                <span className="font-medium">
                                    {p.ownerName}
                                </span>
                                <span className="font-bold text-lg">
                                    {p.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Header */}
            <div>

                <div className={headerRow}>
                    <h3 className="text-sm font-semibold mb-2 opacity-80">Pontuações Salvas</h3>
                    {sortedItems.length > 0 && 
                    <button className={danger} onClick={clearAll}>
                        Limpar lista
                    </button>
                    }
                </div>

                {/* List */}
                {isScoreLoading ? (
                    <div className="animate-pulse space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-24 rounded-lg border bg-gray-200/40"
                            />
                        ))}
                    </div>
                ) : sortedItems.length === 0 ? (
                    <p className="text-sm opacity-80">
                        Nenhuma pontuação salva.
                    </p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {sortedItems.map((i) => (
                            <article key={i.id} className={card}>
                                {/* Trash */}
                                <button
                                    className={trashBtn}
                                    onClick={() => removeItem(i.id)}
                                    title="Remover"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>

                                {/* Header */}
                                <div>
                                    <div className={name}>{i.ownerName}</div>
                                    <div className={totalScore}>{i.total}</div>
                                </div>

                                {/* Status */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span
                                        className={`${badge} ${i.playerBateu
                                            ? badgeGreen
                                            : badgeRed
                                            }`}
                                    >
                                        {i.playerBateu
                                            ? "Bateu"
                                            : "Não bateu"}
                                    </span>

                                    <span
                                        className={`${badge} ${!i.playerNaoPegouMorto
                                            ? badgeGreen
                                            : badgeRed
                                            }`}
                                    >
                                        {!i.playerNaoPegouMorto
                                            ? "Pegou morto"
                                            : "Não pegou morto"}
                                    </span>
                                </div>

                                {/* Footer */}
                                <div className="mt-3 text-xs opacity-70">
                                    Salvo em{" "}
                                    {new Date(i.createdAt).toLocaleString()}
                                </div>
                            </article>
                        ))}


                    </div>

                )}
                <Link href="/" className={navLinkClass}>Voltar para calculadora</Link>

            </div>
        </div>
    );
}
