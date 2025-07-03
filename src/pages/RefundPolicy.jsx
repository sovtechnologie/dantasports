import React from "react";
import "../stylesheets/RefundPolicy.css";

function RefundPolicy() {
    return (
        <div className="Refund-container">
            <h1>Cancellation & Refund Policy</h1>
            <section>
                <p>Cancellations are governed by the individual policies of each venue listed on the Danta Sports platform. We encourage users to review the specific cancellation policy of the venue before confirming a booking. These policies are visible on the venue's listing page as well as within your booking confirmation.</p>
            </section>

            <section>
                <p>Users can initiate cancellations directly from their booking ticket under the "My Bookings" section. The applicable refund amount, if any, will be clearly displayed before you confirm the cancellation.</p>
            </section>

            <section>
                <p>Refunds, if eligible, will be processed to the original payment method used during the booking. It may take 5–7 working days for the amount to reflect in your account after the cancellation is confirmed.</p>
            </section>

        </div>
    )

}
export default RefundPolicy