import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import {
  useInfiniteQuery,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import {
  View,
  Text,
  Button,
  Dialog,
  Card,
  TouchableOpacity,
  Colors,
  PanningProvider,
} from "react-native-ui-lib";
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  Region,
} from "react-native-maps";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faCircleUp,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import {
  getPointsListQueryOptions,
  useCreatePointMutation,
  useRatePointMutation,
  useVotePointMutation,
} from "@/services/react-query/resources/points";
import PointForm from "@/components/forms/PointForm";
import CustomRating from "@/components/common/CustomRating";
import { useStore, COMPUTED_IS_SIGNED_IN } from "@/services/store";
import { getUserSettingsQueryOptions } from "@/services/react-query/resources/user-settings";

type VotingProps = {
  value?: boolean | null;
  onChange?: (value: boolean) => void;
};

const Voting = (props: VotingProps) => {
  const { value, onChange } = props;

  return (
    <View row gap-s2>
      <TouchableOpacity onPress={() => onChange?.(true)}>
        <FontAwesomeIcon
          icon={faCircleUp}
          color={value === true ? Colors.$iconPrimary : Colors.$iconNeutral}
          size={24}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onChange?.(false)}>
        <FontAwesomeIcon
          icon={faCircleDown}
          color={value === false ? Colors.$iconDanger : Colors.$iconNeutral}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

type PointCreateValues = {
  name: string;
  type: number;
};

const IndexPage = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [permissionStatus, requestPermission] =
    Location.useForegroundPermissions();

  const isSignedIn = useStore(COMPUTED_IS_SIGNED_IN);

  const [hasShownPoint, setHasShownPoint] = useState(false);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const debouncedRegion = useDebounce(region, 300);
  const [isCreate, setIsCreate] = useState(false);
  const pointCreationForm = useForm<PointCreateValues>();
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);

  const userSettingsQuery = useQuery(getUserSettingsQueryOptions());

  const pointsQuery = useInfiniteQuery({
    ...getPointsListQueryOptions({
      lat: debouncedRegion?.latitude,
      long: debouncedRegion?.longitude,
      computed_rating__gte: userSettingsQuery.data?.minimum_rating,
    }),
    enabled: !!debouncedRegion,
    placeholderData: keepPreviousData,
  });
  const allPoints = pointsQuery.data?.pages.flatMap((page) => page.results);
  const selectedPoint = allPoints?.find(
    (point) => point.id === selectedPointId
  );

  const voteMutation = useVotePointMutation();

  const rateMutation = useRatePointMutation();

  const createMutation = useCreatePointMutation();

  useEffect(() => {
    if (permissionStatus?.granted) {
      handleGetInitialRegion();
      return;
    }

    requestPermission();
  }, [permissionStatus]);

  useEffect(() => {
    if (hasShownPoint) return;

    if (!pointsQuery.data) return;

    setHasShownPoint(true);

    if (!userSettingsQuery.data?.find_closest_point) return;

    const marker = allPoints?.find(
      (point) => point.type.id === userSettingsQuery.data.find_closest_point
    );

    if (!marker) return;

    setSelectedPointId(marker.id);
  }, [pointsQuery.isLoading]);

  const handleGetInitialRegion = async () => {
    const location = await Location.getCurrentPositionAsync();

    const initialRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.1,
    };

    setInitialRegion(initialRegion);
    setRegion(initialRegion);
  };

  return (
    <View flex>
      {isFocused ? (
        <StatusBar
          style="light"
          backgroundColor={Colors.rgba(Colors.black, 0.5)}
        />
      ) : null}

      <Stack.Screen options={{ headerShown: false }} />

      <View className="relative" flex>
        {initialRegion ? (
          <MapView
            className="flex-1"
            mapPadding={{
              top: safeAreaInsets.top,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
            showsUserLocation={permissionStatus?.granted}
            minZoomLevel={13}
            maxZoomLevel={20}
            onRegionChangeComplete={(region) => setRegion(region)}
          >
            {region ? (
              <Circle
                center={region}
                radius={2000}
                strokeColor={Colors.blue40}
                fillColor={Colors.rgba(Colors.blue60, 0.1)}
              />
            ) : null}

            {allPoints?.length
              ? allPoints.map((point) => (
                  <Marker
                    key={point.id}
                    coordinate={{
                      longitude: point.location[0],
                      latitude: point.location[1],
                    }}
                    anchor={{ x: 0.5, y: 0.5 }}
                    onPress={() => setSelectedPointId(point.id)}
                  >
                    <View centerH>
                      <FontAwesomeIcon
                        icon={["fas", point.type.icon]}
                        color={point.type.color}
                        size={32}
                      />

                      <View centerH>
                        <Text text80BO color={Colors.black}>
                          {point.name}
                        </Text>
                        <Text text80BO color={point.type.color}>
                          {point.type.name}
                        </Text>
                      </View>
                    </View>
                  </Marker>
                ))
              : null}
          </MapView>
        ) : null}

        <View
          style={{ paddingTop: safeAreaInsets.top }}
          className="absolute w-full h-full opacity-50"
          pointerEvents="none"
          center
        >
          <FontAwesomeIcon icon={faPlus} color={Colors.red40} size={32} />
        </View>

        {isSignedIn ? (
          <View padding-s4 className="absolute bottom-0 right-0">
            <Button
              round
              iconSource={() => (
                <View padding-s2>
                  <FontAwesomeIcon
                    icon={faPlus}
                    size={32}
                    color={Colors.$textDefaultLight}
                  />
                </View>
              )}
              onPress={() => setIsCreate(true)}
            />
          </View>
        ) : null}

        <Dialog
          containerStyle={{ marginBottom: 90 }}
          visible={!!isCreate}
          overlayBackgroundColor={Colors.rgba(Colors.black, 0.25)}
          onDialogDismissed={() => setIsCreate(false)}
        >
          <Card padding-s4 gap-s2>
            <Text text60BO center>
              Crează punct
            </Text>

            <PointForm form={pointCreationForm} />

            <Button
              label="Creează"
              onPress={pointCreationForm.handleSubmit(
                (data) =>
                  region &&
                  createMutation.mutate(
                    {
                      ...data,
                      location: [region.longitude, region.latitude],
                    },
                    {
                      onSuccess: () => {
                        pointCreationForm.reset();
                        setIsCreate(false);
                      },
                    }
                  )
              )}
            />
          </Card>
        </Dialog>

        <Dialog
          containerStyle={{ marginBottom: 90 }}
          visible={!!selectedPoint}
          top={false}
          bottom={true}
          overlayBackgroundColor={Colors.rgba(Colors.black, 0.25)}
          panDirection={PanningProvider.Directions.DOWN}
          onDialogDismissed={() => setSelectedPointId(null)}
        >
          {selectedPoint ? (
            <Card>
              <View padding-s4 gap-s2>
                <View row gap-s4 centerV>
                  <Voting
                    value={selectedPoint.your_vote}
                    onChange={(positive) =>
                      voteMutation.mutate({
                        pointId: selectedPoint.id,
                        payload: { positive },
                      })
                    }
                  />

                  <View flex>
                    <Text text70BO numberOfLines={1}>
                      {selectedPoint.name}
                    </Text>

                    <Text text80BO color={selectedPoint.type.color}>
                      {selectedPoint.type.name}
                    </Text>
                  </View>
                </View>

                <CustomRating
                  rating={selectedPoint.computed_rating ?? 0}
                  defaultValue={selectedPoint.your_rating}
                  onFinishRating={(rating: number) =>
                    rateMutation.mutate({
                      pointId: selectedPoint.id,
                      payload: { rating },
                    })
                  }
                />
              </View>
            </Card>
          ) : null}
        </Dialog>
      </View>
    </View>
  );
};

export default IndexPage;
