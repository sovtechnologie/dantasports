import image from "../assets/heroImages/character-left.png";
import Book from "../assets/Ghiphy/Book.mp4";
import Coach from "../assets/Ghiphy/Coach.mp4";
import Event from "../assets/Ghiphy/Event.mp4";
// import Gym from "../assets/Ghiphy/Gym(1).mp4";
import Host from "../assets/Ghiphy/Host_Play.mp4";
import Run from "../assets/Ghiphy/Run.mp4";
import { Route } from "react-router-dom";

const carddata = [
  {
    title: "Book",
    subtitle: ["Reserve Nearby Turf", "Book it.Play it", "Find.Book.Smash"],
    image:  "/images/book.png", // Replace with actual image paths
    video: Book,
    route:"/venue"
  },
  {
    title: "Play / Host",
    subtitle: [
      "Your Game, Your Rules",
      "No Team,No problem",
      "Your Game,Tour Crew",
    ],
    image: "/images/play.png",
    video: Host,
  },
  {
    title: "Coach",
    subtitle: ["Find Your Coach", "Train with Experts", "Skills Start Here"],
    image: "/images/coach.png",
    video: Coach,
  },
  {
    title: "Run",
    subtitle: ["Run Clubs Near You", "Community Runs", "Club Up.Run Free."],
    image: "/images/run.png",
    video: Run,
  },
  {
    title: "Event",
    subtitle: ["Explore Fitness Events", "Sweat in Style", "Join the Movement"],
    image: "/images/coach.png",
    video: Event,
  },
];

export default {
  carddata,
};
