import { useAuth } from "@/providers/AuthProvider";
import { Alert, Button } from "react-native";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      Alert.alert("Sign out failed");
    }
  };

  return <Button title="Sign Out" onPress={handleSignOut} color="#FF3B30" />;
}
