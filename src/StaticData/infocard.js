import Book from "../assets/Ghiphy/Book.gif";
import Coach from "../assets/Ghiphy/Coach.gif";
import Event from "../assets/Ghiphy/Event.gif";
import Gym from "../assets/Ghiphy/Gym.gif";
import Host from "../assets/Ghiphy/Host_play.gif";
import Run from "../assets/Ghiphy/run.gif";

const carddata = [
  {
    title: "Book",
    subtitle: ["Reserve Nearby Turf", "Book it.Play it", "Find.Book.Smash"],
    image: Book,
    route: "/venue",
  },
  {
    title: "Play / Host",
    subtitle: [
      "Your Game, Your Rules",
      "No Team,No problem",
      "Your Game,Tour Crew",
    ],
    image: Host,
    route: "/Host",
  },
  {
    title: "Coach",
    subtitle: ["Find Your Coach", "Train with Experts", "Skills Start Here"],
    image: Coach,
    route: "/Coach",
  },
  {
    title: "Run",
    subtitle: ["Run Clubs Near You", "Community Runs", "Club Up.Run Free."],
    image: Run,
    route: "/Run",
  },
  {
    title: "Event",
    subtitle: ["Explore Fitness Events", "Sweat in Style", "Join the Movement"],
    image: Event,
    route: "/Events",
  },
  {
    title: "Gym",
    subtitle: ["Discover Nearby Gyms", "Flex Gym Access", "Book. Burn. Build."],
    image: Gym,
    route: "/Gym",
  },
];

export default {
  carddata,
};
