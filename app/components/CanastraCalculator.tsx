'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { navLinkClass, primaryButtonClass, secondaryButtonClass } from '../lib/styleElements'
import { SaveDialog } from './SaveDialog'
import { useScoreContext } from './ScoreContext'
// Tailwind replaces all custom CSS styles

/* =======================
   DOMAIN MODELS
======================= */
export type SavedScore = {
  id: string
  ownerName: string
  total: number
  playerBateu: boolean
  playerNaoPegouMorto: boolean
  score: PlayerScore
  createdAt: string
}


export class ContagemDeCartas {
  doisComoCoringa: number | null = null
  coringa: number | null = null
  oitoAoRei: number | null = null
  tresAoSete: number | null = null
  As: number | null = null
}

export class PlayerScore {
  canastraLimpa: number | null = null
  canastraSuja: number | null = null
  canastra500: number | null = null
  canastra1000: number | null = null
  cardsToSum = new ContagemDeCartas()
  cardsToSubtract = new ContagemDeCartas()
}

/* =======================
   CALCULATION LOGIC
======================= */

const n = (v: number | null) => v ?? 0

const calculateCardsValue = (
  isPositive: boolean,
  cards: ContagemDeCartas
) => {
  const multiplier = isPositive ? 1 : -1

  let points = 0
  points += n(cards.As) * 15
  points += n(cards.coringa) * 50
  points += n(cards.doisComoCoringa) * 10
  points += n(cards.oitoAoRei) * 10
  points += n(cards.tresAoSete) * 5

  return points * multiplier
}

const calculatePoints = (
  playerBateu: boolean,
  playerNaoPegouMorto: boolean,
  score: PlayerScore
) => {
  let points = 0

  if (playerBateu) points += 100
  if (playerNaoPegouMorto) points -= 100

  points += n(score.canastraLimpa) * 200
  points += n(score.canastraSuja) * 100
  points += n(score.canastra1000) * 1000
  points += n(score.canastra500) * 500

  points += calculateCardsValue(true, score.cardsToSum)
  points += calculateCardsValue(false, score.cardsToSubtract)

  return points
}

/* =======================
   UI
======================= */

type CardKey = keyof ContagemDeCartas
type CanastraKey =
  | 'canastraLimpa'
  | 'canastraSuja'
  | 'canastra500'
  | 'canastra1000'

const cardFields: { key: CardKey; label: string; showOnSubtract: boolean }[] = [
  { key: 'doisComoCoringa', label: 'Dois como coringa', showOnSubtract: false },
  { key: 'coringa', label: 'Coringa', showOnSubtract: true },
  { key: 'As', label: 'Ás', showOnSubtract: true },
  { key: 'oitoAoRei', label: '8 - K', showOnSubtract: true },
  { key: 'tresAoSete', label: '3 - 7', showOnSubtract: true },
]

const canastraFields: { key: CanastraKey; label: string }[] = [
  { key: 'canastraLimpa', label: 'Limpa' },
  { key: 'canastraSuja', label: 'Suja' },
  { key: 'canastra500', label: '500' },
  { key: 'canastra1000', label: '1000' },
]

