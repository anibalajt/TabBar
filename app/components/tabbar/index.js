import React, { Component } from "react";
import {
  SafeAreaView, StyleSheet, Dimensions, View, Animated, Platform, Text
} from "react-native";
import * as shape from "d3-shape";
import Svg, {
  Path
} from 'react-native-svg';

import StaticTabbar from "./StaticTabbar";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const width = Dimensions.get("window").width;
const height = 64;
const tabs = [
  {
    name: "A",
    routerName: "HomeScreen"
  },
  {
    name: "B",
    routerName: "SearchScreen"
  },
  {
    name: "C",
    active: true,
    routerName: "FavoritesScreen"
  },
  {
    name: "D",
    routerName: "ProfileScreen"
  },
  {
    name: "E",
    routerName: "ProfileScreen2"
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = "#4267b2";

const getPath = () => {
  const w = width;
  const left = shape.line().x(d => d.x).y(d => d.y)([
    { x: 0, y: 0 },
    { x: width, y: 0 },
  ]);
  const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([

    // left
    { x: (w - tabWidth / 2) - 50, y: 0 },
    { x: w - tabWidth / 2, y: 0 },
    // curve
    { x: (w - tabWidth / 2) + (Platform.OS === 'ios' ? 0 : 6), y: 10 },
    { x: (w) - tabWidth / 2 + 17, y: height - 20 },

    { x: (w + tabWidth / 2) - 17, y: height - 20 },
    { x: (w + tabWidth / 2) - (Platform.OS === 'ios' ? 0 : 6), y: 10 },
    // right
    { x: w + tabWidth / 2, y: 0 },
    { x: (w + tabWidth / 2) + 50, y: 0 },
  ]);
  const right = shape.line().x(d => d.x).y(d => d.y)([
    { x: w + tabWidth, y: 0 },
    { x: w * 2, y: 0 },
    { x: w * 2, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};

class Tabbar extends React.Component {
  value = new Animated.Value(0);
  state = {
    d: getPath()
  };

  render() {
    const {
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation
    } = this.props;
    // const { routes, index: activeRouteIndex } = navigation.state;

    const { value, state: { d } } = this;

    const translateX = value.interpolate({
      inputRange: [0, width / 2],
      outputRange: [-(width / 2), 0],
    });

    return (
      <View>
        <View {...{ height, width }} >
          <AnimatedSvg width={(width * 2)} {...{ height }}
            style={{ transform: [{ translateX }] }}>
            <Path fill={backgroundColor} width={(width * 2)} {...{ d }} />
          </AnimatedSvg>
          <View style={StyleSheet.absoluteFill}>
            <StaticTabbar  {...{ tabs, value, onTabPress }} />
          </View>
        </View>
        <SafeAreaView style={styles.container} />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});

export default (Tabbar);