import { adventureConfig as config } from "../config"

import { PrimaryButton, Stars } from "./Shared"

export function GiftScene({
  opened,

  onOpen,

  onNext,
}: {
  opened: boolean

  onOpen: () => void

  onNext: () => void
}) {
  return (
    <section
      className={`scene gift-scene ${opened ? "gift-is-open" : ""}`}
      aria-labelledby="gift-title"
    >
      <Stars warm />
      <div className="gift-aura" aria-hidden="true" />
      <main className="gift-layout">
        <div className="gift-heading story-copy">
          <p className="eyebrow">Chapter four · almost there</p>
          <h1 id="gift-title">One last little surprise.</h1>
          <p className="lead">
            There's something I've been looking forward to telling you.
          </p>
        </div>
        {!opened ? (
          <div className="gift-action">
            <button
              className="gift-box"
              onClick={onOpen}
              aria-label="Open your gift"
            >
              <span className="gift-lid">
                <i />
              </span>
              <span className="gift-body">
                <i />
              </span>
              <span className="gift-bow">♡</span>
            </button>
            <button className="gift-open-button" onClick={onOpen}>
              Open your gift
            </button>
          </div>
        ) : (
          <div className="revealed-letter">
            <span className="wax-seal" aria-hidden="true">
              ♡
            </span>
            <p>
              Because the best memories aren't only the ones we look back on…
            </p>
            <h2>I want to make some new ones with you.</h2>
            <PrimaryButton onClick={onNext}>Reveal our date</PrimaryButton>
          </div>
        )}
      </main>
    </section>
  )
}
