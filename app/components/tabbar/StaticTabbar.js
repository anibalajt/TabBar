import * as React from "react";
import {
    View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Text
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const { width } = Dimensions.get("window");



class StaticTabbar extends React.Component {
    values = [];
    state = { indexTab: 2 }
    constructor(props) {
        super(props);
        const { tabs } = this.props;
        this.values = tabs.map((tab, index) => new Animated.Value(tabs[index].active ? 1 : 0));

    }
    onPress = (index = 0, name, route) => {
        if (name === "") return false
        this.onAnimation(index, route)
    }

    onAnimation = (index = 0, route) => {
        const { value, tabs } = this.props;
        const tabWidth = width / tabs.length;
        Animated.sequence([
            Animated.parallel(
                this.values.map(v => Animated.timing(v, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                })),
            ),
            Animated.parallel([
                Animated.spring(value, {
                    toValue: tabWidth * (index - 2),
                    useNativeDriver: true,
                }),
                Animated.spring(this.values[index], {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]),

        ]).start();
        const { onTabPress } = this.props;
        onTabPress({ route: { key: route, routeName: route, transition: 'bottomTransition' }, });
    }

    render() {
        const { onPress, state: { indexTab } } = this;
        const { tabs, value } = this.props;
        // alert(JSON.stringify(navigation))
        return (
            <View style={styles.container}>
                {
                    tabs.map((tab, key) => {
                        const tabWidth = width / tabs.length;
                        const cursor = tabWidth * (key - 2);
                        const opacity = value.interpolate({
                            inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
                            outputRange: [1, 0, 1],
                            extrapolate: "clamp",
                        });
                        const translateY = this.values[key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [64, 0],
                            extrapolate: "clamp",
                        });
                        const opacity1 = this.values[key].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            extrapolate: "clamp",
                        });
                        // alert(JSON.stringify(tab))
                        return (
                            <React.Fragment {...{ key }}>
                                <TouchableWithoutFeedback onPress={() => onPress(key, tab.name, tab.routerName)}>
                                    <Animated.View style={[styles.tab, { opacity }]}>
                                        <Text >{tab.name}</Text>
                                    </Animated.View>
                                </TouchableWithoutFeedback>
                                <Animated.View
                                    style={{
                                        position: "absolute",
                                        top: -24,
                                        left: tabWidth * key,
                                        width: tabWidth,
                                        height: 64,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: opacity1,
                                        transform: [{ translateY }],
                                    }}
                                >
                                    <View style={styles.activeIcon}>
                                        <Text style={{ color: "white" }}>{tab.name}</Text>
                                    </View>
                                </Animated.View>
                            </React.Fragment>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },

    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 64,

    },
    activeIcon: {
        backgroundColor: "#4267b2",
        width: 55,
        height: 55,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default (StaticTabbar)