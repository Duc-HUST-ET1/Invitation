export type HeartMessage = {
  kicker: string;
  message: string;
};

export type Memory = {
  src: string;
  caption: string;
  alt: string;
};

export const adventureConfig = {
  girlfriendName: "Vũ Hương Giang",
  senderName: "Bà chã hơm",
  welcomeMessage: "JUST FOR YOU BABY.",
  hearts: [
    {
      kicker: "One thing I love about you",
      message:
        "You have a way of making ordinary days feel a little more special.",
    },
    {
      kicker: "One thing that makes me miss you",
      message:
        "Sometimes, the smallest moments are the ones I wish I could share with you.",
    },
    {
      kicker: "One thing I want more of",
      message:
        "More little adventures, more laughter, and more memories with you.",
    },
  ] satisfies HeartMessage[],
  memories: [
    {
      src: "./images/memory-1.jpg?v=2",
      caption: "One of my unforgettable days, the day you became my lover.",
      alt: "Add your first favorite photograph here",
    },
    {
      src: "./images/memory-2.jpg?v=2",
      caption: "A daily moment together, a big memory we have.",
      alt: "Add a photograph of a meaningful little moment here",
    },
    {
      src: "./images/memory-3.jpg?v=2",
      caption: "More memories to come through our journey together.",
      alt: "Add another favorite photograph here",
    },
  ] satisfies Memory[],
  date: "22/10/2026",
  time: "07:30 PM",
  venueName: "MOCHI FILM STUDIOS",
  venueAddress: "4/12 Khuat Duy Tien, Thanh Xuan, Ha Noi",
  dateActivity: "PHOTOBOOTH, GAMES, AND A SPECIAL SURPRISE",
  personalNote:
    "I can't promise a perfect day, but I can promise that I'll be very happy to spend it with you.",
  googleMapsUrl: "https://maps.app.goo.gl/pdamxvBEeorM31ux6",
  backgroundMusicPath: "./music/background.mp3?v=2",
};
