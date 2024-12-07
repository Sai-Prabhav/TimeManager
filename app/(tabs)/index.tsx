import { View, SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { DaySelector } from "@/components/DaySelector";
import { useState } from "react";
import { getData } from '../../util/storage';
export default function HomeScreen() {
    const [SelectedDate, setSelectedDate] = useState(5);

    return (
        <SafeAreaView style={styles.SafeArea}>
            <Text style={styles.Header}>Home</Text>

            <DaySelector
                SelectedDate={SelectedDate}
                setSelectedDate={setSelectedDate}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeArea: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "#222222",
    },
    Header: {
        color: "white",
        fontWeight: "bold",
        fontSize: 32,
        paddingLeft: 20,
        paddingTop: 10,
    },
});
