import { useState } from "react";

function ScheduleModal({
  onClose,
  onSave,
  editingItem,
  editingType,
}) {
  const [type, setType] = useState(
  editingType || "test"
);

const [formData, setFormData] = useState({
  title: editingItem?.title || "",
  category:
    editingItem?.category ||
    "Quantitative Aptitude",

  companyName:
    editingItem?.companyName || "",

  role: editingItem?.role || "",

  date: editingItem?.date
    ? editingItem.date.substring(0, 10)
    : "",

  time: editingItem?.time || "",

  duration:
    editingItem?.duration || "",

  location:
    editingItem?.location || "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(type, formData);
  };

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
  {editingItem
    ? "Edit Schedule"
    : "Add Schedule"}
</h2>

        <label>Schedule Type</label>

        <select
  value={type}
  disabled={editingItem}
  onChange={(e) =>
    setType(e.target.value)
  }
>
          <option value="test">Test</option>
          <option value="interview">
            Company Interview
          </option>
        </select>

        <form onSubmit={handleSubmit}>

          {type === "test" ? (
            <>
              <input
                name="title"
                placeholder="Test Title"
                onChange={handleChange}
              />
              <select
  name="category"
  value={formData.category}
  onChange={handleChange}
>
  <option value="Quantitative Aptitude">
    Quantitative Aptitude
  </option>

  <option value="Logical Reasoning">
    Logical Reasoning
  </option>

  <option value="Verbal Ability">
    Verbal Ability
  </option>

  <option value="Coding">
    Coding
  </option>
</select>

              <input
                name="duration"
                placeholder="Duration (Minutes)"
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <input
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
              />

              <input
                name="role"
                placeholder="Role"
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="date"
            name="date"
            onChange={handleChange}
          />

          <input
            type="time"
            name="time"
            onChange={handleChange}
          />

          <div className="modal-buttons">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ScheduleModal;