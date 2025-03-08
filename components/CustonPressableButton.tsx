import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface PressableButtonProps {
    title: string;
    onPress: () => void;
}

const CustomPressableButton: React.FC<PressableButtonProps> = ({ title, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
            ]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
};

export default CustomPressableButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#27ae60", // Verde
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    buttonPressed: {
        backgroundColor: "#1e8449", // Verde mais escuro ao pressionar
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});


