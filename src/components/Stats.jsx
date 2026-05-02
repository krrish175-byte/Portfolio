import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Counter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      let totalDuration = 2000;
      let increment = end / (totalDuration / 16);
      let timer = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center px-8">
      <div className="text-4xl md:text-5xl font-bold text-highlight mb-2">
        {count}{value.includes("+") ? "+" : ""}
      </div>
      <div className="text-sm text-text-secondary uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { value: "60+", label: "PRs Merged" },
    { value: "15+", label: "Orgs" },
    { value: "2", label: "Mentorships" },
    { value: "5+", label: "Languages" },
  ];

  return (
    <section className="py-12 border-y border-border bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around items-center divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className="py-8 md:py-0 w-full md:w-1/4">
              <Counter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
