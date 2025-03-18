import { MouseEvent } from "react";

export const callWithoutPropogation = (
  e: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>,
  callback: () => void
) => {
  e.stopPropagation();
  return callback();
};
