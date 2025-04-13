import React, { useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useSyncStatus } from "@tonk/keepsync";

const Todos = () => {
  // Use the current keepsync API for sync status
  const [syncStatus, setSyncStatus] = useState<"connected" | "connecting" | "disconnected">("connecting");
  const [isAddingGame, setIsAddingGame] = useState(false);

  // Check sync connection status on component mount
  React.useEffect(() => {
    // For this simple demo, we'll simulate the sync status
    // In a real implementation, we would use the keepsync API properly
    setSyncStatus("connected");
    
    const syncStatusInterval = setInterval(() => {
      // This is just to demonstrate the UI - in a real app, this would come from keepsync
      const online = navigator.onLine;
      setSyncStatus(online ? "connected" : "disconnected");
    }, 5000);
    
    return () => clearInterval(syncStatusInterval);
  }, []);

  // Toggle connection demo
  const handleToggleConnection = () => {
    if (syncStatus === "connected") {
      setSyncStatus("disconnected");
    } else {
      setSyncStatus("connected");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <section className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Gaming Universe
            </h1>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-700">Sync Status:</span>
              <span
                className={`inline-block h-3 w-3 rounded-full mr-1 transition-colors duration-300 ${
                  syncStatus === "connected"
                    ? "bg-green-500"
                    : syncStatus === "connecting"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
              <span className="text-sm text-gray-700 mr-2">{syncStatus}</span>
              {syncStatus !== "connecting" && (
                <button
                  onClick={handleToggleConnection}
                  className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                  {syncStatus === "connected" ? "Disconnect" : "Reconnect"}
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Here you can find the most popular games for you to try next
          </p>
        </div>

        <TodoList />
      </section>

      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 hover:scale-110 transition-transform"
        onClick={() => setIsAddingGame(true)}
      >
        +
      </button>

      {isAddingGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <AddTodo />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              onClick={() => setIsAddingGame(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Todos;