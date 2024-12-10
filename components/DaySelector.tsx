import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

export function DaySelector({
    SelectedDate: selectedDate,
    setSelectedDate,
}: {
    SelectedDate: number;
    setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [width, setWidth] = useState(0);
    return (
        <View>
            <ScrollView
                onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
                horizontal
                contentOffset={{
                    x: 0,
                    y: 0,
                }}
            >
                <View style={styles.ScrollView}>
                    {[...Array(11).keys()].map((i) => {
                        const date = new Date(Date.now() + (-i) * 864e5);
                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedDate(i)}
                                key={i}
                            >
                                <View
                                    style={
                                        selectedDate === i
                                            ? styles.SelectedContainer
                                            : styles.Container
                                    }
                                >
                                    <Text style={styles.Month}>
                                        {date.toLocaleString("default", {
                                            month: "short",
                                        })}
                                    </Text>
                                    <Text style={styles.Date}>
                                        {date.getDate()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Date: {
        color: "white",
        textAlign: "center",
    },
    Month: {
        textAlign: "center",
        color: "white",
    },
    ScrollView: {
        flex: 1,
        flexDirection: "row",
    },
    Container: {
        height: "auto",
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#666",
    },
    SelectedContainer: {
        height: "auto",
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#666",
        borderWidth: 2,
        borderColor: "white",
    },
});
