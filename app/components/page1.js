import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";


class Page1 extends Component {
    state = {

    };

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('SearchScreen', { transition: 'bottomTransition' });
                    }}>

                        <Text style={{ fontSize: 28 }}>Page1</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Page1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});