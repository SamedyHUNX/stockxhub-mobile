import BrandLogo from "@/components/BrandLogo";
import FooterLink from "@/components/FooterLink";
import InputField from "@/components/InputField";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    try {
      //   const result = await signInWithEmail(data);

      //   if (result.success) {
      //     Alert.alert("Success", result.message);
      //     router.push("/");
      //   }
      console.log(data);
    } catch (error) {
      console.error(error);
      //   console.error(error);
      //   Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="px-4">
      <BrandLogo label="Sign In & Start Trading" />

      <ThemeToggle />

      <View className="gap-5">
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

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="h-12 bg-yellow-500 rounded-lg mt-5 items-center justify-center"
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <Text className="text-gray-950 font-medium text-base">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Text>
        </Pressable>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/sign-up"
        />
      </View>
    </SafeAreaView>
  );
}
