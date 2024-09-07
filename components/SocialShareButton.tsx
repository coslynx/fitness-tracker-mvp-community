import { useState } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/store";
import { shareProgress } from "@/utils/api";

interface SocialShareButtonProps {
  platform: "facebook" | "twitter" | "instagram";
  goalId: number;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  platform,
  goalId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSession();
  const { goals } = useStore();
  const goal = goals.find((goal) => goal.id === goalId);

  const handleShare = async () => {
    if (!user || !goal) {
      return;
    }

    setIsLoading(true);
    try {
      await shareProgress({
        platform,
        goalId,
        userId: user.id,
        goalName: goal.name,
        progress: "placeholder progress data", // Replace with actual progress data
      });
      // Handle success (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`
        bg-blue-500 
        hover:bg-blue-700 
        text-white 
        font-bold 
        py-2 
        px-4 
        rounded 
        ${isLoading ? "opacity-50 cursor-wait" : ""}
      `}
      onClick={handleShare}
      disabled={isLoading}
    >
      Share on {platform.toUpperCase()}
    </button>
  );
};

export default SocialShareButton;