import { cn, getFlagEmoji } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Check, X } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import countryList from "react-select-country-list";

interface CountrySelectFieldProps {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  className?: string;
  error?: FieldError;
  [key: string]: any;
}

interface CountrySelectFormFieldProps {
  name: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

function CountrySelectField({
  value,
  defaultValue = "",
  onChange,
  className,
  error,
  ...props
}: CountrySelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");

  const currentValue = value !== undefined ? value : internalValue;
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const selectedCountry = options.find(
    (country) => country.value === currentValue
  );

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((country) =>
      country.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleSelect = (countryValue: string) => {
    const newValue = countryValue === currentValue ? "" : countryValue;

    if (value === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <View className={className}>
      <Text className="text-sm font-medium mb-2">Select your country</Text>

      <TouchableOpacity
        onPress={() => setOpen(true)}
        className={cn(
          "h-[56px] flex-row items-center justify-between border border-gray-600 rounded-xl p-3 bg-white",
          error ? "border-[2px] border-red-500" : ""
        )}
        {...props}
      >
        {currentValue ? (
          <View className="flex-row items-center gap-2">
            <Text className="text-base">
              {getFlagEmoji(selectedCountry?.value || "")}
            </Text>
            <Text className="text-base">{selectedCountry?.label}</Text>
          </View>
        ) : (
          <Text className="text-gray-400">Select your country...</Text>
        )}
        <Ionicons
          name="chevron-down"
          size={20}
          className="text-gray-500 dark:text-gray-400"
        />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setOpen(false)}
        >
          <Pressable
            className="bg-white rounded-t-3xl max-h-[80%]"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between mb-3 py-3">
                <Text className="text-xl font-semibold">Select Country</Text>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <X size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search country..."
                className="h-[56px] border border-gray-300 rounded-xl p-3 bg-gray-50"
              />
            </View>

            {filteredOptions.length === 0 ? (
              <View className="p-4">
                <Text className="text-center text-gray-500">
                  No country found.
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.value)}
                    className="flex-row items-center p-4 border-b border-gray-100"
                  >
                    <Check
                      size={16}
                      color={
                        currentValue === item.value ? "#000" : "transparent"
                      }
                      className="mr-2"
                    />
                    <Text className="text-base mr-2">
                      {getFlagEmoji(item.value)}
                    </Text>
                    <Text className="text-base">{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function CountrySelectFormField({
  name,
  control,
  error,
  required,
  className,
}: CountrySelectFormFieldProps) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: "Country is required" } : undefined}
        render={({ field }) => (
          <CountrySelectField
            value={field.value}
            onChange={field.onChange}
            className={className}
            error={error}
          />
        )}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
      )}
    </View>
  );
}
