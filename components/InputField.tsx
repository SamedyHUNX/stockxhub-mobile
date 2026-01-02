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
    <View className="gap-2">
      <Text className="text-sm font-medium text-gray-400">{label}</Text>

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
            placeholderTextColor="#9095a1"
            editable={!disabled}
            secureTextEntry={type === "password"}
            keyboardType={type === "email" ? "email-address" : "default"}
            autoCapitalize={type === "email" ? "none" : "sentences"}
            className={cn(
              "h-12 px-3 py-3 text-gray-400 text-base border border-gray-600 bg-gray-800 rounded-lg",
              {
                "opacity-50": disabled,
              }
            )}
            {...textInputProps}
          />
        )}
      />

      {error && <Text className="text-sm text-red-500">{error.message}</Text>}
    </View>
  );
}
