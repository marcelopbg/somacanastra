// app/page.tsx
import CanastraCalculator from './CanastraCalculator'

export default function Page() {
  return (
    <main style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      {/* Visible content */}
      <CanastraCalculator />

      {/* SEO + Accessibility content (dvisually hidden, indexable) */}
      <section className="sr-only">
        <h1>Calculadora de Pontuação de Canastra</h1>

        <p>
          Esta calculadora de canastra permite calcular a pontuação
          final do jogo de forma rápida e precisa, seguindo as regras
          tradicionais da canastra brasileira.
        </p>

        <h2>Como funciona a pontuação da Canastra</h2>
        <p>
          A pontuação da canastra considera canastras limpas, canastras
          sujas, cartas restantes na mão, curingas, ases e penalidades
          como não pegar o morto ou bater no jogo.
        </p>

        <h2>Regras de pontuação consideradas</h2>
        <ul>
          <li>Canastra limpa vale 200 pontos</li>
          <li>Canastra suja vale 100 pontos</li>
          <li>Canastra de 500 pontos</li>
          <li>Canastra de 1000 pontos</li>
          <li>Coringa vale 50 pontos</li>
          <li>Ás vale 15 pontos</li>
          <li>Cartas de 8 a K valem 10 pontos</li>
          <li>Cartas de 3 a 7 valem 5 pontos</li>
          <li>Bater adiciona 100 pontos</li>
          <li>Não pegar o morto subtrai 100 pontos</li>
        </ul>

        <p>
          Use esta calculadora de canastra online para conferir a
          pontuação correta ao final de cada partida.
        </p>
      </section>
    </main>
  )
}
