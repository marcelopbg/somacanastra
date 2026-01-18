import CanastraCalculator from "./components/CanastraCalculator";

// app/page.tsx
export default function Page() {
  return (
    <main className="w-full flex justify-center">
      {/* Visible content */}
      <CanastraCalculator />

      {/* SEO + Accessibility content (dvisually hidden, indexable) */}
      <section className="sr-only" aria-labelledby="page-title">
  <h1 id="page-title">CAlculadora de Pontos Canastra e Pontos Buraco</h1>

        <p>
          O Soma Canastra é uma calculadora online para calcular os pontos da canastra
          e os pontos do buraco de forma simples e precisa. O app foi criado para
          ajudar jogadores a somar corretamente a pontuação ao final de cada partida,
          evitando erros comuns na contagem manual.
        </p>

        <p>
          Com esta calculadora de canastra e buraco, é possível calcular rapidamente
          canastras limpas, canastras sujas, cartas restantes na mão, curingas,
          penalidades e bônus como bater no jogo ou não pegar o morto.
        </p>

        <p>
          Use o Soma Canastra como marcador de pontos durante o jogo ou apenas no final
          da partida para conferir se a pontuação da canastra ou do buraco está correta.
        </p>
      </section>

    </main>
  )
}
