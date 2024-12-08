import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { DataType } from "@/util/storage";

const EditTask = ({
    selectedTask,
    setSelectedTask,
}: {
    selectedTask: DataType | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<DataType | null>>;
}) => {
    if (selectedTask) {

        const [name, setName] = useState(selectedTask?.Name);
        if (name!==selectedTask?.Name) {
            setName(selectedTask?.Name);
        }
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
                <Text style={styles.Label}>{name}</Text>
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
