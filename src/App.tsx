import { useEffect, useRef, useState } from "react"

import { adventureConfig as config } from "./config"

import { GiftScene } from "./components/GiftScene"

import { HeartGardenScene } from "./components/HeartGardenScene"

import { InvitationScene } from "./components/InvitationScene"

import { MemoriesScene } from "./components/MemoriesScene"

import { BackButton, TopBar } from "./components/Shared"

import { WelcomeScene } from "./components/WelcomeScene"

import { scenes, type Scene } from "./types/scene"

export default function App() {
  const [scene, setScene] = useState<Scene>("welcome")

  const [collected, setCollected] = useState<number[]>([])

  const [giftOpened, setGiftOpened] = useState(false)

  const [celebrated, setCelebrated] = useState(false)

  const [musicOn, setMusicOn] = useState(false)

  const [musicNotice, setMusicNotice] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const sceneIndex = scenes.indexOf(scene)

  useEffect(() => {
    if (!config.backgroundMusicPath) return

    const audio = new Audio(config.backgroundMusicPath)

    audio.loop = true

    audio.volume = 0.18

    audioRef.current = audio

    return () => {
      audio.pause()

      audioRef.current = null
    }
  }, [])

  const goTo = (next: Scene) => {
    setScene(next)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const begin = () => {
    audioRef.current
      ?.play()

      .then(() => setMusicOn(true))

      .catch(() => setMusicOn(false))

    goTo("heart-garden")
  }

  const toggleMusic = () => {
    const audio = audioRef.current

    if (!audio) {
      setMusicNotice(true)

      window.setTimeout(() => setMusicNotice(false), 2600)

      return
    }

    if (musicOn) {
      audio.pause()

      setMusicOn(false)

      return
    }

    audio
      .play()

      .then(() => {
        setMusicOn(true)

        setMusicNotice(false)
      })

      .catch(() => setMusicOn(false))
  }

  const collectHeart = (index: number) => {
    setCollected((current) =>
      current.includes(index) ? current : [...current, index],
    )
  }

  return (
    <div className="app-shell">
      <TopBar
        scene={scene}
        musicOn={musicOn}
        musicAvailable={Boolean(config.backgroundMusicPath)}
        onMusic={toggleMusic}
      />
      <BackButton scene={scene} onClick={() => goTo(scenes[sceneIndex - 1])} />
      {musicNotice && (
        <div className="toast" role="status">
          Music is ready when you add a local audio file.
        </div>
      )}
      <div key={scene} className="scene-transition">
        {scene === "welcome" && <WelcomeScene onNext={begin} />}
        {scene === "heart-garden" && (
          <HeartGardenScene
            collected={collected}
            onCollect={collectHeart}
            onContinue={() => goTo("memories")}
          />
        )}
        {scene === "memories" && <MemoriesScene onNext={() => goTo("gift")} />}
        {scene === "gift" && (
          <GiftScene
            opened={giftOpened}
            onOpen={() => setGiftOpened(true)}
            onNext={() => goTo("date-invitation")}
          />
        )}
        {scene === "date-invitation" && (
          <InvitationScene
            celebrated={celebrated}
            onCelebrate={() => setCelebrated(true)}
          />
        )}
      </div>
    </div>
  )
}
