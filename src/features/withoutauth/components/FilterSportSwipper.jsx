import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Grid, Navigation } from 'swiper/modules';
import "./Stylesheets/FilterSportSwipper.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import 'swiper/css/navigation';



export default function FilterSportSwipper({ SportsData, selectedSport, setSelectedSport }) {
    return (
        <Swiper
            modules={[Pagination, Grid, Navigation]}
            slidesPerView={3}
            grid={{ rows: 2, fill: 'row' }}
            spaceBetween={16}
            pagination={{ clickable: true }}
            // navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', disabledClass: 'swiper-button-disabled' }}
            // watchOverflow={true}
            breakpoints={{
                0: { slidesPerView: 1, grid: { rows: 2 } },
                640: { slidesPerView: 2, grid: { rows: 2 } },
                1024: { slidesPerView: 3, grid: { rows: 2 } },
            }}
        >
            {SportsData.map((sport, id) => (
                <SwiperSlide key={id}>
                    <div className={`sport-item ${selectedSport === sport.sports_name ? 'active-sport' : ''}`}
                        onClick={() => setSelectedSport(sport.sports_name)}>
                        <img src={sport.sports_images} alt={sport.sports_name} />
                        <p className='filter-sport-name'>{sport.sports_name}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
