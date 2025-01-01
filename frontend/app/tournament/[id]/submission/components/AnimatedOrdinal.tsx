import React from "react";

import NumberFlow from "@number-flow/react";

interface AnimatedOrdinalProps {
  number: number;
  className?: string;
}

const getOrdinalSuffix = (n: number): string => {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

export default function AnimatedOrdinal({
  number,
  className = "",
}: AnimatedOrdinalProps) {
  return (
    <span className={`inline-flex items-center px-1 ${className}`}>
      <NumberFlow
        value={number}
        continuous={false}
        willChange={true}
      />
      <span className="">{getOrdinalSuffix(number)}</span>
    </span>
  );
}
