import React from 'react'

function Difficulty() {
    return (
        <>
        <h2 className='mt-3 text-start'>Difficulty</h2>
            <div className="filter_inner_cards">
                
                <div className="d-flex justify-content-between ">
                    <div>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                           Easy
                        </label>
                    </div>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between ">
                    <div>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                           Moderate
                        </label>
                    </div>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between ">
                    <div>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                           Difficult
                        </label>
                    </div>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Difficulty
