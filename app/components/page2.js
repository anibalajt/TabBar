import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";


class Page2 extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 28, }}>Page2</Text>
                </View>
            </View>
        );
    }
}

export default Page2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});