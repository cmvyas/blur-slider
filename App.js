import { useRef } from "react";
import {
  StatusBar,
  Image,
  Animated,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("screen");

const data = [
  "https://i.pinimg.com/564x/82/61/d4/8261d4f6401da8f98407e175cde46ad5.jpg",
  "https://i.pinimg.com/474x/b9/c2/11/b9c21177bd238a7757ada7c5ac18feda.jpg",
  "https://i.pinimg.com/564x/13/2a/be/132abe929b7bde5319784511ae7c4545.jpg",
  "https://i.pinimg.com/564x/ee/58/55/ee58559ff668d318068c22871dbd7a8e.jpg",
  "https://i.pinimg.com/564x/a0/7e/eb/a07eeb846f05daa0554bdfd609f3fcb7.jpg",
  "https://i.pinimg.com/564x/8a/45/67/8a456737eb70d9d4c68b23aa40199ec4.jpg",
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />

      <View style={StyleSheet.absoluteFillObject}>
        {data.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              source={{ uri: item }}
              key={`image-${index}`}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={20}
            />
          );
        })}
      </View>

      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        data={data}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{ width, justifyContent: "center", alignItems: "center" }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: "contain",
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
