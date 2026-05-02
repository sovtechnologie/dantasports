import React from "react";
import { Modal } from "react-bootstrap";
import "../../src/components/StyleSheets/InfoModal.css";

const InfoModal = ({ show, type, onClose, bookingData = {} }) => {

    const {
        base_fare_amount = 0,
        base_fare_gst = 0,
        convenience_fee = 0,
        gst = 0
    } = bookingData;

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="true"
            contentClassName="info-modal-content"
        >
            {/* Pass Price Modal */}
            {type === "pass" && (
                <>
                    <div className="info-modal-header">
                        <span>Court Price</span>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>

                    <div className="info-modal-body">
                        • Total court price including applicable taxes<br />
                        • Invoice can be collected directly from the venue at the time of play
                    </div>
                </>
            )}

            {/* Convenience Fee Modal */}
            {type === "convenience" && (
                <>
                    <div className="info-modal-header">
                        <span>Convenience Fee </span>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>

                    <div className="info-modal-body">
                        <div>• Base Fee: INR {base_fare_amount.toFixed(2)} ({Math.round(convenience_fee)}% of the Base Fee)
</div>
                        <div>• GST: INR {base_fare_gst.toFixed(2)} ({gst}% of the Base Fee)</div>
                        
                    </div>
                </>
            )}
        </Modal>
    );
};

export default InfoModal;
