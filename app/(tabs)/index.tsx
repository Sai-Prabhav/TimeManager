import { View, SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { DaySelector } from "@/components/DaySelector";
import { useState } from "react";
import { getData, setData } from "../../util/storage";
export default function HomeScreen() {
    const [SelectedDate, setSelectedDate] = useState(5);
    const now = new Date();
    setData(now, [
        {
            StartTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                8,
                0,
                0
            ),
            EndTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                9,
                0,
                0
            ),
            Category: "Morning Routine",
            SubCategory: "Breakfast",
            Description: "Breakfast",
            Score: 10,
            Name: "Breakfast",
        },
        {
            StartTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                9,
                0,
                0
            ),
            EndTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                10,
                0,
                0
            ),
            Category: "Morning Routine",
            SubCategory: "Exercise",
            Description: "Exercise",
            Score: 10,
            Name: "Exercise",
        },
        {
            StartTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                10,
                0,
                0
            ),
            EndTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                12,
                0,
                0
            ),
            Category: "Work",
            SubCategory: "Work",
            Description: "Work",
            Score: 10,
            Name: "Work",
        },
        {
            StartTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                12,
                0,
                0
            ),
            EndTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                13,
                0,
                0
            ),
            Category: "Lunch",
            SubCategory: "Lunch",
            Description: "Lunch",
            Score: 10,
            Name: "Lunch",
        },
        {
            StartTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                13,
                0,
                0
            ),
            EndTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                17,
                0,
                0
            ),
            Category: "Work",
            SubCategory: "Work",
            Description: "Work",
            Score: 10,
            Name: "Work",
        },
        {
            StartTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                17,
                0,
                0
            ),
            EndTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                19,
                0,
                0
            ),
            Category: "Dinner",
            SubCategory: "Dinner",
            Description: "Dinner",
            Score: 10,
            Name: "Dinner",
        },
        {
            StartTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                19,
                0,
                0
            ),
            EndTime: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                21,
                0,
                0
            ),
            Category: "Leisure",
            SubCategory: "Leisure",
            Description: "Leisure",
            Score: 10,
            Name: "Leisure",
        },
    ]);
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
