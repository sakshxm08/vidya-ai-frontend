import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/ThemeStore";

const LandingPage = () => {
  const { theme } = useThemeStore();
  const features = [
    {
      heading: "Socratic Teaching Method",
      description:
        "Vidya uses Socratic methods to guide you through complex problems step-by-step.",
    },
    {
      heading: "Profanity Blocking",
      description:
        "Our AI blocks all profanity, jailbreaking and hallucination attempts.",
    },
    {
      heading: "Custom Knowledge Expansion",
      description:
        "Expand Vidya's knowledge to tackle custom problems and customize teaching content.",
    },
    {
      heading: "Accessible Learning",
      description: "Available to anyone with a phone and internet connection.",
    },
  ];
  return (
    <div className="min-h-screen text-white rounded-xl overflow-hidden bg-white dark:bg-dark">
      <section className="relative flex flex-col gap-16 p-20 items-center text-center h-[calc(100vh-10rem)] bg-gradient-to-r from-blue-500 to-primary-600">
        <div className="flex flex-col gap-6 items-center max-w-2xl">
          <h1 className="text-7xl font-black font-heading">
            Hi, I&apos;m Vidya!
          </h1>
          <h1 className="text-2xl font-bold">Guiding You to Knowledge</h1>
          <p className="text-gray-200">
            Ask Vidya, the AI teacher, to guide you step by step towards
            mastering complex problems using Socratic teaching methods.
            Learning, just like asking your favorite teacher - Available 24/7.
          </p>
        </div>
        <Link
          to="/login"
          className="bg-white z-20 font-heading text-primary-500 px-6 py-2 font-bold rounded cursor-pointer"
        >
          Ask Vidya
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="-bottom-4 absolute"
        >
          <path
            fill={theme === "dark" ? "#1F2937" : "white"}
            fillOpacity="1"
            d="M0,160L60,176C120,192,240,224,360,245.3C480,267,600,277,720,245.3C840,213,960,139,1080,117.3C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>
      <section className="py-10 relative flex flex-col gap-10 items-center">
        <h2 className="text-4xl text-center font-heading font-bold text-primary-500 dark:text-white">
          Why VidyaAI?
        </h2>
        <div className="flex justify-around gap-8 px-8">
          {features.map((feature) => (
            <div
              key={feature.heading}
              className="dark:bg-gray-700 text-primary-500 dark:text-white py-6 px-8 w-1/4 rounded shadow-3xl flex items-center justify-center flex-col gap-2"
            >
              <h3 className="font-bold dark:text-primary-400 text-primary-700 text-lg text-center">
                {feature.heading}
              </h3>
              <p className="text-center text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gradient-to-r mt-10 from-blue-600 to-primary-600 p-4 text-center">
        <p>Made with ❤️ by the Lucid Schemers</p>
      </footer>
    </div>
  );
};

export default LandingPage;
