import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { ExternalLink, Filter, PlayCircle } from "lucide-react";

type WebinarType = "upcoming" | "past";

interface Webinar {
  id: string;
  title: string;
  speakers: string[];
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: string;
  description: string;
  topic: string;
  type: WebinarType;
  registration_link?: string;
  recording_link?: string;
  thumbnail: string;
  attendees?: number;
  rating?: number;
  featured?: boolean;
}

const TOPICS = [
  "All",
  "AI & Diagnostics",
  "Telemedicine",
  "Digital Health",
  "Research & Development",
];

function formatWebinarDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function Webinars(): JSX.Element {
  const [activeTab, setActiveTab] = useState<WebinarType>("upcoming");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/data/webinars.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load webinars.json (${res.status})`);
        const data = (await res.json()) as Webinar[];
        if (!cancelled) setWebinars(Array.isArray(data) ? data : []);
      } catch (e: unknown) {
        if (!cancelled) {
          console.error("Webinars load error:", e);
          setError("Could not load webinars data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredWebinars = useMemo(() => {
    return webinars
      .filter((w) => w.type === activeTab)
      .filter((w) => selectedTopic === "All" || w.topic === selectedTopic)
      .sort((a, b) => {
        const aTs = new Date(`${a.date}T${a.time || "00:00"}:00`).getTime();
        const bTs = new Date(`${b.date}T${b.time || "00:00"}:00`).getTime();
        return activeTab === "upcoming" ? aTs - bTs : bTs - aTs;
      });
  }, [activeTab, selectedTopic, webinars]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950">
      <div className="relative container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex justify-center items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm">
            <VideoCameraIcon className="w-5 h-5 mr-2" />
            <span>Educational Webinars</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
            Medical Webinars
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Curated sessions for clinicians, students, and builders in health-tech.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-4 md:p-5 shadow-xl shadow-black/5 backdrop-blur-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                  activeTab === "past"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Past
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center text-slate-600 dark:text-slate-300">
                <Filter className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Topic</span>
              </div>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full md:w-72 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error ? (
          <div className="text-center py-10 text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : loading ? (
          <div className="text-center py-10 text-slate-600 dark:text-slate-300">
            Loading webinars…
          </div>
        ) : filteredWebinars.length === 0 ? (
          <div className="text-center py-12 text-slate-600 dark:text-slate-300">
            No {activeTab} webinars found for this topic.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group bg-white/90 dark:bg-slate-900/70 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-black/5 overflow-hidden backdrop-blur-sm"
              >
                <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={webinar.thumbnail}
                    alt={webinar.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  {webinar.featured ? (
                    <div className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-blue-600 text-white shadow-lg">
                      Featured
                    </div>
                  ) : null}
                  <div className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                    {webinar.topic}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {webinar.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-200 mb-5">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <span>{formatWebinarDate(webinar.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <span>
                        {webinar.time} • {webinar.duration}
                      </span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <UserGroupIcon className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                      <span>
                        {webinar.speakers.join(", ")}
                        {typeof webinar.attendees === "number"
                          ? ` • ${webinar.attendees} attendees`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {webinar.type === "upcoming" ? (
                      <a
                        href={webinar.registration_link || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold w-full transition-colors ${
                          webinar.registration_link
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                        }`}
                        aria-disabled={!webinar.registration_link}
                        onClick={(e) => {
                          if (!webinar.registration_link) e.preventDefault();
                        }}
                      >
                        Register
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    ) : (
                      <a
                        href={webinar.recording_link || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold w-full transition-colors ${
                          webinar.recording_link
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                        }`}
                        aria-disabled={!webinar.recording_link}
                        onClick={(e) => {
                          if (!webinar.recording_link) e.preventDefault();
                        }}
                      >
                        Watch
                        <PlayCircle className="w-4 h-4 ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

