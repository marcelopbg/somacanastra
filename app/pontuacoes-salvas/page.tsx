// app/page.tsx
'use client'
import { ScoreContextProvider, useScoreContext } from "../components/ScoreContext";
import ScoreList from "../components/ScoreList";


export default function Page() {
    const { scoreList, isScoreLoading, clearAll, removeItem } = useScoreContext()
    return (
        <ScoreContextProvider>
            <main className="w-full flex justify-center">
                {/* Visible content */}
                <ScoreList items={scoreList} clearAll={clearAll} removeItem={removeItem} isScoreLoading={isScoreLoading} />
                {/* SEO + Accessibility content (dvisually hidden, indexable) */}
                <section className="sr-only" aria-labelledby="page-title">
                    <h1 id="page-title">Soma Canastra | Pontuacoes Salvas</h1>

                    <p>
                      Visualize todas as pontuações salvas da Canastra em um só lugar. Acompanhe o total de pontos por jogador, veja quem bateu, quem pegou o morto e gerencie os resultados com facilidade, removendo partidas individuais ou limpando toda a lista quando quiser.
                    </p>
                </section>

            </main>
        </ScoreContextProvider>
    )
}
