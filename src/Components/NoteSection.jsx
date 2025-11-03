import React, { useState, useEffect } from "react";

const NotesSection = ({ group, addNote, groups, onBack}) => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const foundGroup = groups.find((g) => g.id === group.id);
    setNotes(foundGroup ? foundGroup.notes : []);
  }, [group, groups]);

  const handleAddNote = () => {
    if (noteText.trim() === "") return;
    addNote(group.id, noteText);
    setNoteText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleAddNote();
    }
  };

  // text and color for the selected group
  const initials = group.name.slice(0, 2).toUpperCase();
  const avatarColor = group.color || "#ccc";

  return (
    <div className="notes-section">
      {/*shows only selected group */}
      <div className="notes-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="avatar" style={{ backgroundColor: avatarColor }}>
          {initials}
        </div>
        <h2>{group.name}</h2>
      </div>

      {/* Notes list */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet. Add one below.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <p>{note.text}</p>
              <span>
                {new Date(note.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                &bull;{" "} {note.time}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="note-input">
        <textarea
          placeholder="Enter your text here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleAddNote}
          disabled={!noteText.trim()}
          className={noteText.trim() ? "active" : ""}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default NotesSection;
