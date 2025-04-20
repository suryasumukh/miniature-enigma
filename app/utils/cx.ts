import clsx from "clsx";
import { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...classNames: ClassArray) {
  return twMerge(clsx(classNames));
}
