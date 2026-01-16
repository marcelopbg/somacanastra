'use client'
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TagManager from 'react-gtm-module';

/* =======================
   DOMAIN MODELS
======================= */

class ContagemDeCartas {
  doisComoCoringa: number | null = null
  coringa: number | null = null
  oitoAoRei: number | null = null
  tresAoSete: number | null = null
  As: number | null = null
}

class PlayerScore {
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

  const [score, setScore] = useState<PlayerScore>(new PlayerScore())

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


  useEffect(() => {
const tagManagerArgs = {
   gtmId: 'GTM-KW4HK3RZ'
 };
  TagManager.initialize(tagManagerArgs)
  }, [])

  const total = useMemo(
    () => calculatePoints(playerBateu, playerNaoPegouMorto, score),
    [playerBateu, playerNaoPegouMorto, score]
  )

  return (
    <div>
      <button className="btn" onClick={resetState}>Limpar</button>

      <div>
        <input
          id="playerBateu"
          type="checkbox"
          checked={playerBateu}
          onChange={e => setPlayerBateu(e.target.checked)}
        />
        <label htmlFor="playerBateu">Jogador bateu</label>
      </div>

      <div>
        <input
          id="playerNaoPegouMorto"
          type="checkbox"
          checked={playerNaoPegouMorto}
          onChange={e => setPlayerNaoPegouMorto(e.target.checked)}
        />
        <label htmlFor="playerNaoPegouMorto">
          Jogador não pegou morto
        </label>
      </div>

      <h4>CANASTRAS</h4>
      <div className="lil-gap">
        {canastraFields.map(f => (
          <div className="form-item" key={f.key}>
            <label>{f.label}</label>
            <input
              type="number"
              value={score[f.key] ?? ''}
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
        ))}
      </div>

      <h4>Para SOMAR</h4>
      <div className="lil-gap">
        {cardFields.map(f =>  (
          <div className="form-item" key={f.key}>
            <label>{f.label}</label>
            <input
              type="number"
              value={score.cardsToSum[f.key] ?? ''}
              onChange={e =>
                updateCards(
                  'cardsToSum',
                  f.key,
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
            />
          </div>
        ))}
      </div>

      <h4>Para SUBTRAIR</h4>
      <div className="lil-gap">
        {cardFields.map(f => f.showOnSubtract !== false && (
          <div className="form-item" key={f.key}>
            <label>{f.label}</label>
            <input
              type="number"
              value={score.cardsToSubtract[f.key] ?? ''}
              onChange={e =>
                updateCards(
                  'cardsToSubtract',
                  f.key,
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
            />
          </div>
        ))}
      </div>

      <h3 className='sum-h3'>
        SOMA: {total}
      </h3>
    </div>
  )
}
