import { useEffect, useState } from "react"

import { adventureConfig as config } from "../config"

import { CloseButton, HeartMark, PrimaryButton, Stars } from "./Shared"

export function HeartGardenScene({
  collected,

  onCollect,

  onContinue,
}: {
  collected: number[]

  onCollect: (index: number) => void

  onContinue: () => void
}) {
  const [messageIndex, setMessageIndex] = useState<number | null>(null)

  useEffect(() => {
    if (messageIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMessageIndex(null)
    }

    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [messageIndex])

  const showMessage = (index: number) => {
    onCollect(index)

    setMessageIndex(index)
  }

  return (
    <section className="scene garden-scene" aria-labelledby="garden-title">
      <Stars warm />
      <div className="garden-glow" aria-hidden="true" />
      <main className="garden-layout">
        <div className="garden-copy story-copy">
          <p className="eyebrow">A tiny quest</p>
          <h1 id="garden-title">Collect a few little hearts.</h1>
          <p className="lead">Each one holds something I want you to know.</p>
          <div className="quest-count" aria-live="polite">
            <span>Little hearts found</span>
            <strong>
              {collected.length} <i>/ 3</i>
            </strong>
            <div className="quest-track">
              <span style={{ width: `${(collected.length / 3) * 100}%` }} />
            </div>
          </div>
          <p className="hint">Tap a glowing heart to read its message.</p>
          {collected.length === 3 ? (
            <div className="quest-complete">
              <p>You found all the little hearts.</p>
              <PrimaryButton onClick={onContinue}>
                Discover our memories
              </PrimaryButton>
            </div>
          ) : (
            <button className="text-button" onClick={onContinue}>
              Skip this little quest
            </button>
          )}
        </div>
        <div
          className="garden-stage"
          aria-label="Magical garden with three collectible hearts"
        >
          <div className="garden-moon" aria-hidden="true" />
          <div className="path" aria-hidden="true" />
          <div className="flowers" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
              <i key={index} style={{ "--i": index } as React.CSSProperties}>
                ✦
              </i>
            ))}
          </div>
          {config.hearts.map((_, index) => {
            const isCollected = collected.includes(index)

            return (
              <button
                key={index}
                className={`collectible collectible--${index + 1} ${
                  isCollected ? "is-collected" : ""
                }`}
                onClick={() => showMessage(index)}
                aria-label={
                  isCollected
                    ? `View heart ${index + 1} message again`
                    : `Collect heart ${index + 1}`
                }
              >
                <HeartMark collected={isCollected} />
                <span className="spark-ring" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </main>
      {messageIndex !== null && (
        <div
          className="note-backdrop"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setMessageIndex(null)
          }
        >
          <div
            className="heart-note"
            role="dialog"
            aria-modal="true"
            aria-labelledby="heart-note-title"
          >
            <CloseButton
              onClick={() => setMessageIndex(null)}
              label="Close message"
            />
            <span className="note-heart">
              <HeartMark collected />
            </span>
            <p className="eyebrow">Heart {messageIndex + 1} of 3</p>
            <h2 id="heart-note-title">{config.hearts[messageIndex].kicker}</h2>
            <p>{config.hearts[messageIndex].message}</p>
            <button
              className="note-button"
              onClick={() => setMessageIndex(null)}
            >
              Keep this close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
