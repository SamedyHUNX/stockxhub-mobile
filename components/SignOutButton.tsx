import { useAuth } from "@/providers/AuthProvider";
import { Button } from "react-native";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return <Button title="Sign Out" onPress={handleSignOut} color="#FF3B30" />;
}
