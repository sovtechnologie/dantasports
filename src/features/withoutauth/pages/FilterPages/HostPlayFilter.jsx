import styled from "../../Stylesheets/Filterpages/HostPlayFilter.module.css";
import SortSection from "../../components/SortSection";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchHostList } from "../../../../hooks/Hostlist/useFetchHostList"
import { VenueListShimmer } from "../../components/Shimmer/VenueListShimmer";
import AppDownloadBanner from "../../components/AppDownloadBanner";
import { HostCard } from "../../components/HostCard";
import gameImage from "../../assets/gameImage.png";
import gameImage1 from "../../assets/gameImage1.png";


// Formats "15:00", "15:00:30" → "03:00 PM"
function formatTime(timeStr = "00:00") {
    if (!timeStr) return "";  // Return an empty string or suitable default

    const parts = timeStr.split(':');
    const h = Number(parts[0] || 0);
    const m = Number(parts[1] || 0);
    const s = parts.length > 2 ? Number(parts[2]) : 0;

    const dt = new Date();
    dt.setHours(h, m, s);

    return dt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}




export default function HostPlayFilterPage() {
    const { lat, lng } = useSelector((state) => state.location)
    const [hostList, setHostList] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});

    const { data: AllHostdata, isLoading, isError, error } = useFetchHostList({ lat, lng });


    const handleReset = () => {
        setSearch('');
        setFilters({});
    };

    useEffect(() => {
        if (AllHostdata?.status === 200) {
            setHostList(AllHostdata.result);
        }
    }, [AllHostdata]);
    console.log(hostList)

    if (isLoading) return <div> <VenueListShimmer /></div>;
    if (isError) return <div>Error loading hosts: {error.message}</div>;


    return (
        <>
            <div className={styled.host_filter_container}>

                <aside className={styled.event_filter_sidebar}>
                    <SortSection
                        filters={filters}
                        setFilters={setFilters}
                        search={search}
                        setSearch={setSearch}
                        handleReset={handleReset}
                    />
                </aside>

                <section className={styled.host_grid}>
                    {hostList.map((host) => {
                        const formatttedHost = {
                            id: host?.id,
                            type: host?.activity_type,
                            host: host?.host_name,
                            hostImage: host?.host_image,
                            address: host?.full_address,
                            distance: host?.distance_km,
                            city: host?.city,
                            state: host?.state,
                            totalPlayer: host?.total_players,
                            startTime: host?.start_time,
                            endTime: host?.end_time,
                            attendees: host?.going,
                            date: `${new Date(host?.date).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short'
                            })} | ${formatTime(host?.start_time)}‑${formatTime(host?.end_time.slice(0, 5))}`,
                            skill: host?.game_skill,
                            attendeesAvatars: host?.userProfile_image||[{profile_image:gameImage},{profile_image:gameImage1}]

                        };
                        return (
                            <HostCard
                                host={formatttedHost}
                            />

                        )
                    })}

                </section>
            </div>

            <div className={styled.event_footer_banner}>
                <AppDownloadBanner />
            </div>
        </>
    )
}