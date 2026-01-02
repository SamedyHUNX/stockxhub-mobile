import BrandLogo from "@/components/BrandLogo";
import FooterLink from "@/components/FooterLink";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      country: "",
      investmentGoals: "",
      riskTolerance: "",
      preferredIndustry: "",
    },
  });

  const router = useRouter();
  const { signUp, isLoading } = useAuth();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUp(data);

      if (result.success) {
        Alert.alert("Success", result.message);
        router.push("/");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <BrandLogo label="Sign Up & Personalize" />

      {/* <ThemeToggle /> */}

      <View className="gap-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          type="text"
          control={control}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />

        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          control={control}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          control={control}
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: { value: 8, message: "Min 8 characters" },
          }}
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="h-12 bg-yellow-500 rounded-lg mt-5 items-center justify-center"
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <Text className="text-gray-950 font-medium text-base">
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Text>
        </Pressable>

        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </View>
    </ScrollView>
  );
}
