import React, { useState } from "react";
import { useTodoStore } from "../stores/todoStore";

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState<"TTRPG" | "puzzle" | "sports">("puzzle");
  const [isExpanded, setIsExpanded] = useState(false);
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim(), description.trim(), genre);
      setText("");
      setDescription("");
      setGenre("puzzle");
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What game do you want to add?"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="add-todo-input"
          />
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700"
            data-testid="add-todo-button"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {isExpanded ? "−" : "+"}
          </button>
        </div>
        
        {isExpanded && (
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 pt-2">
            <div className="flex flex-col space-y-1">
              <label htmlFor="genre" className="text-sm text-gray-600">
                Genre
              </label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value as "TTRPG" | "puzzle" | "sports")}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="genre-select"
              >
                <option value="TTRPG">TTRPG</option>
                <option value="puzzle">Puzzle</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="description" className="text-sm text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for the game"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="description-input"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default AddTodo;