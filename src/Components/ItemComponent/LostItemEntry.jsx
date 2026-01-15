import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import {
  generateId,
  saveLostItem,
  uploadImage,
} from "../../Services/LostItemService";
import "../../DisplayView.css";
import "./FoundEntry.css";
import claimifyLogo from "./clamify-logo.png"; // logo added



const LostItemEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
    imagePath: "",
  });

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState("");
  const [userId, setUserId] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const setLostItemId = () => {
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
    setLostItemId();
    setUsername();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLostItem((values) => ({ ...values, [name]: value }));
  };

  const lostItemSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    let uploadedPath = "";

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await uploadImage(formData);
        uploadedPath = uploadResponse.data; // e.g. "/uploads/abc.jpg"
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
        setUploading(false);
        return;
      }
    }

    const updatedItem = {
      lostItemId: newId,
      lostItemName: lostItem.lostItemName,
      color: lostItem.color,
      brand: lostItem.brand,
      category: lostItem.category,
      location: lostItem.location,
      username: userId,
      lostDate: ldate,
      status: false,
      imagePath: uploadedPath,
    };

    try {
      await saveLostItem(updatedItem);
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to save lost item:", error);
      alert("Failed to save lost item. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }
    if (!lostItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }
    if (!lostItem.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }
    if (!ldate) {
      tempErrors.lostDate = "Lost Date is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      lostItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate("/StudentMenu");
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="found-page light">
    <div className="found-card light">
  {/* logo + title in one row */}
  <div className="found-card-header">
    <img
      src={claimifyLogo}
      alt="Claimify logo"
      className="found-logo"
    />
    <h2 className="found-title light">REPORT LOST ITEM</h2>
  </div>

  <p className="found-subtitle">
    Please fill in all required information
  </p>

        <form className="found-form light">
          {/* Row 1 */}
          <div className="found-row light">
            <label className="found-label">Item Id</label>
            <input
              name="itemId"
              className="found-input light"
              value={newId}
              readOnly
            />
          </div>

          <div className="found-row light">
            <label className="found-label">Lost Item Name</label>
            <div className="found-input-wrapper">
              <input
                name="lostItemName"
                className="found-input light"
                value={lostItem.lostItemName}
                onChange={onChangeHandler}
              />
              {errors.lostItemName && (
                <p className="error-text">{errors.lostItemName}</p>
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
                value={lostItem.category}
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
                value={lostItem.color}
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
                value={lostItem.brand}
                onChange={onChangeHandler}
              />
              {errors.brand && <p className="error-text">{errors.brand}</p>}
            </div>
          </div>

          {/* Location */}
          <div className="found-row light">
            <label className="found-label">Location of Lost Item</label>
            <div className="found-input-wrapper">
              <input
                name="location"
                className="found-input light"
                value={lostItem.location}
                onChange={onChangeHandler}
              />
              {errors.location && (
                <p className="error-text">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="found-row light">
            <label className="found-label">Select Lost Date</label>
            <input
              type="date"
              className="found-input light"
              value={ldate}
              onChange={(event) => setLdate(event.target.value)}
            />
          </div>

          {/* Image upload */}
          <div className="found-row light">
            <label className="found-label">Upload Item Image (Optional)</label>
            <div className="found-input-wrapper">
              <input
                id="lost-item-image-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <label
                htmlFor="lost-item-image-input"
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

          {/* Buttons */}
          <div className="found-actions light">
            <button
              type="button"
              className="found-submit light"
              onClick={handleValidation}
              disabled={uploading}
            >
              {uploading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              className="found-return light"
              onClick={returnBack}
              disabled={uploading}
            >
              Return
            </button>
          </div>
        </form>

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-card">
              <h3 className="success-title">
                Lost item form submitted successfully
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

export default LostItemEntry;
