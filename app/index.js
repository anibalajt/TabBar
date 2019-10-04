import React, { } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Router from './config/router';

const App = () => {
    return (
        <View style={styles.container}>
            <Router />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end",
    },
});

export default App;
