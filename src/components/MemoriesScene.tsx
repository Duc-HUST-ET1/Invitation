import { useEffect, useRef, useState } from "react"

import type { Memory } from "../config"

import { adventureConfig as config } from "../config"

import { CloseButton, PrimaryButton } from "./Shared"

function PlaceholderArt({ index }: { index: number }) {
  return (
    <div
      className={`placeholder-art placeholder-art--${index + 1}`}
      role="img"
      aria-label={config.memories[index].alt}
    >
      <span className="placeholder-sun" />
      <span className="placeholder-hill one" />
      <span className="placeholder-hill two" />
      <span className="placeholder-figures">♥</span>
    </div>
  )
}

function MemoryImage({ memory, index }: { memory: Memory; index: number }) {
  const [failed, setFailed] = useState(false)

  if (!memory.src || failed) return <PlaceholderArt index={index} />

  return (
    <img src={memory.src} alt={memory.alt} onError={() => setFailed(true)} />
  )
}

export function MemoriesScene({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<number | null>(null)

  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (selected === null) return

    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null)
    }

    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [selected])

  return (
    <section className="scene memories-scene" aria-labelledby="memories-title">
      <div className="paper-doodles" aria-hidden="true">
        ✦　♡　·　✦
      </div>
      <main className="memories-layout">
        <div className="memories-heading story-copy">
          <p className="eyebrow">Chapter three · keepsakes</p>
          <h1 id="memories-title">Our little collection of memories.</h1>
          <p className="lead">A few moments I want to keep close.</p>
        </div>
        <div className="polaroid-grid">
          {config.memories.map((memory, index) => (
            <button
              className={`polaroid polaroid--${index + 1}`}
              key={memory.caption}
              onClick={() => setSelected(index)}
              aria-label={`Open photo: ${memory.caption}`}
            >
              <span className="tape" aria-hidden="true" />
              <span className="photo-frame">
                <MemoryImage memory={memory} index={index} />
              </span>
              <span className="polaroid-caption">{memory.caption}</span>
              <span className="polaroid-number">0{index + 1}</span>
            </button>
          ))}
        </div>
        <div className="memories-next">
          <p>Ready for our next little adventure?</p>
          <PrimaryButton onClick={onNext}>Let's see what's next</PrimaryButton>
        </div>
      </main>
      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={config.memories[selected].caption}
          onMouseDown={(event) =>
            event.target === event.currentTarget && setSelected(null)
          }
        >
          <div className="lightbox__paper">
            <CloseButton
              buttonRef={closeRef}
              onClick={() => setSelected(null)}
              label="Close photograph"
            />
            <div className="lightbox__image">
              <MemoryImage
                memory={config.memories[selected]}
                index={selected}
              />
            </div>
            <p>{config.memories[selected].caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}
