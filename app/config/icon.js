import React from "react";
import { Text, } from "react-native";

const nameMap = {
  A: "md-home",
  B: "logo-rss",
  C: "md-alarm",
  D: "md-basket",
  E: "md-build"
};

const Icon = ({ name, color, style, ...props }) => {
  return (
    <Text

      color={color}
      size={28}
      style={style}
    >{name}</Text>
  );
};

export default Icon;