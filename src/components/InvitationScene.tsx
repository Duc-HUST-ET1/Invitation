import { Heart } from "lucide-react"

import { adventureConfig as config } from "../config"

import {
  getGoogleCalendarUrl,
  isCalendarDateConfigured,
} from "../utils/calendar"

import { CalendarIcon, MapIcon, PrimaryButton } from "./Shared"

export function InvitationScene({
  celebrated,

  onCelebrate,
}: {
  celebrated: boolean

  onCelebrate: () => void
}) {
  const mapQuery = [config.venueName, config.venueAddress]
    .filter(Boolean)
    .join(", ")
  const mapUrl =
    config.googleMapsUrl ||
    (mapQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
      : "")
  const canMap = /^https?:\/\//.test(mapUrl)

  const dateReady = isCalendarDateConfigured(config.date, config.time)
  const openGoogleCalendar = () => {
    const url = getGoogleCalendarUrl()
    if (url) window.open(url, "_blank", "noopener,noreferrer")
  }

  const openMap = () => {
    if (canMap) window.open(mapUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section
      className={`scene invitation-scene ${celebrated ? "is-celebrated" : ""}`}
      aria-labelledby="invitation-title"
    >
      <div className="botanical botanical--left" aria-hidden="true">
        ❧
      </div>
      <div className="botanical botanical--right" aria-hidden="true">
        ❧
      </div>
      {celebrated && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 22 }, (_, index) => (
            <i key={index} style={{ "--i": index } as React.CSSProperties}>
              ♥
            </i>
          ))}
        </div>
      )}
      <main className="invitation-card">
        <span className="invitation-corner one" aria-hidden="true" />
        <span className="invitation-corner two" aria-hidden="true" />
        <div className="invitation-heading">
          <p className="eyebrow">An invitation, just for you</p>
          <h1 id="invitation-title">
            It's a date!{" "}
            <Heart
              size={32}
              fill="currentColor"
              strokeWidth={1.3}
              aria-hidden="true"
            />
          </h1>
          <p className="greeting">
            To my lover, <strong>{config.girlfriendName}</strong>
          </p>
          <p className="invitation-message">
            Would you let me steal a little time with you for good food, little
            adventures, and new memories?
          </p>
        </div>
        <div className="date-details">
          <div>
            <span>Date</span>
            <strong>{config.date}</strong>
          </div>
          <div>
            <span>Time</span>
            <strong>{config.time}</strong>
          </div>
          <div>
            <span>Destination</span>
            <strong>{config.venueName}</strong>
            <small>{config.venueAddress}</small>
          </div>
          <div>
            <span>Our little plan</span>
            <strong>{config.dateActivity}</strong>
          </div>
        </div>
        <blockquote>
          <span>A note for you</span>“{config.personalNote}”
        </blockquote>
        <div className="invitation-primary">
          {celebrated ? (
            <div className="final-message" role="status">
              <Heart size={26} fill="currentColor" aria-hidden="true" />
              <strong>Yay! I can't wait to see you.</strong>
              <small>With love, {config.senderName}</small>
            </div>
          ) : (
            <PrimaryButton onClick={onCelebrate}>
              Let's make this memory
            </PrimaryButton>
          )}
        </div>
        <div className="secondary-actions">
          <button
            onClick={openMap}
            disabled={!canMap}
            title={
              !canMap ? "Add a Google Maps URL in config to enable" : undefined
            }
          >
            <MapIcon />
            Open the map
          </button>
          <button onClick={openGoogleCalendar} disabled={!dateReady}>
            <CalendarIcon />
            Save the date
          </button>
        </div>
      </main>
    </section>
  )
}
