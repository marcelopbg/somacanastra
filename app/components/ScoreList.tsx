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

interface ScoreListProps {
    items: SavedScore[];
    removeItem: (id: string) => void;
    clearAll: () => void;
    isScoreLoading: boolean;
}

export default function ScoreList({
    items,
    removeItem,
    clearAll,
    isScoreLoading,
}: ScoreListProps) {
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

    /* =======================
       PODIUM COLORS
    ======================= */

    const podiumStyles = [
        "border-l-4 border-yellow-400", // 🥇 gold
        "border-l-4 border-gray-400",   // 🥈 silver
        "border-l-4 border-amber-700",  // 🥉 bronze
    ];

    /* =======================
       STYLES
    ======================= */

    const container = "flex flex-col gap-12 max-w-[420px] w-full";

    const dashboard =
        "rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 p-6";

    const dashboardRow =
        "flex items-center justify-between py-2 px-6";

    const dashboardName =
        "text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400";

    const dashboardTotal =
        "text-3xl font-extrabold tabular-nums";

    const headerRow = "flex items-center justify-between mb-3";

    const card =
        "relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 p-3";

    const name =
        "text-xs font-semibold uppercase tracking-wide text-gray-500";

    const totalScore =
        "text-lg font-bold";

    const badge =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium";

    const badgeGreen =
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

    const badgeRed =
        "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

    const trashBtn =
        "absolute top-2 right-2 rounded-md p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30";

    const danger =
        "bg-[#ff5858] text-white rounded-md px-3 py-1 text-xs font-semibold";

    /* =======================
       RENDER
    ======================= */

    return (
        <div className={container}>
            {/* DASHBOARD */}
            {totalsByPlayer.length > 0 && (
                <section className={dashboard}>
                    <h2 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">
                        Total por jogador
                    </h2>

                    <div className="px-1 divide-y">
                        {totalsByPlayer.map((p, idx) => (
                            <div
                                key={p.ownerName}
                                className={`
                                    ${dashboardRow}
                                    ${podiumStyles[idx] ?? "border-l-4 border-transparent text-gray-400"}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-gray-400">
                                        #{idx + 1}
                                    </span>
                                    <span className={dashboardName}>
                                        {p.ownerName}
                                    </span>
                                </div>

                                <span
                                    className={`
                                        ${dashboardTotal}
                                        ${idx === 0 ? "text-yellow-500" : ""}
                                        ${idx === 1 ? "text-gray-500" : ""}
                                        ${idx === 2 ? "text-amber-700" : ""}
                                    `}
                                >
                                    {p.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* HISTORY */}
            <section>
                <div className={headerRow}>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Pontuações salvas
                    </h3>

                    {sortedItems.length > 0 && (
                        <button className={danger} onClick={clearAll}>
                            Limpar lista
                        </button>
                    )}
                </div>

                {isScoreLoading ? (
                    <div className="animate-pulse space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-20 rounded-lg border bg-gray-200/40"
                            />
                        ))}
                    </div>
                ) : sortedItems.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        Nenhuma pontuação salva.
                    </p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {sortedItems.map((i) => (
                            <article key={i.id} className={card}>
                                <button
                                    className={trashBtn}
                                    onClick={() => removeItem(i.id)}
                                    title="Remover"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>

                                <div>
                                    <div className={name}>{i.ownerName}</div>
                                    <div className={totalScore}>{i.total}</div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span
                                        className={`${badge} ${
                                            i.playerBateu
                                                ? badgeGreen
                                                : badgeRed
                                        }`}
                                    >
                                        {i.playerBateu
                                            ? "Bateu"
                                            : "Não bateu"}
                                    </span>

                                    <span
                                        className={`${badge} ${
                                            !i.playerNaoPegouMorto
                                                ? badgeGreen
                                                : badgeRed
                                        }`}
                                    >
                                        {!i.playerNaoPegouMorto
                                            ? "Pegou morto"
                                            : "Não pegou morto"}
                                    </span>
                                </div>

                                <div className="mt-2 text-[11px] text-gray-500">
                                    Salvo em{" "}
                                    {new Date(i.createdAt).toLocaleString()}
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <Link href="/" className={navLinkClass}>
                    Voltar para calculadora
                </Link>
            </section>
        </div>
    );
}
