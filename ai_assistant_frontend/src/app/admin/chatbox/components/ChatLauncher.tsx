type Props = {
  onClick: () => void;
};

export default function ChatLauncher({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 bg-white text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
    >
      💬 Chat
    </button>
  );
}
