"use client";

import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <>
      <CountUp
        duration={1}
        end={amount}
        prefix="$"
        decimals={2}
        decimal="."
        className="w-full"
      />
    </>
  );
};

export default AnimatedCounter;
