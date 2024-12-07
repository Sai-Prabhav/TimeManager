import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getData, DataType } from "@/util/storage";

const TaskEditor = ({ selectedDate }: { selectedDate: number }) => {
    const [data, setData] = useState<DataType[] | null>(null);

    const [height, setHeight] = useState(1200);
    console.log(data);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(
                new Date(Date.now() - (selectedDate - 5) * 864e5)
            );
            setData(data);
        };
        fetchData();
    }, []);
    if (data) {
        return (
            <ScrollView>
                <View style={[styles.Container, { height: height }]}>
                    <View style={[styles.TimeLabels, { height: height }]}>
                        {[...Array(24).keys()].map((i) => {
                            return (
                                <View
                                    style={[
                                        styles.TimeLabel,
                                        { height: height / 24 },
                                    ]}
                                >
                                    <Text>
                                        {(i - (i % 10)) / 10}
                                        {i % 10}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={[styles.TaskSheet, { height: height }]}>
                        {[...Array(24).keys()].map((i) => {
                            return (
                                <View
                                    style={[
                                        styles.HourLines,
                                        { height: height / 24 },
                                    ]}
                                ></View>
                            );
                        })}
                        {data.map((item: DataType) => {
                            return (
                                <View
                                    style={[
                                        styles.Task,
                                        { height: height / 24 },
                                    ]}
                                ></View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            /** <ScrollView>
                {data.map((item: DataType) => {
                    // You can also return JSX elements here
                    return (
                        <View key={JSON.stringify(item)}>
                            <Text style={{ color: "white" }}>
                                {new Date().toISOString()}
                                ok man
                            </Text>
                            <Text style={{ color: "white" }}>
                                {new Date(item.EndTime).toISOString()}{" "}
                            </Text>
                            <Text style={{ color: "white" }}>
                                {item.Category}
                            </Text>
                            <Text style={{ color: "white" }}>
                                {item.SubCategory}
                            </Text>
                            <Text style={{ color: "white" }}>
                                {item.Description}
                            </Text>
                            <Text style={{ color: "white" }}>{item.Score}</Text>
                            <Text style={{ color: "white" }}>{item.Name}</Text>
                        </View>
                    );
                })}
            </ScrollView> */
        );
    } else {
        return (
            <View>
                <Text style={styles.ErrorText}>No data found</Text>
            </View>
        );
    }
};

export default TaskEditor;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: "white",

        flex: 1,
        flexDirection: "row",
        width: "100%",
    },
    TimeLabels: { backgroundColor: "red", width: "20%" },
    TaskSheet: { backgroundColor: "green", width: "80%" },
    Task: {
        backgroundColor: "blue",
    },
    TimeLabel: {
        backgroundColor: "#bbb",
        borderColor: "#666",
        borderWidth: 1,
        justifyContent: "center",
        paddingLeft: 10,
        // paddingBottom: 10,
    },
    ErrorText: {
        fontSize: 40,
        // color: "red",
    },
    HourLines: { backgroundColor: "#bbb", borderColor: "#666", borderWidth: 1 },
});
