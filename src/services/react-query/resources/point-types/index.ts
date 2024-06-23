import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { IconName } from "@fortawesome/fontawesome-svg-core";

import { PaginatedResult } from "@/utils/types";
import { apiClient } from "@/services/axios";
import { getDefaultPageParams } from "@/services/react-query/utils";

export type PointType = {
  id: number;
  name: string;
  icon: IconName;
  color: string;
};

export const getPointTypes = async (filter?: Record<string, any>) => {
  const res = await apiClient.get<PaginatedResult<PointType>>("/point-types/", {
    params: filter,
  });

  return res.data;
};

export const getPointTypesListQueryOptions = (filter?: Record<string, any>) =>
  infiniteQueryOptions({
    queryKey: ["point-types", filter],
    queryFn: ({ pageParam }) => getPointTypes({ ...filter, page: pageParam }),
    ...getDefaultPageParams(1),
  });

export const getPointType = async (pointTypeId: number) => {
  const res = await apiClient.get(`/point-types/${pointTypeId}/`);

  return res.data;
};

export const getPointTypeQueryOptions = (pointTypeId: number) =>
  queryOptions({
    queryKey: ["point-types", pointTypeId],
    queryFn: () => getPointType(pointTypeId),
  });
