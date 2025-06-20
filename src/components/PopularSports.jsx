import React from 'react';
import './StyleSheets/PopularSports.css'; // Assuming you have a CSS file for styling
// import sports from "../StaticData/PopularSporsData" // your data file or replace with static list
import { useQuery } from '@tanstack/react-query';
import { fetchSportList } from "../services/withoutLoginApi/SportListApi/endpointApi.js";
import Football from "../assets/PopularSportLogo/Football.png";

const PopularSports = () => {

  console.log("Running PopularSports component");

  const { data, isLoading, isError } = useQuery({
    queryKey: ['sports'],
    queryFn: () => fetchSportList(),
    retry:1,
  });

  const sports = data?.result || [];


  if (isLoading) return <p>Loading sports...</p>;
  console.log("error",isError);
  if (isError) return <p>Error loading sports data.</p>;

  return (
    <section className="popular-sports">
      <h3 className="section-title">Popular Sport Collections</h3>
      <div className="sport-buttons">
        {sports.map((sport, index) => (
          <button className="sport-button" key={sport.id}>
           <img
              src={sport.sports_images || Football }
              alt={sport.sports_name}
              onError={(e) => e.target.src = "/default-icon.png"}
            />
            <span>{sport.sports_name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PopularSports;
