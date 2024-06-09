import React from "react";

export type ReactNodeOrComponent<P = unknown> = React.ReactNode | React.FC<P>;

export type PaginatedResult<D> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: D[];
};
