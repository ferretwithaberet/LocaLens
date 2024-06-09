import * as Linking from "expo-linking";
import { InfiniteQueryPageParamsOptions } from "@tanstack/react-query";

import { PaginatedResult } from "@/utils/types";

const extractPageNumber = (url: string | null) => {
  if (!url) return null;

  const urlObject = Linking.parse(url);
  if (!urlObject.queryParams) return null;

  return urlObject.queryParams.page ?? null;
};

export const getDefaultPageParams = <
  TQueryFnData extends PaginatedResult<unknown>,
  TPageParam = unknown
>(
  initialPageParam: TPageParam
): InfiniteQueryPageParamsOptions<TQueryFnData> => ({
  initialPageParam,
  getNextPageParam: (lastPage) => extractPageNumber(lastPage.next),
  getPreviousPageParam: (firstPage) => extractPageNumber(firstPage.next),
});
