import React from 'react'

function Kids({ kidsFriendly, setKidsFriendly, petFriendly, setPetFriendly }) {
  return (
    <>
      <div className="mt-3 kids_check_box filter_inner_cards">
        <div className="form-check ps-2 d-flex justify-content-between">
          <label className="form-check-label" htmlFor="kidsFriend">
            Kids Friendly
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="kidsFriend"
            checked={kidsFriendly}
            onChange={(e) => setKidsFriendly(e.target.checked)}
          />
        </div>

        <div className="form-check ps-2 d-flex justify-content-between">
          <label className="form-check-label" htmlFor="petFriend">
            Pet Friendly
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="petFriend"
            checked={petFriendly}
            onChange={(e) => setPetFriendly(e.target.checked)}
          />
        </div>
      </div>
    </>
  );
}

export default Kids;




