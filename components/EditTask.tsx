import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DataType, getCategories } from "@/util/storage";
import { Dropdown } from "react-native-element-dropdown";
const EditTask = ({
    selectedTask,
    setSelectedTask,
}: {
    selectedTask: DataType | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<DataType | null>>;
}) => {
    if (selectedTask) {
        const [name, setName] = useState(selectedTask?.Name);
        const [description, setDescription] = useState(
            selectedTask?.Description
        );
        const [score, setScore] = useState(selectedTask?.Score);
        const [categories, setCategories] = useState([""]);
        const [category, setCategory] = useState("");
        useEffect(() => {
            setName(selectedTask?.Name);
            setDescription(selectedTask?.Description);
            setScore(selectedTask?.Score);
        }, [selectedTask]);
        useEffect(() => {
            const fetchData = async () => {
                const data = await getCategories();
                setCategories(data ?? []);
            };
            fetchData();
        }, []);
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
                    labelField="label"
                    valueField="value"
                    placeholder={category}
                    onChange={setCategory}
                />
            </View>
        );
    } else {
        return <Text style={styles.Header}>No task selected</Text>;
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
