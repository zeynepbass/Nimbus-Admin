import ProfileCard from "@/components/features/settings/ProfileCard";
import SettingsTabs from "@/components/features/settings/SettingsTabs";

export default function Page() {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-50 gap-4 p-6">
      <div className="col-span-12 lg:col-span-3">
        <ProfileCard />
      </div>

      <div className="col-span-12 lg:col-span-9 rounded-lg">
        <SettingsTabs />
      </div>
    </div>
  );
}
