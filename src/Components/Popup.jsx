import React, { useState } from "react";

const Popup = ({ onClose, onAddGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // colors
  const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  const handleAdd = () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color");
      return;
    }

    onAddGroup({ name: groupName, color: selectedColor });
    setGroupName("");
    setSelectedColor("");
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Group</h3>

        <div className="input-row">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {/* Color Section */}
        <div className="color-section">
          <label>Choose Color</label>
          <div className="color-options">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>

        <button onClick={handleAdd}>Create</button>
      </div>
    </div>
  );
};

export default Popup;

