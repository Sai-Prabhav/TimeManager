// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

type DataEntry = {
    StartTime: Date;
    EndTime: Date;
    Category: string;
    SubCategory: string;
    Description: string;
    Score: number;
    Name: string;
};

export const storeData = async (date: Date, value: DataEntry[]) => {
    try {
        const key = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // saving error
    }
};

export const getData = async (date: Date): Promise<DataEntry[] | null> => {
    try {
        const key = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        // error reading value
        return null;
    }
};
