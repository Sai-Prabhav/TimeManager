import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getData, DataType } from "@/util/storage";

const TaskEditor = ({ selectedDate }: { selectedDate: number }) => {
    const [data, setData] = useState<DataType[] | null>(null);
    console.log(data);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(new Date());
            setData(data);
        };
        fetchData();
    }, []);
    if (data) {
        return (
            // <ScrollView>
            //     {data.map((item: DataType) => {
            //         // You can also return JSX elements here
            //         return (
            //             <View key={JSON.stringify(item)}>
            //                 <Text style={{ color: "white" }}>
            //                     {new Date().toISOString()}
            //                     ok man
            //                 </Text>
            //                 <Text style={{ color: "white" }}>
            //                     {new Date(item.EndTime).toISOString()}{" "}
            //                 </Text>
            //                 <Text style={{ color: "white" }}>
            //                     {item.Category}
            //                 </Text>
            //                 <Text style={{ color: "white" }}>
            //                     {item.SubCategory}
            //                 </Text>
            //                 <Text style={{ color: "white" }}>
            //                     {item.Description}
            //                 </Text>
            //                 <Text style={{ color: "white" }}>{item.Score}</Text>
            //                 <Text style={{ color: "white" }}>{item.Name}</Text>
            //             </View>
            //         );
            //     })}
            // </ScrollView>
        );
    } else {
        return (
            <View>
                <Text>No data found</Text>
            </View>
        );
    }
};

export default TaskEditor;

const styles = StyleSheet.create({});
