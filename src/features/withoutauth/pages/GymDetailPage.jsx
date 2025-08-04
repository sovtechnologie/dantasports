import "../Stylesheets/GymDetailPage.css";

export default function GymDetailPage(){
    return(
       <>
          <div className='Gym-main-header'>
                <div className="breadcrumb">
                    <span>Gym &gt; Bibwewadi &gt; Glod’s Gym Magarpatta City</span>
                </div>

                <h1 className="gympage-name">Glod’s Gym Magarpatta City</h1>
                <div className="gym-location-rating">
                    <span>Bibwewadi</span>
                    <span>⭐ {4.3} (234 ratings)</span>
                </div>
            </div>
       
       </>
    )
}