export default function CanastraCalculator() {
  const [playerBateu, setPlayerBateu] = useState(false)
  const [playerNaoPegouMorto, setPlayerNaoPegouMorto] = useState(false)
  const {score, setScore } = useScoreContext();

  const updateCards = (
    target: 'cardsToSum' | 'cardsToSubtract',
    key: CardKey,
    value: number | null
  ) => {
    setScore(prev => {
      const next = structuredClone(prev)
      next[target][key] = value
      return next
    })
  }

  const resetState = () => {
    setPlayerBateu(false)
    setPlayerNaoPegouMorto(false)
    setScore(new PlayerScore())
  }

  const total = useMemo(
    () => calculatePoints(playerBateu, playerNaoPegouMorto, score),
    [playerBateu, playerNaoPegouMorto, score]
  )

  // Reusable className constants
  const containerClass = 'flex flex-col gap-3'
  const checkboxGroupClass = 'flex flex-col gap-1'
  const checkboxLabelClass = 'ml-2'
  const sectionTitleClass = 'font-bold uppercase'
  const groupColumnClass = 'flex flex-col gap-[6px] pl-[12px]'
  const rowItemClass = 'flex w-[330px] justify-between'
  const inputLabelClassName = 'min-w-[140px]'
  const inputNumberClass = 'w-[170px] rounded border border-gray-400 dark:border-gray-500 bg-transparent px-2 py-[4px] text-inherit focus:ring-0 focus:border-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300 focus-visible:outline-offse t-1'
  const sumTitleClass = 'font-semibold text-lg text-green-600 dark:text-[lightgreen]'
  const sectionClass = 'flex flex-col gap-2';




  const [isSaveOpen, setIsSaveOpen] = useState(false)

  return (
    <div className={containerClass}>
      <SaveDialog
        isSaveOpen={isSaveOpen}
        setIsSaveOpen={setIsSaveOpen}
        playerBateu={playerBateu}
        playerNaoPegouMorto={playerNaoPegouMorto}
        total={total}
        score={score}
        resetState={resetState}
      ></SaveDialog>
      {/* Limpar moved to bottom right and less prominent */}
      <div className={checkboxGroupClass}>
        <div>
          <input
            id="playerBateu"
            type="checkbox"
            checked={playerBateu}
            onChange={e => setPlayerBateu(e.target.checked)}
          />
          <label htmlFor="playerBateu" className={checkboxLabelClass}>Jogador bateu</label>
        </div>

        <div>
          <input
            id="playerNaoPegouMorto"
            type="checkbox"
            checked={playerNaoPegouMorto}
            onChange={e => setPlayerNaoPegouMorto(e.target.checked)}
          />
          <label htmlFor="playerNaoPegouMorto" className={checkboxLabelClass}>
            Jogador não pegou morto
          </label>
        </div>
      </div>
      <section className={sectionClass}>
        <h4 className={sectionTitleClass}>CANASTRAS</h4>
        <div className={groupColumnClass}>
          {canastraFields.map(f => {
            const inputId = `canastra_${f.key}`
            return (
              <div className={rowItemClass} key={f.key}>
                <label className={inputLabelClassName} htmlFor={inputId}>{f.label}</label>
                <input
                  id={inputId}
                  type="number"
                  value={score[f.key] ?? ''}
                  className={inputNumberClass}
                  onChange={e =>
                    setScore(prev => {
                      const next = structuredClone(prev)
                      next[f.key] =
                        e.target.value === '' ? null : Number(e.target.value)
                      return next
                    })
                  }
                />
              </div>
            )
          })}
        </div>
      </section>
      <section className={sectionClass}>
        <h4 className={sectionTitleClass}>Para SOMAR</h4>
        <div className={groupColumnClass}>
          {cardFields.map(f => {
            const inputId = `sum_${f.key}`
            return (
              <div className={rowItemClass} key={f.key}>
                <label className={inputLabelClassName} htmlFor={inputId}>{f.label}</label>
                <input
                  id={inputId}
                  type="number"
                  value={score.cardsToSum[f.key] ?? ''}
                  className={inputNumberClass}
                  onChange={e =>
                    updateCards(
                      'cardsToSum',
                      f.key,
                      e.target.value === '' ? null : Number(e.target.value)
                    )
                  }
                />
              </div>
            )
          })}
        </div>
      </section>
      <section className={sectionClass}>
        <h4 className={sectionTitleClass}>Para SUBTRAIR</h4>
        <div className={groupColumnClass}>
          {cardFields.map(f => f.showOnSubtract !== false && (() => {
            const inputId = `sub_${f.key}`
            return (
              <div className={rowItemClass} key={f.key}>
                <label className={inputLabelClassName} htmlFor={inputId}>{f.label}</label>
                <input
                  id={inputId}
                  type="number"
                  value={score.cardsToSubtract[f.key] ?? ''}
                  className={inputNumberClass}
                  onChange={e =>
                    updateCards(
                      'cardsToSubtract',
                      f.key,
                      e.target.value === '' ? null : Number(e.target.value)
                    )
                  }
                />
              </div>
            )
          })())}
        </div>
      </section>

      <h3 className={sumTitleClass}>
        SOMA: {total}
      </h3>

      <div className="flex justify-end gap-2 mt-2">
          <button className={primaryButtonClass} onClick={() => setIsSaveOpen(true)}>Salvar</button>
          <button className={secondaryButtonClass} onClick={resetState}>Limpar</button>
        <Link href="/pontuacoes-salvas" className={navLinkClass}>Ver pontuações salvas</Link>
      </div>

    </div>
  )
}
