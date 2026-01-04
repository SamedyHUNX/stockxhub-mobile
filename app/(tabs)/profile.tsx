import Loading from "@/components/Loading";
import ProfileItem from "@/components/ProfileItem";
import SignOutButton from "@/components/SignOutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import {
  Briefcase,
  Calendar,
  Globe,
  Mail,
  Target,
  TrendingUp,
  User,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getCurrentUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getCurrentUser();
      if (response.user) {
        setUserData(response.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to load user data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-500 dark:text-gray-400">
          No user data available.
          <SignOutButton />
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-5">
        {/* Header */}
        <Text className="text-3xl font-bold py-3 text-gray-900 dark:text-white mb-1">
          Profiles
        </Text>

        {/* Profile Section */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Profile Information
          </Text>

          <ProfileItem
            icon={User}
            label="Name"
            value={userData.name}
            onPress={() => console.log("Edit name")}
          />

          <ProfileItem
            icon={Mail}
            label="Email"
            value={userData.email}
            showBadge
            badgeText={userData.emailVerified ? "Verified" : "Not Verified"}
            badgeColor={
              userData.emailVerified
                ? "bg-green-100 dark:bg-green-900"
                : "bg-amber-100 dark:bg-amber-900"
            }
            onPress={() => console.log("Edit email")}
          />

          <ProfileItem
            icon={Globe}
            label="Country"
            value={userData.country}
            onPress={() => console.log("Edit country")}
          />
        </View>

        {/* Investment Preferences */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Investment Preferences
          </Text>

          <ProfileItem
            icon={Target}
            label="Investment Goals"
            value={userData.investmentGoals}
            onPress={() => console.log("Edit investment goals")}
          />

          <ProfileItem
            icon={TrendingUp}
            label="Risk Tolerance"
            value={userData.riskTolerance}
            onPress={() => console.log("Edit risk tolerance")}
          />

          <ProfileItem
            icon={Briefcase}
            label="Preferred Industry"
            value={userData.preferredIndustry}
            onPress={() => console.log("Edit preferred industry")}
          />
        </View>

        {/* Account Details */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Account Details
          </Text>

          <View className="bg-white dark:bg-gray-800 p-4 mb-2 rounded-xl border border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center mb-4">
              <View className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                <Calendar size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                  Member Since
                </Text>
                <Text className="text-gray-900 dark:text-white text-base font-medium">
                  {userData.createdAt ? formatDate(userData.createdAt) : "N/A"}
                </Text>
              </View>
            </View>

            <View className="border-t border-gray-100 dark:border-gray-700 pt-3 mb-3">
              <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                Last Updated
              </Text>
              <Text className="text-gray-600 dark:text-gray-300 text-sm">
                {userData.updatedAt ? formatDate(userData.updatedAt) : "N/A"}
              </Text>
            </View>

            <View className="border-t border-gray-100 dark:border-gray-700 pt-3">
              <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                User ID
              </Text>
              <Text
                className="text-gray-600 dark:text-gray-300 text-xs"
                style={{ fontFamily: "monospace" }}
              >
                {userData.id}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          className="bg-blue-600 dark:bg-blue-500 p-4 rounded-xl mb-3"
          activeOpacity={0.8}
          onPress={() => console.log("Edit profile")}
        >
          <Text className="text-white text-center font-semibold text-base">
            Edit Profile
          </Text>
        </TouchableOpacity>

        <ThemeToggle />
        <View className="mt-3">
          <SignOutButton />
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </View>
    </ScrollView>
  );
}
