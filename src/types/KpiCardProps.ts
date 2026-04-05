import type { ReactNode } from "react";

export type KpiCardProps = {
  title: string;
  value: string | number;
  subtitle?: string | number;
  icon?: ReactNode;
};
