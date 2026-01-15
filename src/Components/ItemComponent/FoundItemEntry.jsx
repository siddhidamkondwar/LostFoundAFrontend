import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveFoundItem } from "../../Services/FoundItemService";
import "./FoundEntry.css";
import "../../DisplayView.css";
import claimifyLogo from "./clamify-logo.png"; // logo added

const FoundItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: new Date(),
    status: false,
    image: null,
  });

  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState("");
  const [userId, setUserId] = useState("");
  const [preview, setPreview] = useState(null);

  const setFoundItemId = () => {
    generateId().then((response) => {
      setNewId(response.data);
    });
  };

  const setUsername = () => {
    getUserId().then((response) => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setFoundItemId();
    setUsername();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFoundItem((values) => ({ ...values, [name]: value }));
  };

  const foundItemSubmit = (event) => {
    event.preventDefault();

    const updatedItem = {
      ...foundItem,
      foundItemId: newId,
      username: userId,
      foundDate: fdate,
    };

    saveFoundItem(updatedItem).then(() => {
      setShowSuccess(true);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }
    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!foundItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }
    if (!foundItem.location.trim()) {
      tempErrors.location = "Found Location is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      foundItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate("/StudentMenu");
  };

  // custom handler for file selection
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFoundItem((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="found-page light">
      <div className="found-card light">
        {/* logo + heading row (same pattern as Lost form) */}
        <div className="found-card-header">
          <img
            src={claimifyLogo}
            alt="Claimify logo"
            className="found-logo"
          />
          <h2 className="found-title light">REPORT FOUND ITEMS</h2>
        </div>

        <p className="found-subtitle">
          Please fill in all required information
        </p>

        <form className="found-form light">
          {/* Item Id */}
          <div className="found-row light">
            <label className="found-label">Item Id</label>
            <input className="found-input light" value={newId} readOnly />
          </div>

          {/* Found Item Name */}
          <div className="found-row light">
            <label className="found-label">Found Item Name</label>
            <div className="found-input-wrapper">
              <input
                name="foundItemName"
                className="found-input light"
                value={foundItem.foundItemName}
                onChange={onChangeHandler}
              />
              {errors.foundItemName && (
                <p className="error-text">{errors.foundItemName}</p>
              )}
            </div>
          </div>

          {/* Item Category */}
          <div className="found-row light">
            <label className="found-label">Item Category</label>
            <div className="found-input-wrapper">
              <input
                name="category"
                className="found-input light"
                value={foundItem.category}
                onChange={onChangeHandler}
              />
              {errors.category && (
                <p className="error-text">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Item Color */}
          <div className="found-row light">
            <label className="found-label">Item Color</label>
            <div className="found-input-wrapper">
              <input
                name="color"
                className="found-input light"
                value={foundItem.color}
                onChange={onChangeHandler}
              />
              {errors.color && <p className="error-text">{errors.color}</p>}
            </div>
          </div>

          {/* Item Brand */}
          <div className="found-row light">
            <label className="found-label">Item Brand Name</label>
            <div className="found-input-wrapper">
              <input
                name="brand"
                className="found-input light"
                value={foundItem.brand}
                onChange={onChangeHandler}
              />
              {errors.brand && <p className="error-text">{errors.brand}</p>}
            </div>
          </div>

          {/* Location */}
          <div className="found-row light">
            <label className="found-label">Location of Found Item</label>
            <div className="found-input-wrapper">
              <input
                name="location"
                className="found-input light"
                value={foundItem.location}
                onChange={onChangeHandler}
              />
              {errors.location && (
                <p className="error-text">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="found-row light">
            <label className="found-label">Select Found Date</label>
            <input
              type="date"
              className="found-input light"
              value={fdate}
              onChange={(e) => setFdate(e.target.value)}
              placeholder="dd-mm-yyyy"
            />
          </div>

          {/* Upload Item Image – custom grey dotted drop-zone */}
          <div className="found-row light">
            <label className="found-label">Upload Item Image(Optional)</label>
            <div className="found-input-wrapper">
              {/* hidden native input */}
              <input
                id="item-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {/* clickable drop zone styled like GitHub */}
              <label
                htmlFor="item-image-input"
                className="upload-drop-zone"
              >
                <span>
                  Drag image here or{" "}
                  <span className="upload-click-text">click to upload</span>
                </span>
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="item preview"
                  className="found-preview-thumb"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="found-actions light">
            <button
              type="button"
              className="found-submit light"
              onClick={handleValidation}
            >
              Submit
            </button>
            <button
              type="button"
              className="found-return light"
              onClick={returnBack}
            >
              Return
            </button>
          </div>
        </form>

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-card">
              <h3 className="success-title">
                Found item form submitted successfully
              </h3>
              <div className="success-icon">
                <span className="success-tick"></span>
              </div>
              <button className="success-ok-btn" onClick={handleSuccessOk}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItemEntry;
