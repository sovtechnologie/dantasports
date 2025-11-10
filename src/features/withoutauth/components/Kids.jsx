import React from 'react'

function Kids() {
  return (
    <>
     <div className="mt-3 kids_check_box">
                      <div class="form-check ps-2 d-flex justify-content-between">
                        <label class="form-check-label" for="flexCheckDefault">
                         Kids Friendly
                        </label>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        
                      </div>
                      <div class="form-check ps-2 d-flex justify-content-between">
                        <label class="form-check-label" for="flexCheckChecked">
                          Pet Friendly
                        </label>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                        
                      </div>
                    </div>
    </>
  )
}

export default Kids
