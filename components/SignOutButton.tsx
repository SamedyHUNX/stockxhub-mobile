import { useAuth } from "@/providers/AuthProvider";
import { Alert, Button } from "react-native";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            Alert.alert("Signed out successfully");
          } catch (error) {
            console.error("Sign out error:", error);
            Alert.alert("Sign out failed");
          }
        },
      },
    ]);
  };

  return <Button title="Sign Out" onPress={handleSignOut} color="#FF3B30" />;
}
