import { View, SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { DaySelector } from "@/components/DaySelector";
import { useState } from "react";
import { setData, generateSchedule } from "../../util/storage";
import TaskEditor from "@/components/TaskEditor";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
    const [selectedDate, setSelectedDate] = useState(5);
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

    for (let i = 1; i <= 11; i++) {
        const now = new Date(Date.now() - (i - 5) * 864e5);

        const schedule = generateSchedule(now, i % 4);
        setData(
            new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            schedule
        );
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.SafeArea}>
                <Text style={styles.Header}>Home</Text>

                <DaySelector
                    SelectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />

                <TaskEditor selectedDate={selectedDate} />
            </SafeAreaView>
        </GestureHandlerRootView>
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
