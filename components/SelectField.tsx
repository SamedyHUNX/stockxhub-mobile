import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SelectField({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View className="space-y-2 mb-4">
      <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        {label}
      </Text>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => {
          const selectedOption = options.find(
            (opt) => opt.value === field.value
          );

          return (
            <>
              <TouchableOpacity
                onPress={() => setIsOpen(true)}
                className={`h-[56px] flex-row items-center justify-between bg-white dark:bg-gray-600 border border-gray-600 dark:border-gray-600 rounded-xl px-4 py-3 ${
                  error ? "border-red-600 border-[2px]" : ""
                }`}
              >
                <Text
                  className={`text-base ${
                    selectedOption
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              </TouchableOpacity>

              <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIsOpen(false)}
                  className="flex-1 bg-black/50 justify-center items-center"
                >
                  <View className="bg-white dark:bg-gray-800 rounded-lg w-4/5 max-h-96 border border-gray-300 dark:border-gray-600">
                    <ScrollView className="p-2">
                      {options.map((option) => (
                        <TouchableOpacity
                          key={option.value}
                          onPress={() => {
                            field.onChange(option.value);
                            setIsOpen(false);
                          }}
                          className={`p-4 rounded-lg mb-1 ${
                            field.value === option.value
                              ? "bg-gray-200 dark:bg-gray-700"
                              : "bg-transparent"
                          }`}
                        >
                          <Text className="text-base text-gray-900 dark:text-white">
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          );
        }}
      />

      {error && (
        <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
      )}
    </View>
  );
}
