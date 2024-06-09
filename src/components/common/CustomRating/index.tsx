import { View, Text, Colors } from "react-native-ui-lib";
import { AirbnbRating, TapRatingProps } from "react-native-ratings";

type CustomRatingProps = Omit<TapRatingProps, "reviews" | "defaultRating"> & {
  rating?: number | string | null;
  defaultValue?: number | null;
  unSelectedColor?: string;
};

const parseRating = (rating: CustomRatingProps["rating"]) => {
  if (!rating) return rating;

  if (typeof rating === "number") return rating;

  return parseFloat(rating);
};

const REVIEWS = new Proxy([], {
  get: () => "Nota ta",
});
const CustomRating = (props: CustomRatingProps) => {
  const { rating, defaultValue, ...restProps } = props;

  return (
    <View row>
      {rating != null ? (
        <View center marginH-s4>
          <Text text80BO>Notă</Text>

          <Text text30BO $textPrimary>
            {parseRating(rating)}
          </Text>

          <Text>din 5</Text>
        </View>
      ) : null}

      <View flex>
        <AirbnbRating
          defaultRating={defaultValue != null ? defaultValue : 0}
          reviews={REVIEWS}
          reviewColor={Colors.$textDefault}
          selectedColor={Colors.yellow40}
          unSelectedColor={Colors.grey30}
          {...restProps}
        />
      </View>
    </View>
  );
};

export default CustomRating;
