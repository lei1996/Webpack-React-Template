import React, { useRef } from "react";
import clamp from "lodash-es";
import { useDrag } from "react-use-gesture";
import { useSprings, animated } from "react-spring";
import { css } from "linaria";

css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none;
    font-family: "Raleway", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
    cursor: url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png")
        39 39,
      auto;
  }
`;

const draggableMain = css`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
  font-family: "Raleway", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
`;

const content = css`
  position: relative;
  width: 320px;
  height: 240px;
`;

const child = css`
  position: absolute;
  width: 320px;
  height: 90px;
  overflow: visible;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  border-radius: 5px;
  color: white;
  line-height: 90px;
  padding-left: 32px;
  font-size: 14.5px;
  background: lightblue;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:nth-child(1) {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }
  &:nth-child(2) {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  &:nth-child(3) {
    background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
  }
  &:nth-child(4) {
    background: linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%);
  }
`;

function swap(array, moveIndex, toIndex) {
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => {
  return (index) => {
    console.log('fn function,index', index);
    return down && index === originalIndex
      ? {
          y: curIndex * 100 + y,
          scale: 1.1,
          zIndex: "1",
          shadow: 15,
          immediate: (n) => n === "y" || n === "zIndex",
        }
      : {
          y: order.indexOf(index) * 100,
          scale: 1,
          zIndex: "0",
          shadow: 1,
          immediate: false,
        };
  };
};

export function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], down, movement: [x, y] }) => {
    console.log("bind");
    console.log(originalIndex);
    console.log(down);
    console.log(x, y);
    const curIndex = order.current.indexOf(originalIndex);
    console.log(curIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1
    );
    console.log(curRow);
    const newOrder = swap(order.current, curIndex, curRow);
    console.log(newOrder);
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder;
  });
  return (
    <div className={content} style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          className={child}
          style={{
            zIndex,
            // boxShadow: shadow.to(
            //   (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            // ),
            y,
            scale,
          }}
          children={items[i]}
        />
      ))}
    </div>
  );
}
