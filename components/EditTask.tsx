import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { DataType, getCategories, getData, setData } from "@/util/storage";
import { Dropdown } from "react-native-element-dropdown";
// import { TimerPicker } from "react-native-timer-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
const EditTask = ({
    selectedTask,
    setSelectedTask,
    handelClose,
    selectedDate,
    setAppData,
}: {
    selectedTask: DataType | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<DataType | null>>;
    handelClose: () => void;
    selectedDate: number;
    setAppData: React.Dispatch<React.SetStateAction<DataType[] | null>>;
}) => {
    const [name, setName] = useState("Add a name");
    const [description, setDescription] = useState("Add a description");
    const [score, setScore] = useState(0);
    const [categories, setCategories] = useState([""]);
    const [category, setCategory] = useState(" ");
    const [dateStart, setDateStart] = useState(new Date(Date.now()));
    const [showStart, setShowStart] = useState(false);
    const [dateEnd, setDateEnd] = useState(new Date(Date.now()));
    const [showEnd, setShowEnd] = useState(false);
    const onChangeStart = (event: any, selectedDate: any) => {
        setShowStart(false);
        setDateStart(selectedDate);
    };
    const onChangeEnd = (event: any, selectedDate: any) => {
        setShowEnd(false);
        setDateEnd(selectedDate);
    };
    useEffect(() => {
        if (selectedTask) {
            setName(selectedTask?.Name);
            setDescription(selectedTask?.Description);
            setScore(selectedTask?.Score);
            setCategory(selectedTask?.Category);
            setDateStart(new Date(selectedTask?.StartTime));
            setDateEnd(new Date(selectedTask?.EndTime));
        }
    }, [selectedTask]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories();
            setCategories(data ?? []);
        };
        fetchData();
    }, []);
    if (selectedTask) {
        // if (name !== selectedTask?.Name && selectedTask?.Name) {
        //     setName(selectedTask?.Name);
        // }
        // if (description !== selectedTask?.Description) {
        //     setDescription(selectedTask?.Description);
        // }
        // setName(selectedTask?.Name);
        return (
            <View style={styles.Container}>
                <Text style={styles.Header}>Edit Task</Text>
                {/* <Text style={styles.Header}>{JSON.stringify(selectedTask)}</Text> */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.Label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder={name}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.Label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDescription}
                        value={description}
                        placeholder={description}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.Label}>Score</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(t) => setScore(Number(t))}
                        value={score?.toString()}
                        keyboardType="numeric"
                        placeholder={score?.toString()}
                    />
                </View>
                <Dropdown
                    style={{
                        margin: 16,
                        height: 50,
                        borderBottomColor: "gray",
                        borderBottomWidth: 0.5,
                    }}
                    data={categories.map((c) => ({ label: c, value: c }))}
                    // data={data}
                    labelField="label"
                    valueField="value"
                    placeholderStyle={{
                        backgroundColor: "skyblue",
                        color: "black",
                        fontSize: 16,
                    }}
                    selectedTextStyle={{
                        backgroundColor: "purple",
                        color: "black",
                        fontSize: 16,
                    }}
                    inputSearchStyle={{
                        backgroundColor: "yellow",
                        color: "black",
                        fontSize: 16,
                    }}
                    placeholder={category}
                    onChange={(i) => setCategory(i.value)}
                />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "40%" }}>
                        <Text>Start Time</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowStart(true)}
                        style={{ width: "50%" }}
                    >
                        <Text style={styles.Label}>
                            {dateStart.getHours()}:{dateStart.getMinutes()}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showStart && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateStart}
                        mode="time"
                        is24Hour={true}
                        onChange={onChangeStart}
                    />
                )}
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "40%" }}>
                        <Text>End Time</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowEnd(true)}
                        style={{ width: "50%" }}
                    >
                        <Text style={styles.Label}>
                            {dateEnd.getHours()}:{dateEnd.getMinutes()}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showEnd && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateEnd}
                        mode="time"
                        is24Hour={true}
                        onChange={onChangeEnd}
                    />
                )}

                <View
                    style={{
                        flexDirection: "row",
                        // alignItems: "space-between",
                    }}
                >
                    <TouchableOpacity
                        onPress={async () => {
                            const data =
                                (await getData(
                                    new Date(
                                        new Date(
                                            Date.now() -
                                                (selectedDate ) * 864e5
                                        )
                                    )
                                )) || [];
                            const index = data.findIndex((i) => {
                                return i.StartTime === selectedTask?.StartTime;
                            });
                            data[index] = {
                                Name: name,
                                Description: description,
                                Score: score,
                                Category: category,
                                StartTime: dateStart,
                                EndTime: dateEnd,
                            };

                            await setData(
                                new Date(
                                    new Date(
                                        Date.now() - (selectedDate ) * 864e5
                                    )
                                ),
                                data
                            );
                            const data1 =
                                (await getData(
                                    new Date(
                                        new Date(
                                            Date.now() -
                                                (selectedDate ) * 864e5
                                        )
                                    )
                                )) || [];

                            setAppData(data);
                            console.log(
                                "saved",
                                data,
                                "\n",
                                data1,
                                new Date(data[0].StartTime).getTime()
                            );
                            handelClose();
                        }}
                        // {
                        //     Name: name,
                        //     Description: description,
                        //     Score: score,
                        //     Category: category,
                        //     StartTime: dateStart,
                        //     EndTime: dateEnd,
                        // }

                        style={{
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 100,
                            height: 50,
                            marginRight: 50,
                            backgroundColor: "green",
                        }}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handelClose()}
                        style={{
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 100,
                            height: 50,
                            backgroundColor: "green",
                        }}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
                {/* <TimerPicker
                    visible={isEditStartTime}
                    hideSeconds
                    onDurationChange={(duration: {
                        hours: number;
                        minutes: number;
                        seconds: number;
                    }) =>
                        console.log(
                            duration.hours,
                            duration.minutes,
                            duration.seconds
                        )
                    }
                    // style={{ height: 100 }}
                /> */}
            </View>
        );
    } else {
        // return <Text style={styles.Header}>No task selected</Text>;
        return (
            <View style={styles.Container}>
                <Text style={styles.Header}>Add Task</Text>
                {/* <Text style={styles.Header}>{JSON.stringify(selectedTask)}</Text> */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.Label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder={name}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.Label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDescription}
                        value={description}
                        placeholder={description}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.Label}>Score</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(t) => setScore(Number(t))}
                        value={score?.toString()}
                        keyboardType="numeric"
                        placeholder={score?.toString()}
                    />
                </View>
                <Dropdown
                    style={{
                        margin: 16,
                        height: 50,
                        borderBottomColor: "gray",
                        borderBottomWidth: 0.5,
                    }}
                    data={categories.map((c) => ({ label: c, value: c }))}
                    // data={data}
                    labelField="label"
                    valueField="value"
                    placeholderStyle={{
                        backgroundColor: "skyblue",
                        color: "black",
                        fontSize: 16,
                    }}
                    selectedTextStyle={{
                        backgroundColor: "purple",
                        color: "black",
                        fontSize: 16,
                    }}
                    inputSearchStyle={{
                        backgroundColor: "yellow",
                        color: "black",
                        fontSize: 16,
                    }}
                    placeholder={category}
                    onChange={(i) => setCategory(i.value)}
                />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "40%" }}>
                        <Text>Start Time</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowStart(true)}
                        style={{ width: "50%" }}
                    >
                        <Text style={styles.Label}>
                            {dateStart.getHours()}:{dateStart.getMinutes()}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showStart && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateStart}
                        mode="time"
                        is24Hour={true}
                        onChange={onChangeStart}
                    />
                )}
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "40%" }}>
                        <Text>End Time</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowEnd(true)}
                        style={{ width: "50%" }}
                    >
                        <Text style={styles.Label}>
                            {dateEnd.getHours()}:{dateEnd.getMinutes()}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showEnd && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateEnd}
                        mode="time"
                        is24Hour={true}
                        onChange={onChangeEnd}
                    />
                )}

                <View
                    style={{
                        flexDirection: "row",
                        // alignItems: "space-between",
                    }}
                >
                    <TouchableOpacity
                        onPress={async () => {
                            const data =
                                (await getData(
                                    new Date(
                                        new Date(
                                            Date.now() -
                                                (selectedDate ) * 864e5
                                        )
                                    )
                                )) || [];

                            data.push({
                                Name: name,
                                Description: description,
                                Score: score,
                                Category: category,
                                StartTime: dateStart,
                                EndTime: dateEnd,
                            });

                            await setData(
                                new Date(
                                    new Date(
                                        Date.now() - (selectedDate ) * 864e5
                                    )
                                ),
                                data
                            );
                            const data1 =
                                (await getData(
                                    new Date(
                                        new Date(
                                            Date.now() -
                                                (selectedDate ) * 864e5
                                        )
                                    )
                                )) || [];

                            setAppData(data);
                            console.log(
                                "saved",
                                data,
                                "\n",
                                data1,
                                new Date(data[0].StartTime).getTime()
                            );
                            handelClose();
                        }}
                        // {
                        //     Name: name,
                        //     Description: description,
                        //     Score: score,
                        //     Category: category,
                        //     StartTime: dateStart,
                        //     EndTime: dateEnd,
                        // }

                        style={{
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 100,
                            height: 50,
                            marginRight: 50,
                            backgroundColor: "green",
                        }}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handelClose()}
                        style={{
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 100,
                            height: 50,
                            backgroundColor: "green",
                        }}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
                {/* <TimerPicker
                    visible={isEditStartTime}
                    hideSeconds
                    onDurationChange={(duration: {
                        hours: number;
                        minutes: number;
                        seconds: number;
                    }) =>
                        console.log(
                            duration.hours,
                            duration.minutes,
                            duration.seconds
                        )
                    }
                    // style={{ height: 100 }}
                /> */}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    Container: {
        paddingLeft: 5,
        width: "100%",
        margin: 5,
    },
    Header: { fontSize: 32 },
    input: {
        borderWidth: 1,
        borderColor: "black",
        flexGrow: 1,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "orange",
    },
    Label: {
        paddingRight: 5,
        fontSize: 20,
        textAlign: "center",
    },
});

export default EditTask;
