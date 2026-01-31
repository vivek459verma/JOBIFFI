import { useState, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

/* ===== TYPES ===== */

interface EventItem {
  title: string;
  org: string;
  tags: string[];
  date: string;
  enrolled: string;
  badge: string;
  action: string;
  image: string;
}

interface EventCardProps extends EventItem {}

/* ===== CONSTANTS ===== */

const CARD_WIDTH = 320;
const CARD_GAP = 24;
const STEP = CARD_WIDTH + CARD_GAP;
const CARDS_PER_VIEW = 3;
const ANIMATION_DURATION = 500;

/* ===== MAIN COMPONENT ===== */

const UpcomingEvents = () => {
  const [page, setPage] = useState<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  const events: EventItem[] = [
    {
      title: "EdgeVerve Developer Challenge",
      org: "EdgeVerve Systems",
      tags: ["Java", "C#", "Node.js"],
      date: "1 Feb, 12:00 AM",
      enrolled: "459 Enrolled",
      badge: "Entry closes in 5d",
      action: "Job offer",
      image: "/media/edgeverve1.jpg",
    },
    {
      title: "Sonata Women-In-Tech Hackathon",
      org: "Sonata Software",
      tags: [".NET", "AWS", "C#"],
      date: "8 Dec, 10:00 AM",
      enrolled: "908 Enrolled",
      badge: "Entry closes in 3d",
      action: "Job offer",
      image: "/media/sonata1.jpg",
    },
    {
      title: "Top GenAI Skills to crack 30 LPA+",
      org: "Coding Ninjas",
      tags: ["AI", "ML"],
      date: "28 Jan, 8:30 PM",
      enrolled: "261 Enrolled",
      badge: "Webinar",
      action: "Learn from experts",
      image: "/media/genai1.jpg",
    },
    {
      title: "Zero to Data Analyst Roadmap",
      org: "Coding Ninjas",
      tags: ["SQL", "Python"],
      date: "29 Jan, 7:00 PM",
      enrolled: "581 Enrolled",
      badge: "Entry closes in 1d",
      action: "Learn from experts",
      image: "/media/data-analyst1.jpg",
    },
    {
      title: "Amazon & Google Interview Prep",
      org: "Coding Ninjas",
      tags: ["DSA", "System Design"],
      date: "28 Jan, 8:30 PM",
      enrolled: "261 Enrolled",
      badge: "Webinar",
      action: "Learn from experts",
      image: "/media/interview1.jpg",
    },
    {
      title: "GenAI Projects for 25+ LPA",
      org: "Coding Ninjas",
      tags: ["GenAI", "LLM"],
      date: "29 Jan, 8:30 PM",
      enrolled: "62 Enrolled",
      badge: "Entry closes in 1d",
      action: "Learn from experts",
      image: "/media/llm1.jpg",
    },
  ];

  const maxPage: number = Math.max(0, events.length - CARDS_PER_VIEW);

  const goToPage = (nextPage: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setPage(nextPage);
    setTimeout(() => (isAnimatingRef.current = false), ANIMATION_DURATION);
  };

  return (
    <section className="px-6 py-16 bg-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12">

          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-gray-900">
              Upcoming events and <br /> challenges
            </h2>
          </div>

          <div className="relative w-[1008px]">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out will-change-transform"
                style={{ transform: `translate3d(-${page * STEP}px,0,0)` }}
              >
                {events.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </div>

            {page > 0 && (
              <button
                onClick={() => goToPage(page - 1)}
                className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
              >
                <AiOutlineLeft />
              </button>
            )}

            {page < maxPage && (
              <button
                onClick={() => goToPage(page + 1)}
                className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
              >
                <AiOutlineRight />
              </button>
            )}

            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === page ? "bg-purple-600" : "bg-purple-300"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;

/* ===== CARD COMPONENT ===== */

const EventCard = ({
  title,
  org,
  tags,
  date,
  enrolled,
  badge,
  action,
  image,
}: EventCardProps) => {
  return (
    <div className="relative min-w-[320px] max-w-[320px] bg-white rounded-2xl shadow overflow-hidden border border-gray-100">

      <span className="absolute -left-2 top-1/2 h-4 w-4 bg-blue-50 rounded-full z-10" />
      <span className="absolute -right-2 top-1/2 h-4 w-4 bg-blue-50 rounded-full z-10" />

      <div className="relative h-40 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          srcSet={`${image} 1x, ${image} 2x`}
          sizes="(min-width: 1024px) 320px, 100vw"
          alt={title}
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover contrast-110 saturate-110"
          style={{
            imageRendering: "auto",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
          }}
        />

        <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full">
          {badge}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{org}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="text-xs border px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{date}</span>
          <span>{enrolled}</span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between pt-2">
          <span className="text-purple-600 text-sm">{action}</span>
          <span className="text-blue-600 text-sm">View details</span>
        </div>
      </div>
    </div>
  );
};  