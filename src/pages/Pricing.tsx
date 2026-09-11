import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    slug: "plan_a",
    name: "ClinIQ Plan A",
    price: "100",
    billing: "one-time",
    subtitle: "Basic healthcare access",
    capabilities: null,
    perks: [
      "Basic symptom checking",
      "Find nearby hospitals",
      "Access health blog",
      "Email support",
    ],
    highlight: false,
    externalLink: null,
  },
  {
    slug: "plan_b",
    name: "ClinIQ Plan B",
    price: "200",
    billing: "one-time",
    subtitle: "Advanced medical features",
    capabilities: null,
    perks: [
      "Advanced symptom analysis",
      "Priority doctor appointments",
      "Full drug database access",
      "Medical dictionary access",
      "Priority support",
    ],
    highlight: false,
    externalLink: null,
  },
  {
    name: "EduLinkUp Premium",
    price: "299",
    billing: "/ monthly",
    subtitle: "Flexible 30-day access to Premium Courses, DSA Sheets, and Ecosystem Apps",
    capabilities: [
      "Full Video Course Access & Lesson Materials",
      "All DSA Problems with Hints, Editorials & Submissions",
      "CliniQ AI Smart Medical Assistant",
      "Cosmosphere Space & Science Simulator",
    ],
    perks: [
      "Access to all Premium Courses",
      "Full DSA Sheet with editorials",
      "ClinIQ & Ecosystem App Access",
    ],
    highlight: true,
    externalLink: "https://www.edulinkup.dev/premium",
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade at any
            time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlight
                  ? "border-emerald-500 dark:border-emerald-400 bg-white dark:bg-neutral-800 shadow-xl shadow-emerald-500/10 scale-105 z-10"
                  : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                {plan.name}
              </h2>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                {plan.subtitle}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                  ₹{plan.price}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm ml-1">
                  {plan.billing}
                </span>
              </div>

              {plan.capabilities && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                    Included Capabilities
                  </h3>
                  <ul className="space-y-2.5">
                    {plan.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-emerald-500"
                        />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">
                          {cap}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8 flex-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  {plan.capabilities ? "Plan Perks" : "Features"}
                </h3>
                <ul className="space-y-2.5">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.highlight
                            ? "text-emerald-500"
                            : "text-neutral-400 dark:text-neutral-500"
                        }`}
                      />
                      <span className="text-sm text-neutral-600 dark:text-neutral-300">
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.externalLink ? (
                <a
                  href={plan.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-3 rounded-xl font-medium transition-colors inline-block ${
                    plan.highlight
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white"
                  }`}
                >
                  Get Started
                </a>
              ) : (
                <Link
                  to={`/checkout/${plan.slug}`}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    "bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white text-center inline-block"
                  }`}
                >
                  Get Started
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
