import { type ImageSourcePropType } from "react-native";
import { type Restaurant } from "./sampleRestaurant";

export const DEFAULT_RESTAURANT_IMAGE: ImageSourcePropType = require("../../assets/restaurants/raising-canes-sample.jpg");

export const RESTAURANT_IMAGE_SOURCES: Record<string, ImageSourcePropType> = {
  "raising-canes-sample": require("../../assets/restaurants/raising-canes-sample.jpg"),
  "walk-ons": require("../../assets/restaurants/walk-ons.jpg"),
  "tsunami": require("../../assets/restaurants/tsunami.jpg"),
  "parrains": require("../../assets/restaurants/parrains.jpg"),
  "mestizo": require("../../assets/restaurants/mestizo.jpg"),
  "beausoleil": require("../../assets/restaurants/beausoleil.jpg"),
  "the-chimes": require("../../assets/restaurants/the-chimes.jpg"),
  "louies-cafe": require("../../assets/restaurants/louies-cafe.jpg"),
  "overpass-merchant": require("../../assets/restaurants/overpass-merchant.jpg"),
  "elsies-plate-pie": require("../../assets/restaurants/elsies-plate-pie.jpg"),
  "curbside": require("../../assets/restaurants/curbside.jpg"),
  "city-pork": require("../../assets/restaurants/city-pork.webp"),
  "albasha": require("../../assets/restaurants/albasha.jpg"),
  "cava": require("../../assets/restaurants/cava.jpg"),
  "superior-grill": require("../../assets/restaurants/superior-grill.jpg"),
  "izzos": require("../../assets/restaurants/izzos.webp"),
  "govt-taco": require("../../assets/restaurants/govt-taco.webp"),
  "soji": require("../../assets/restaurants/soji.jpg"),
  "ichiban": require("../../assets/restaurants/ichiban.jpg"),
  "dragos": require("../../assets/restaurants/dragos.webp"),
  "cocha": require("../../assets/restaurants/cocha.jpg"),
  "jubans": require("../../assets/restaurants/jubans.jpg"),
  "ruffinos": require("../../assets/restaurants/ruffinos.jpg"),
  "pizza-byronz": require("../../assets/restaurants/pizza-byronz.webp"),
  "rotolos": require("../../assets/restaurants/rotolos.jpg"),
  "monjunis": require("../../assets/restaurants/monjunis.jpg"),
  "ginos": require("../../assets/restaurants/ginos.jpg"),
  "lit-pizza": require("../../assets/restaurants/lit-pizza.jpg"),
  "another-broken-egg": require("../../assets/restaurants/another-broken-egg.jpg"),
  "simple-joes": require("../../assets/restaurants/simple-joes.jpg"),
  "coffee-call": require("../../assets/restaurants/coffee-call.jpg"),
  "counterspace": require("../../assets/restaurants/counterspace.jpg"),
  "insomnia-cookies": require("../../assets/restaurants/insomnia-cookies.jpg"),
  "five-guys": require("../../assets/restaurants/five-guys.jpg"),
  "smashburger": require("../../assets/restaurants/smashburger.jpg"),
  "whataburger": require("../../assets/restaurants/whataburger.jpg"),
  "chipotle-highland": require("../../assets/restaurants/chipotle-highland.jpg"),
  "moes": require("../../assets/restaurants/moes.jpg"),
  "sushimasa": require("../../assets/restaurants/sushimasa.webp"),
  "rockn-sake": require("../../assets/restaurants/rockn-sake.jpg"),
  "mod-pizza": require("../../assets/restaurants/mod-pizza.jpg"),
  "reginellis": require("../../assets/restaurants/reginellis.jpg"),
  "zees-salads": require("../../assets/restaurants/zees-salads.jpg"),
  "fresh-junkie": require("../../assets/restaurants/fresh-junkie.jpg"),
  "sweetgreen-br": require("../../assets/restaurants/sweetgreen-br.jpg"),
  "chickfila-highland": require("../../assets/restaurants/chickfila-highland.jpg"),
  "canes-lee": require("../../assets/restaurants/canes-lee.jpg"),
  "pluckers": require("../../assets/restaurants/pluckers.jpg"),
  "mid-city-beer-garden": require("../../assets/restaurants/mid-city-beer-garden.jpg"),
  "magpie-cafe": require("../../assets/restaurants/magpie-cafe.jpg"),
  "fat-cow": require("../../assets/restaurants/fat-cow.webp"),
  "calientemex": require("../../assets/restaurants/calientemex.jpg"),
  "salad-station": require("../../assets/restaurants/salad-station.webp"),
};

export function getRestaurantImageSource(restaurant?: Restaurant | null): ImageSourcePropType {
  if (!restaurant) return DEFAULT_RESTAURANT_IMAGE;
  const localImage = RESTAURANT_IMAGE_SOURCES[restaurant.id];
  if (localImage) return localImage;
  if (restaurant.imageUrl) return { uri: restaurant.imageUrl };
  return DEFAULT_RESTAURANT_IMAGE;
}
