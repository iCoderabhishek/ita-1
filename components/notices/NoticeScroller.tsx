"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

// Dummy notices data
const dummyNotices = [
  {
    id: 1,
    title: "Admission Open for 2025-2026 Session",
    date: "2025-05-01",
    important: true,
  },
  {
    id: 2,
    title: "End Semester Examination Schedule for 6th Semester",
    date: "2025-04-15",
    important: true,
  },
  {
    id: 3,
    title: "Holiday Notice: College will remain closed on 25th April",
    date: "2025-04-10",
    important: false,
  },
  {
    id: 4,
    title: "Diploma Results for December 2024 Announced",
    date: "2025-03-20",
    important: true,
  },
  {
    id: 5,
    title: "Industry Visit for Electrical Engineering Department",
    date: "2025-03-15",
    important: false,
  },
  {
    id: 6,
    title: "National Level Technical Symposium - TechnoVision 2025",
    date: "2025-03-10",
    important: true,
  },
  {
    id: 7,
    title: "Mid-Semester Examination Schedule",
    date: "2025-03-05",
    important: false,
  },
  {
    id: 8,
    title: "Workshop on IoT Applications in Industry",
    date: "2025-02-28",
    important: false,
  },
];

export default function NoticeScroller({ limit = 0 }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const notices = limit > 0 ? dummyNotices.slice(0, limit) : dummyNotices;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const scrollElement = scrollContainerRef.current;
    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          scrollElement &&
          !paused &&
          scrollElement.scrollTop <
            scrollElement.scrollHeight - scrollElement.clientHeight
        ) {
          scrollElement.scrollTop += 1;
        } else if (scrollElement && !paused) {
          // Reset to top when reached bottom
          scrollElement.scrollTop = 0;
        }
      }, 50); // Adjust speed as needed
    };

    startScroll();

    return () => {
      clearInterval(scrollInterval);
    };
  }, [paused]);

  return (
    <div
      className="relative max-h-[400px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto pr-2 max-h-[400px] scroll-smooth"
        // style={{ scrollBehavior: "smooth" }}
      >
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 p-3 rounded-lg border ${
              notice.important
                ? "border-primary/30 bg-primary/5"
                : "border-gray-200"
            }`}
          >
            <h3
              className={`font-medium mb-2 ${
                notice.important ? "text-primary" : "text-gray-800"
              }`}
            >
              {notice.important && (
                <span className="inline-block bg-primary text-white text-xs px-2 py-0.5 rounded mr-2">
                  Important
                </span>
              )}
              {notice.title}
            </h3>
            <div className="flex items-center text-gray-500 text-sm">
              <CalendarClock className="h-3.5 w-3.5 mr-1" />
              <span>{formatDate(notice.date)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fade gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}
