"use client"

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

interface ConfettiProps {
  showConfetti: boolean | undefined;
}

export default function Confetti({ showConfetti }: ConfettiProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {

      await loadConfettiPreset(engine);

    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
    "preset": "confetti",
    "emitters": [
        {
            life: {
              duration: 3,
              count: 1,
            },
            position: {
              x: 0,
              y: 30,
            },
            particles: {
              move: {
                direction: "top-right",
              },
            },
          },
          {
            life: {
              duration: 3,
              count: 1,
            },
            position: {
              x: 100,
              y: 30,
            },
            particles: {
              move: {
                direction: "top-left",
              },
            },
          },
    ]
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};