import { useState } from 'react'
import { keymap, type Key, type Override } from './keymap'
import './App.css'

const BASE = 'base'

export default function App() {
  const [layer, setLayer] = useState(BASE)
  const [hovered, setHovered] = useState<Key | null>(null)
  const overrides = keymap.layers[layer]?.keys ?? {}
  const note = hovered && (overrides[hovered.id]?.note ?? (layer === BASE ? hovered.note : undefined))

  return (
    <main>
      <nav>
        {[BASE, ...Object.keys(keymap.layers)].map((name) => (
          <button key={name} aria-pressed={name === layer} onClick={() => setLayer(name)}>
            {name}
          </button>
        ))}
        {layer !== BASE && <span className="trigger">{keymap.layers[layer].trigger}</span>}
      </nav>
      <div className="board">
        {keymap.rows.map((row, i) => (
          <div className="row" key={i}>
            {row.map((key) => (
              <KeyCap
                key={key.id}
                base={key}
                override={layer === BASE ? undefined : overrides[key.id]}
                dimmed={layer !== BASE && !overrides[key.id]}
                onHover={setHovered}
              />
            ))}
          </div>
        ))}
      </div>
      <aside>{note ?? ''}</aside>
    </main>
  )
}

function KeyCap({
  base,
  override,
  dimmed,
  onHover,
}: {
  base: Key
  override?: Override
  dimmed: boolean
  onHover: (key: Key | null) => void
}) {
  const shown = override ?? base
  return (
    <div
      className="key"
      data-dimmed={dimmed}
      data-held={override?.held}
      data-note={Boolean(override?.note ?? (override ? undefined : base.note))}
      style={{ '--w': base.width ?? 1 } as React.CSSProperties}
      onMouseEnter={() => onHover(base)}
      onMouseLeave={() => onHover(null)}
    >
      {override && <span className="origin">{base.tap}</span>}
      {shown.shift && <span className="shift">{shown.shift}</span>}
      <span className="tap">{shown.tap}</span>
      {shown.hold && <span className="hold">{shown.hold}</span>}
    </div>
  )
}
