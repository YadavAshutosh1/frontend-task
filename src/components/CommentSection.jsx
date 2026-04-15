// src/components/CommentSection.jsx

import { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const addComment = () => {
    if (!text.trim()) return;

    setComments([...comments, text]);
    setText("");
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Comments</h3>

      <div className="space-y-2 mb-2">
        {comments.map((c, i) => (
          <p key={i} className="bg-gray-100 p-2 rounded">
            {c}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment"
          className="border p-2 flex-1 rounded"
        />

        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CommentSection;