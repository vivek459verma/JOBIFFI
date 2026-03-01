import { useState, useRef, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

/* ===== IMAGE IMPORTS ===== */
import edgeverveImg from "../../assets/media/edgeverve1.jpg";
import sonataImg from "../../assets/media/sonata1.jpg";
import genaiImg from "../../assets/media/genai1.jpg";
import dataAnalystImg from "../../assets/media/data-analyst1.jpg";
import interviewImg from "../../assets/media/interview1.jpg";
import llmImg from "../../assets/media/llm1.jpg";
import eventsSwipeImg from "../../assets/media/eventsSwipe.png";

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

/* ===== CONSTANTS (NAUKRI MATCH) ===== */

const CARD_WIDTH = 320;
const CARD_GAP = 20;
const STEP = CARD_WIDTH + CARD_GAP;
// const CARDS_PER_VIEW = 3;
const ANIMATION_DURATION = 500;

/* ===== MAIN COMPONENT ===== */

const UpcomingEvents = () => {
  const [page, setPage] = useState(0);
  const [cardPreview, setCardPreview] = useState(3);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 768) {
        setCardPreview(1);
      } else if(window.innerWidth < 1024) {
        setCardPreview(2);
      } else {
        setCardPreview(3);
      }
      
    }
    handleResize();
    window.addEventListener("resize",handleResize);
    return () => window.removeEventListener("resize",handleResize);
  },[]);

  const events: EventItem[] = [
    {
      title: "EdgeVerve Developer Challenge",
      org: "EdgeVerve Systems",
      tags: ["Java", "C#", "Node.js"],
      date: "1 Feb, 12:00 AM",
      enrolled: "459 Enrolled",
      badge: "Entry closes in 5d",
      action: "Job offer",
      image: edgeverveImg,
    },
    {
      title: "Sonata Women-In-Tech Hackathon",
      org: "Sonata Software",
      tags: [".NET", "AWS", "C#"],
      date: "8 Dec, 10:00 AM",
      enrolled: "908 Enrolled",
      badge: "Entry closes in 3d",
      action: "Job offer",
      image: sonataImg,
    },
    {
      title: "Top GenAI Skills to crack 30 LPA+",
      org: "Coding Ninjas",
      tags: ["AI", "ML"],
      date: "28 Jan, 8:30 PM",
      enrolled: "261 Enrolled",
      badge: "Webinar",
      action: "Learn from experts",
      image: genaiImg,
    },
    {
      title: "Zero to Data Analyst Roadmap",
      org: "Coding Ninjas",
      tags: ["SQL", "Python"],
      date: "29 Jan, 7:00 PM",
      enrolled: "581 Enrolled",
      badge: "Entry closes in 1d",
      action: "Learn from experts",
      image: dataAnalystImg,
    },
    {
      title: "Amazon & Google Interview Prep",
      org: "Coding Ninjas",
      tags: ["DSA", "System Design"],
      date: "28 Jan, 8:30 PM",
      enrolled: "261 Enrolled",
      badge: "Webinar",
      action: "Learn from experts",
      image: interviewImg,
    },
    {
      title: "GenAI Projects for 25+ LPA",
      org: "Coding Ninjas",
      tags: ["GenAI", "LLM"],
      date: "29 Jan, 8:30 PM",
      enrolled: "62 Enrolled",
      badge: "Entry closes in 1d",
      action: "Learn from experts",
      image: llmImg,
    },
  ];

  const maxPage = Math.max(0, events.length - cardPreview);

  const goToPage = (nextPage: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setPage(nextPage);
    setTimeout(() => (isAnimatingRef.current = false), ANIMATION_DURATION);
  };

  return (
    <section className="px-6 py-24 bg-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-16 items-start">

          {/* LEFT */}
          <div className="md:w-1/3 flex flex-col gap-6 mt-12">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              <span className="block whitespace-nowrap">Upcoming events</span>
              <span className="block">and challenges</span>
            </h2>

            {/* CENTERED ILLUSTRATION */}
            <div className="flex justify-center">
              <img
                src={eventsSwipeImg}
                alt="Upcoming events illustration"
                className="w-44 opacity-90  md:block"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative w-full md:w-[1020px] mt-8">
            <div className="overflow-hidden">
              <div
                className="flex gap-4 pl-4 md:pl-[68px] transition-transform duration-500 ease-in-out"
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
                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
              >
                <AiOutlineLeft />
              </button>
            )}

            {page < maxPage && (
              <button
                onClick={() => goToPage(page + 1)}
                className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
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
    <div className="relative min-w-[300px] max-w-[300px] h-[380px] bg-white rounded-xl shadow border border-gray-100 flex flex-col">
      <div className="relative h-32 overflow-hidden rounded-t-xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-white/90 text-gray-800 text-[11px] px-3 py-1 rounded-full">
          {badge}
        </span>
      </div>

      <div className="px-3 pt-2 pb-1 flex flex-col gap-1.5">
        <h3 className="font-semibold text-sm leading-tight">{title}</h3>
        <p className="text-[11px] text-gray-500">{org}</p>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10.5px] border px-2 py-[1px] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-[11px] text-gray-500 mt-0.5">
          <span>{date}</span>
          <span>{enrolled}</span>
        </div>
      </div>

      <div className="mt-auto px-3 py-2 border-t border-gray-200 flex justify-between items-center">
        <span className="text-purple-600 text-xs">{action}</span>
        <span className="text-blue-600 text-xs font-medium">View details</span>
      </div>
    </div>
  );
};
