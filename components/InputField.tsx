import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export default function InputField({
  name,
  label,
  placeholder,
  type = "text",
  control,
  error,
  validation,
  disabled,
  ...textInputProps
}: InputFieldProps) {
  return (
    <View className="space-y-2 mb-4">
      <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            editable={!disabled}
            secureTextEntry={type === "password"}
            keyboardType={type === "email" ? "email-address" : "default"}
            autoCapitalize={type === "email" ? "none" : "sentences"}
            className={cn(
              "h-[56px] px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-600 border border-gray-600 dark:border-gray-600 rounded-xl",
              error ? "border-red-600 border-[2px]" : "",
              {
                "opacity-50": disabled,
              }
            )}
            {...textInputProps}
          />
        )}
      />

      {error && (
        <Text className="text-sm text-red-500 mt-1">{error.message}</Text>
      )}
    </View>
  );
}
