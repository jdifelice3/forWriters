import { GroupRole } from "./domain-types";
import { ReactNode } from "react";

export type NavItem = {
  label: string;
  icon: ReactNode;
  path: string;
  roles?: GroupRole[];
};
