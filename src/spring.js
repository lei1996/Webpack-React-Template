import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import shuffle from "lodash/shuffle";
import { css } from "linaria";
import data from "./data";

const list = css`
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
    helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  width: 65ch !important;
  height: 100%;
`;

const card = css`
  position: absolute;
  will-change: transform, height, opacity;
  width: 100%;
`;

const cell = css`
  position: absolute;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-transform: uppercase;
  font-size: 10px;
  /* line-height: 10px; */
  /* padding: 15px; */
`;

const details = css`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* border-radius: 5px; */
  /* box-shadow: 0px 10px 25px -10px rgba(0, 0, 0, 0.2); */
`;

export default function Spring() {
  const [rows, set] = useState(data);
  useEffect(() => {
    const interval = setInterval(() => set(shuffle), 2000);

    return () => clearInterval(interval);
  }, []);

  let height = 0;
  //   console.log(rows);
  const transitions = useTransition(
    rows.map((data) => ({ ...data, y: (height += data.height) - data.height })),
    (d) => d.name,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    }
  );

  console.log(transitions);

  return (
    <div className={list} style={{ height }}>
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
        <animated.div
          key={key}
          className={card}
          style={{
            zIndex: data.length - index,
            transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
            ...rest,
          }}
        >
          <div className={cell}>
            <div className={details} style={{ backgroundImage: item.css }}>
              {item.description}
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
