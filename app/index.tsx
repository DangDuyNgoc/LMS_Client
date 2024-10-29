import Loader from "@/components/loader/loader";
import useUser from "@/hook/auth/useUser";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function TabsIndex() {
  const {loading, user} = useUser();

  return (
    <>
      {
        !loading ? (
          <View>
            <Loader />
          </View>
        ): (
          <Redirect href={!user ? "/(routes)/onboarding" : "/(tabs)"} />
        )
      }
    </>
  );
}
