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
  girlfriendName: "[Vũ Hương Giang]",
  senderName: "[Bà chã hơm]",
  welcomeMessage: "I made a little adventure just for you.",
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
      src: "",
      caption: "One of my favorite days.",
      alt: "Add your first favorite photograph here",
    },
    {
      src: "",
      caption: "A little moment, a big memory.",
      alt: "Add a photograph of a meaningful little moment here",
    },
    {
      src: "",
      caption: "More memories to come.",
      alt: "Add another favorite photograph here",
    },
  ] satisfies Memory[],
  date: "[DATE]",
  time: "[TIME]",
  venueName: "[VENUE_NAME]",
  venueAddress: "[VENUE_ADDRESS]",
  dateActivity: "[DATE_ACTIVITY]",
  personalNote:
    "I can't promise a perfect day, but I can promise that I'll be very happy to spend it with you.",
  googleMapsUrl: "",
  backgroundMusicPath: "",
};
