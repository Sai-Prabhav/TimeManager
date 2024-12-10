import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    // TouchableOpacity,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { getData, DataType } from "@/util/storage";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import EditTask from "./EditTask";

const TaskEditor = ({ selectedDate }: { selectedDate: number }) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [data, setData] = useState<DataType[] | null>(null);
    const snapPoints = useMemo(() => ["70%", "100%"], []);
    const [height, setHeight] = useState(2000);

    const [selectedTask, setSelectedTask] = useState<DataType | null>(null);
    const handleOpen = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.snapToIndex(1);
            console.log("open");
        }
    };
    const handleClose = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
            console.log("open");
        }
    };

    // console.log(data);
    // handleOpen();
    useEffect(() => {
        const fetchData = async () => {
            setData(await getData(new Date(Date.now() - selectedDate * 864e5)));
        };
        fetchData();
    }, [selectedDate]);
    if (data) {
        return (
            <View style={{ backgroundColor: "blue", height: "100%" }}>
                <ScrollView
                    contentOffset={{
                        x: 0,
                        y:
                            data && data.length === 0
                                ? 0
                                : (new Date(data[0].StartTime).getHours() *
                                      height) /
                                      24 +
                                  ((new Date(data[0].StartTime).getMinutes() /
                                      60) *
                                      height) /
                                      24 -
                                  10,
                    }}
                >
                    <View style={[styles.Container, { height: height }]}>
                        <View style={[styles.TimeLabels, { height: height }]}>
                            {[...Array(24).keys()].map((i) => {
                                return (
                                    <View
                                        key={i}
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
                                        key={i}
                                        style={[
                                            styles.HourLines,
                                            { height: height / 24 },
                                        ]}
                                    />
                                );
                            })}
                            {data.map((item: DataType, index: number) => {
                                const start =
                                    index === 0
                                        ? 0
                                        : (new Date(
                                              data[index - 1].EndTime
                                          ).getHours() *
                                              height) /
                                              24 +
                                          ((new Date(
                                              data[index - 1].EndTime
                                          ).getMinutes() /
                                              60) *
                                              height) /
                                              24;
                                const end =
                                    (new Date(item.StartTime).getHours() *
                                        height) /
                                        24 +
                                    ((new Date(item.StartTime).getMinutes() /
                                        60) *
                                        height) /
                                        24;
                                if (start != end) {
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                {
                                                    top: start,
                                                    height: end - start,
                                                    width: "100%",

                                                    position: "absolute",
                                                },
                                            ]}
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelectedTask(null);
                                                    handleOpen();
                                                }}
                                                style={{ height: "100%" }}
                                            >
                                                <Text>Click to add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            })}
                            {/* {console.log([data])==null} */}

                            {data.length == 0 ? (
                                <View
                                    style={[
                                        {
                                            position: "absolute",
                                            width: "100%",

                                            top: 0,
                                            height: height,
                                        },
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log("add");

                                            setSelectedTask(null);
                                            handleOpen();
                                        }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                        }}
                                    >
                                        <Text>Click to add</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View
                                    style={[
                                        {
                                            width: "100%",
                                            position: "absolute",
                                            top:
                                                (new Date(
                                                    data[
                                                        data.length - 1
                                                    ].EndTime
                                                ).getHours() *
                                                    height) /
                                                    24 +
                                                ((new Date(
                                                    data[
                                                        data.length - 1
                                                    ].EndTime
                                                ).getMinutes() /
                                                    60) *
                                                    height) /
                                                    24,
                                            height:
                                                height -
                                                (new Date(
                                                    data[
                                                        data.length - 1
                                                    ].StartTime
                                                ).getHours() *
                                                    height) /
                                                    24 +
                                                ((new Date(
                                                    data[
                                                        data.length - 1
                                                    ].StartTime
                                                ).getMinutes() /
                                                    60) *
                                                    height) /
                                                    24,
                                        },
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedTask(null);
                                            handleOpen();
                                        }}
                                        style={{ height: "100%" }}
                                    >
                                        <Text>Click to add</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {data.map((item: DataType, index: number) => {
                                const min =
                                    (new Date(item.EndTime).getHours() -
                                        new Date(item.StartTime).getHours()) *
                                        60 -
                                    new Date(item.StartTime).getMinutes() +
                                    new Date(item.EndTime).getMinutes();

                                return (
                                    <View
                                        key={new Date(
                                            item.StartTime
                                        ).toISOString()}
                                        style={[
                                            styles.Task,
                                            {
                                                top:
                                                    (new Date(
                                                        item.StartTime
                                                    ).getHours() *
                                                        height) /
                                                        24 +
                                                    ((new Date(
                                                        item.StartTime
                                                    ).getMinutes() /
                                                        60) *
                                                        height) /
                                                        24 +
                                                    10,
                                                height:
                                                    (min / 60) * (height / 24) -
                                                    20,
                                            },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedTask(item);
                                                handleOpen();
                                            }}
                                            style={{ height: "100%" }}
                                        >
                                            <Text style={{ color: "white" }}>
                                                {item.Name}
                                            </Text>
                                            <Text style={{ color: "white" }}>
                                                {item.Category}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
                {/* <TouchableOpacity
                    onPress={handleOpen}
                    style={{ backgroundColor: "red", height: 100 }}
                ></TouchableOpacity> */}

                <BottomSheet
                    index={-1}
                    enablePanDownToClose
                    snapPoints={snapPoints}
                    ref={bottomSheetRef}
                >
                    <BottomSheetView style={{ backgroundColor: "white" }}>
                        <EditTask
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                            handelClose={handleClose}
                            selectedDate={selectedDate}
                            setAppData={setData}
                        />
                        <Text style={{ backgroundColor: "white" }}>
                            {JSON.stringify(selectedTask)}
                        </Text>
                    </BottomSheetView>
                </BottomSheet>
            </View>
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
        borderRadius: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        padding: 5,
        width: "95%",

        flex: 1,
        backgroundColor: "#666",
        position: "absolute",
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
