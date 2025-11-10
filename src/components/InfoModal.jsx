// 📁 src/components/InfoModal.js
import React from "react";
import { Modal } from "react-bootstrap";
import "../../src/components/StyleSheets/InfoModal.css"

const InfoModal = ({ show, type, onClose }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="true"
            contentClassName="info-modal-content"
        >
            {/* 🔹 Pass Price Modal */}
            {type === "pass" && (
                <>
                    <div className="info-modal-header">
                        <span>Pass Price</span>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>
                    <div className="info-modal-body">
                        Includes base ticket price × number of passes selected.
                    </div>
                </>
            )}

            {/* 🔹 Convenience Fee Modal */}
            {type === "convenience" && (
                <>
                    <div className="info-modal-header">
                        <span>Convenience Fee</span>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>
                    <div className="info-modal-body">
                        <div>• Base Fee: ₹5.40 (2.00% of the Base Fee)</div>
                        <div>• GST: ₹0.97 (18.0% of the Base Fee)</div>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default InfoModal;
