import React, { useState, useEffect } from "react";
import GroupList from "./Components/GroupList.jsx";
import NotesSection from "./Components/NoteSection.jsx";
import Popup from "./Components/Popup.jsx";
import "./index.css";
import emptyImg from "./assets/pocket_notes.png";

function App() {
  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem("groups")) || [];
  });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const addGroup = ({ name, color }) => {
    if (name.length < 2) return alert("Group name must be at least 2 letters");
    if (groups.some((g) => g.name.toLowerCase() === name.toLowerCase()))
      return alert("Duplicate group names not allowed");

    const newGroup = { id: Date.now(), name, color, notes: [] };
    setGroups([...groups, newGroup]);
  };

  const addNote = (groupId, noteText) => {
    const date = new Date();
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        const newNote = {
          id: Date.now(),
          text: noteText,
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        return { ...group, notes: [...group.notes, newNote] };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  return (
    <div className={`app-container ${selectedGroup ? "group-selected" : ""}`}>
      <div className="left-panel">
        <div className="header">
          <h2>Pocket Notes</h2>
        </div>
        <div className="group-list">
          <GroupList
            groups={groups}
            onSelect={setSelectedGroup}
            selectedGroup={selectedGroup}
          />
        </div>
        <button className="add-btn" onClick={() => setShowPopup(true)}>
          +
        </button>
      </div>

      <div className="right-panel">
        {selectedGroup ? (
          <NotesSection
            group={selectedGroup}
            addNote={addNote}
            groups={groups}
            onBack={() => setSelectedGroup(null)}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-notes">
              <img src={emptyImg} alt="No notes yet" />
              <h1>Pocket Notes</h1>
              <p> Send and receive messages without keeping your phone online.</p>
              <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
            <p>🔒end-to-end encrypted</p>
          </div>
        )}
      </div>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} onAddGroup={addGroup} />
      )}
    </div>
  );
}

export default App;
