import { useUpdateMyUser } from "@/api/MyUserApi";
import { UserProfileForm } from "@/forms";

const UserProfilePage = () => {
  const { updateUser, isPending } = useUpdateMyUser();
  return <UserProfileForm onSave={updateUser} isLoading={isPending} />;
};

export { UserProfilePage };
