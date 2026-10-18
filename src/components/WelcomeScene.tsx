import { Heart } from "lucide-react"

import { adventureConfig as config } from "../config"

import { PrimaryButton, Stars } from "./Shared"

export function WelcomeScene({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene welcome-scene" aria-labelledby="welcome-title">
      <Stars />
      <div className="moon" aria-hidden="true">
        <span />
      </div>
      <div className="cloud cloud--one" aria-hidden="true" />
      <div className="cloud cloud--two" aria-hidden="true" />
      <div className="welcome-orbit" aria-hidden="true">
        <span className="orbit-line" />
        <Heart className="hero-heart" fill="currentColor" strokeWidth={1.3} />
      </div>
      <main className="welcome-copy story-copy">
        <p className="eyebrow">My heart made this for you</p>
        <h1 id="welcome-title">{config.welcomeMessage}</h1>
        <p className="lead">
          A few moments. A few memories.
          <br />
          One special question.
        </p>
        <PrimaryButton onClick={onNext} light>
          Begin our story
        </PrimaryButton>
        <p className="signature">Made with love, just for you.</p>
      </main>
      <div className="hill hill--far" aria-hidden="true" />
      <div className="hill hill--near" aria-hidden="true" />
    </section>
  )
}
