export default function Loading() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
  
        <p className="text-gray-600 font-medium">
          তথ্য লোড হচ্ছে...
        </p>
      </div>
    );
  }