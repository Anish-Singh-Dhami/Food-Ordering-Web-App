import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import { UserProfileForm } from "@/forms";

const UserProfilePage = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile...</span>;
  }

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isPending}
      currentUser={currentUser}
    />
  );
};

export { UserProfilePage };
