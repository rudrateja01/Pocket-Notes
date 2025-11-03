const GroupList = ({ groups, onSelect, selectedGroup }) => {
  return (
    <ul className="group-list-items">
      {groups.map((group) => {
        const initials = group.name.slice(0, 2).toUpperCase();
        return (
          <li
            key={group.id}
            onClick={() => onSelect(group)}
            className={selectedGroup?.id === group.id ? "selected" : ""}
          >
            <div className="avatar" style={{ backgroundColor: group.color }}>{initials}</div>
            <span>{group.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default GroupList;
