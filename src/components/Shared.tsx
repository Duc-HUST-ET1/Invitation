import type { ReactNode } from "react"

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Heart,
  Map,
  Music2,
  VolumeX,
  X,
} from "lucide-react"

import { scenes, type Scene } from "../types/scene"

export function Stars({ warm = false }: { warm?: boolean }) {
  return (
    <div className={`stars ${warm ? "stars--warm" : ""}`} aria-hidden="true">
      {Array.from({ length: 26 }, (_, index) => (
        <i key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </div>
  )
}

export function HeartMark({ collected = false }: { collected?: boolean }) {
  return (
    <span className="heart-mark" aria-hidden="true">
      <Heart
        className="heart-mark__icon"
        fill="currentColor"
        strokeWidth={1.5}
      />
      {collected && <Check className="heart-mark__check" strokeWidth={3} />}
    </span>
  )
}

export function TopBar({
  scene,

  musicOn,

  musicAvailable,

  onMusic,
}: {
  scene: Scene

  musicOn: boolean

  musicAvailable: boolean

  onMusic: () => void
}) {
  const index = scenes.indexOf(scene)

  const musicLabel = !musicAvailable
    ? "Music unavailable"
    : musicOn
      ? "Mute music"
      : "Play music"

  return (
    <header
      className={`topbar ${
        scene === "memories" || scene === "date-invitation" ? "topbar--ink" : ""
      }`}
    >
      <div className="wordmark">
        <span className="wordmark__mark" aria-hidden="true">
          <Heart size={15} />
        </span>
        <span>
          A little adventure <b>for you</b>
        </span>
      </div>
      <div className="chapter" aria-label={`Chapter ${index + 1} of 5`}>
        <span>Our love story</span>
        <div className="chapter__stars" aria-hidden="true">
          {scenes.map((item, itemIndex) => (
            <i key={item} className={itemIndex <= index ? "is-lit" : ""}>
              ✦
            </i>
          ))}
        </div>
      </div>
      <button
        className="icon-button"
        onClick={onMusic}
        aria-label={musicLabel}
        title={
          musicAvailable ? musicLabel : "Add a music file in config to enable"
        }
        disabled={!musicAvailable}
      >
        {musicOn ? <Music2 size={19} /> : <VolumeX size={19} />}
      </button>
    </header>
  )
}

export function PrimaryButton({
  children,

  onClick,

  light = false,
}: {
  children: ReactNode

  onClick: () => void

  light?: boolean
}) {
  return (
    <button
      className={`primary-button ${light ? "primary-button--light" : ""}`}
      onClick={onClick}
    >
      <span>{children}</span>
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  )
}

export function BackButton({
  scene,

  onClick,
}: {
  scene: Scene

  onClick: () => void
}) {
  if (scene === "welcome") return null

  const ink = scene === "memories" || scene === "date-invitation"

  return (
    <button
      className={`back-button ${ink ? "back-button--ink" : ""}`}
      onClick={onClick}
    >
      <ArrowLeft size={17} aria-hidden="true" />
      <span>Back</span>
    </button>
  )
}

export function CloseButton({
  onClick,

  label,

  buttonRef,
}: {
  onClick: () => void

  label: string

  buttonRef?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={buttonRef}
      className="close-button"
      onClick={onClick}
      aria-label={label}
    >
      <X size={20} aria-hidden="true" />
    </button>
  )
}

export function MapIcon() {
  return <Map size={17} aria-hidden="true" />
}

export function CalendarIcon() {
  return <CalendarDays size={17} aria-hidden="true" />
}
