// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type DataType = {
    StartTime: Date;
    EndTime: Date;
    Category: string;
    Description: string;
    Score: number;
    Name: string;
};

export const setData = async (date: Date, value: DataType[]) => {
    try {
        const key = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        await AsyncStorage.setItem(
            key,
            JSON.stringify(
                value.sort(
                    (a, b) =>
                        new Date(a.StartTime).getTime() -
                        new Date(b.StartTime).getTime()
                )
            )
        );
    } catch (e) {
        // saving error
    }
};

export const getData = async (date: Date): Promise<DataType[] | null> => {
    try {
        const key = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        const value = await AsyncStorage.getItem(key);
        if (!value) {
            setData(date, []);
            return getData(date);
        }
        return JSON.parse(value);
    } catch (e) {
        // error reading value
        return null;
    }
};

// Function to generate unique schedules for a range of dates
function generateSchedule(baseDate: any, offset: any) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + offset);

    const startHour = 6 + offset; // Shift start times slightly each day
    const taskDuration = 1 + (offset % 2); // Alternate between 1 and 2-hour tasks

    return [
        {
            StartTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour,
                0,
                0
            ),
            EndTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration,
                0,
                0
            ),
            Category: "Morning Routine",
            Description: "Morning Exercise",
            Score: 10,
            Name: "Exercise",
        },
        {
            StartTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration,
                0,
                0
            ),
            EndTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 2,
                0,
                0
            ),
            Category: "Work",
            Description: "Focused Work Session",
            Score: 10,
            Name: "Work",
        },
        {
            StartTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 2,
                0,
                0
            ),
            EndTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 3,
                0,
                0
            ),
            Category: "Lunch",
            Description: "Lunch Break",
            Score: 10,
            Name: "Lunch",
        },
        {
            StartTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 3,
                0,
                0
            ),
            EndTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 7,
                0,
                0
            ),
            Category: "Work",
            Description: "Deep Work Session",
            Score: 10,
            Name: "Work",
        },
        {
            StartTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 7,
                0,
                0
            ),
            EndTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 8,
                0,
                0
            ),
            Category: "Dinner",
            Description: "Dinner",
            Score: 10,
            Name: "Dinner",
        },
        {
            StartTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 8,
                0,
                0
            ),
            EndTime: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                startHour + taskDuration + 10,
                0,
                0
            ),
            Category: "Leisure",
            Description: "Relaxation Time",
            Score: 10,
            Name: "Leisure",
        },
    ];
}

export const addCategory = async (category: string) => {
    try {
        if (!(category in getCategories())) {
            const key = "categories";
            const value = await AsyncStorage.getItem(key);
            const categories = value ? JSON.parse(value) : [];
            categories.push(category);
            await AsyncStorage.setItem(key, JSON.stringify(categories));
        }
    } catch (e) {
        // saving error
    }
};

export const getCategories = async (): Promise<string[] | null> => {
    try {
        const key = "categories";
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        // error reading value
        return null;
    }
};
AsyncStorage.removeItem("categories");
const addDefaultCategories = async () => {
    const categories = [
        "Morning Routine",
        "Work",
        "Lunch",
        "Dinner",
        "Leisure",
    ];
    for (const category of categories) {
        await addCategory(category);
    }
};

addDefaultCategories();
