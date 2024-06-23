import {
  DefaultError,
  infiniteQueryOptions,
  useMutation,
} from "@tanstack/react-query";

import { PaginatedResult } from "@/utils/types";
import { PointType } from "../point-types";
import { apiClient } from "@/services/axios";
import { queryClient } from "@/services/react-query";
import { getDefaultPageParams } from "@/services/react-query/utils";

export type SuccessAnswer = {
  success: true;
};

export type PointData = {
  id: number;
  type: PointType;
  name: string;
  location: [number, number];
  computed_rating: string | null;
  your_rating?: number | null;
  your_vote?: boolean | null;
};

export const getPoints = async (filter?: Record<string, any>) => {
  const res = await apiClient.get<PaginatedResult<PointData>>("/points/", {
    params: {
      ...filter,
      expand: ["type"].join(","),
    },
  });

  return res.data;
};

export const getPointsListQueryOptions = (filter?: Record<string, any>) =>
  infiniteQueryOptions({
    queryKey: ["points", filter],
    queryFn: ({ pageParam }) => getPoints({ ...filter, page: pageParam }),
    ...getDefaultPageParams(1),
  });

export type VotePointPayload = {
  positive: boolean;
};

export const votePoint = async (pointId: number, payload: VotePointPayload) => {
  await apiClient.post(`/points/${pointId}/vote/`, payload);
};

export const useVotePointMutation = () =>
  useMutation<
    void,
    DefaultError,
    {
      pointId: number;
      payload: VotePointPayload;
    }
  >({
    mutationFn: ({ pointId, payload }) => votePoint(pointId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["points"] }),
  });

export type RatePointPayload = {
  rating: number;
};

export const ratePoint = async (pointId: number, payload: RatePointPayload) => {
  await apiClient.post(`/points/${pointId}/rate/`, payload);
};

export const useRatePointMutation = () =>
  useMutation<
    void,
    DefaultError,
    {
      pointId: number;
      payload: RatePointPayload;
    }
  >({
    mutationFn: ({ pointId, payload }) => ratePoint(pointId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["points"] }),
  });

export type CreatePointPayload = {
  name: string;
  type: number;
  location: [number, number];
};

export const createPoint = async (payload: CreatePointPayload) => {
  await apiClient.post("/points/", payload);
};

export const useCreatePointMutation = () =>
  useMutation<void, DefaultError, CreatePointPayload>({
    mutationFn: (payload) => createPoint(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["points"] }),
  });
