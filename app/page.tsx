import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* HERO */}
      <section className="relative mx-auto px-6 pt-28 pb-36 text-center overflow-hidden bg-gray-900  from-gray-700 via-gray-900 to-gray-800opacity-99 ">
        <div className="absolute inset-0 bg-[url('/suits.png')] 
 opacity-3 pointer-events-none -z-20" />



        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 ">
          Soma Canastra
        </h1>


        <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10 text-white">
          Some os pontos da canastra de forma fácil, rápida e intuitiva ao final de cada rodada.

        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
          <a
            href="/app"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-teal-700 font-semibold px-12 py-5 text-lg shadow-2xl hover:scale-105 transition"
          >
            <Image src="/favicon.ico" width={28} height={28} alt="Soma Canastra" />
            Abrir calculadora
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-10 py-5 font-semibold hover:bg-white/10 transition"
          >
            Como funciona
          </a>
        </div>

        <p className="text-sm text-white-200">
          Abriu, jogou, somou. Sem cadastro.
        </p>
      </section>

      {/* SOBRE */}
      <section className="relative -mt-24 z-10 bg-white text-gray-900 py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">O que é o Soma Canastra?</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            O <strong>Soma Canastra</strong> é um aplicativo criado para facilitar a contagem de pontos
            da canastra. Ele substitui papel, caneta e contas manuais, permitindo que você registre
            os pontos de cada rodada e acompanhe automaticamente o total da partida até definir
            o vencedor.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-32 bg-gradient-to-br from-sky-50 via-white to-purple-50 text-gray-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Como funciona</h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <Step
              emoji="♣️"
              title="Preencha a rodada"
              description="Informe se bateu, se pegou o morto, as canastras e as cartas da rodada."
            />
            <Step
              emoji="♦️"
              title="Cálculo automático"
              description="O app aplica automaticamente as regras da canastra e faz toda a conta."
            />
            <Step
              emoji="♠️"
              title="Salve e continue"
              description="Salve a rodada e siga o jogo. O histórico fica organizado."
            />
            <Step
              emoji="♥️"
              title="Resultado claro"
              description="Ranking e total por jogador atualizados a cada rodada."
            />
          </div>
        </div>
      </section>

      {/* PONTUAÇÃO */}
      <section className="py-32 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Pontuação considerada</h2>
          <p className="text-center text-gray-600 mb-12">
            Seguindo as regras tradicionais da canastra.
          </p>

          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Jogada</th>
                  <th className="px-6 py-4 text-left font-semibold">Pontuação</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <Row label="Batida" value="100 pontos" />
                <Row label="Não pegou morto" value="-100 pontos" />
                <Row label="2 usado como curinga" value="10 pontos cada" />
                <Row label="Curinga (Joker)" value="50 pontos cada" />
                <Row label="Do Rei ao 8" value="10 pontos cada carta" />
                <Row label="Do 7 ao 3" value="5 pontos cada carta" />
                <Row label="Ás" value="15 pontos cada" />
                <Row label="Canastra Suja" value="100 pontos" />
                <Row label="Canastra Limpa" value="200 pontos" />
                <Row label="Canastra de Quinhentos" value="500 pontos" />
                <Row label="Canastra Real" value="1000 pontos" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative mx-auto px-6 pt-28 pb-36 text-center overflow-hidden bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 opacity-98">
        <div className="absolute inset-0 bg-[url('/suits.png')] 
 opacity-2 pointer-events-none -z-20 bg-white-300 " />
 
         <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para jogar?</h2>
        <p className="text-white-100 text-lg mb-12 font-semibold">
          Abra a calculadora e deixe o Soma Canastra cuidar das contas.
        </p>
        <a
          href="/app"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-green-700 font-semibold px-14 py-5 text-lg shadow-2xl hover:scale-105 transition"
        >
          <Image src="/favicon.ico" width={28} height={28} alt="Soma Canastra" />

          Começar agora
        </a>
        {/* </div> */}
      </section>

      {/* FOOTER */}
      <footer className="text-gray-200 py-10 text-center text-purple-200 bg-gray-700 text-white">
        <p className="text-sm">© {new Date().getFullYear()} Soma Canastra. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}

function Step({ title, description, emoji }: { title: string; description: string, emoji: string }) {
  return (
    <div className="w-full sm:w-[18rem] md:w-[20rem] flex flex-col gap-1 rounded-3xl bg-white p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <span className="text-2xl font-semibold text-center w-full">{emoji}</span>
      <p className="mt-3 text-gray-600 text-lg">{description}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">{label}</td>
      <td className="px-6 py-4 font-medium">{value}</td>
    </tr>
  );
}
