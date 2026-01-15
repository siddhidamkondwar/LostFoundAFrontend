// src/Components/ItemComponent/MatchItemSearch.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLostItemById } from "../../Services/LostItemService";
import {
  getFoundItemsByLostItem,
  claimFoundItem,
} from "../../Services/FoundItemService";
import "../../Components/LoginComponent/StudentList.css";
import "./MatchItem.css";
import claimifyLogo from "./clamify-logo.png"; // logo added

const MatchItemSearch = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [lostItem, setLostItem] = useState(null);
  const [foundItems, setFoundItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getLostItemById(pid)
      .then((res) => setLostItem(res.data))
      .catch(() => setError("Failed to load lost item"));

    getFoundItemsByLostItem(pid)
      .then((res) =>
        setFoundItems(
          res.data.map((it) => ({
            ...it,
            // normalize backend names -> UI names
            itemName: it.foundItemName,
            lostDate: it.foundDate, // will show under LOST DATE column
            userId: it.username,    // will show under USER ID column
          }))
        )
      )
      .catch(() => setError("Failed to load matched items"));
  }, [pid]);

  const filteredItems = foundItems.filter(
    (item) =>
      item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClaim = (id) => {
    claimFoundItem(id)
      .then(() => {
        // remove claimed item from this list
        setFoundItems((prev) => prev.filter((item) => item.foundItemId !== id));
        setShowSuccess(true); // open success popup
      })
      .catch(() => setError("Claim failed"));
  };

  const handleBack = () => {
    navigate("/LostItemReport");
  };

  return (
    <div className="match-dashboard">
      {/* top header */}
      <header className="match-header">
        <div className="match-header-left">
          <img
            src="/images/claimify-logo.png"
            alt="Claimify"
            className="match-logo-img"
          />
        </div>

        <div className="match-header-right">
          <button className="match-back-btn" onClick={handleBack}>
            Back
          </button>
        </div>
      </header>

      {/* thin blue line under header */}
      <div className="match-header-divider" />

      {/* main */}
      <main className="match-main">
        <h2 className="match-title">Match Item List</h2>

        {/* if you want search bar visible, uncomment this block */}
        {/* <div className="match-top-row">
          <div>
            <span className="match-search-icon">🔍</span>
            <input
              type="text"
              className="match-search-input"
              placeholder="Search by name, category or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <span className="match-count-text">
            Showing {filteredItems.length} of {foundItems.length}
          </span>
        </div> */}

        <div className="match-top-row">
          <span className="match-count-text">
            Showing {filteredItems.length} of {foundItems.length}
          </span>
        </div>

        <section className="match-table-card">
          {error ? (
            <p className="match-error">{error}</p>
          ) : filteredItems.length === 0 ? (
            <p className="match-no-data">No matching items found</p>
          ) : (
            <table className="match-table">
              <thead>
                <tr>
                  <th>ITEM ID</th>
                  <th>ITEM NAME</th>
                  <th>CATEGORY</th>
                  <th>COLOR</th>
                  <th>BRAND</th>
                  <th>LOCATION</th>
                  <th>LOST DATE</th>
                  <th>USER ID</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.foundItemId}>
                    <td>{String(index + 1).padStart(5, "0")}</td>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>{item.brand}</td>
                    <td>{item.location}</td>
                    <td>{item.lostDate}</td>
                    <td>{item.userId}</td>
                    <td className="match-status-cell">
                      {!item.status && (
                        <button
                          className="match-collect-pill"
                          onClick={() => handleClaim(item.foundItemId)}
                        >
                          Collect
                        </button>
                      )}
                      {item.status && (
                        <span className="match-status-text">Collected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      {/* success popup */}
      {showSuccess && (
        <div
          className="match-modal-backdrop"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="match-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Item claimed successfully</h3>
            <p>Your item has been claimed and removed from the list.</p>
            <button
              className="match-modal-btn"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchItemSearch;
