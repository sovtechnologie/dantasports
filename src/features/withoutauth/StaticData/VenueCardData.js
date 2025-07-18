
import image from "../assets/image.png";
import CricketLogo from "../assets/VenueCardLogo/CricketLogo.png";
import FootballLogo from "../assets/VenueCardLogo/FootballLogo.png";

const VenueCardData = [
    {
        name: 'Red Meadows',
        address: 'Adoor bypass road',
        distance: '0.7',
        rating: 4.0,
        reviews: 175,
        image: image,
        offer: 'Upto 50% off',
        price: '₹1000',
        sportsIcons: [CricketLogo, FootballLogo],
    },
    {
        name: 'Shuttle Kings',
        address: 'Link Road, Sector 22',
        distance: '1.2',
        rating: 4.5,
        reviews: 120,
        image: image,
        offer: 'Flat 10% off',
        price: '₹800',
        sportsIcons: [CricketLogo],
    },
    {
        name: 'Goal Arena',
        address: 'Metro Park Avenue',
        distance: '2.0',
        rating: 4.7,
        reviews: 210,
        image: image,
        offer: '30% off Today',
        price: '₹900',
        sportsIcons: [FootballLogo],
    },
    {
        name: 'Smash Court',
        address: 'New Street, Phase 3',
        distance: '1.5',
        rating: 4.3,
        reviews: 150,
        image: image,
        offer: 'Limited 20% Off',
        price: '₹700',
        sportsIcons: [CricketLogo],
    },
    {
        name: 'Cricket Hub',
        address: 'Ring Road, Block D',
        distance: '3.2',
        rating: 4.1,
        reviews: 90,
        image: image,
        offer: 'Weekend Offer',
        price: '₹600',
        sportsIcons: [FootballLogo],
    },
    {
        name: 'Volley Heights',
        address: 'Hill View Colony',
        distance: '2.5',
        rating: 4.6,
        reviews: 190,
        image: image,
        offer: 'Buy 1 Get 1',
        price: '₹750',
        sportsIcons: ['/assets/icons/volleyball.png'],
    },
    {
        name: 'Arena X',
        address: 'City Tower Lane',
        distance: '1.8',
        rating: 4.2,
        reviews: 135,
        image: image,
        offer: 'Opening Discount 25%',
        price: '₹1100',
        sportsIcons: ['/assets/icons/football.png'],
    },
    {
        name: 'Turf Nation',
        address: 'Palm Drive East',
        distance: '0.9',
        rating: 4.0,
        reviews: 80,
        image: image,
        offer: '20% Off',
        price: '₹850',
        sportsIcons: ['/assets/icons/football.png'],
    },
    {
        name: 'Smash Arena',
        address: 'Vasant Enclave',
        distance: '1.6',
        rating: 4.8,
        reviews: 250,
        image: image,
        offer: 'Early Bird Offer',
        price: '₹950',
        sportsIcons: ['/assets/icons/badminton.png'],
    },
    {
        name: 'Playbox',
        address: 'Green Belt Area',
        distance: '2.3',
        rating: 3.9,
        reviews: 60,
        image: image,
        offer: 'Flat ₹100 Off',
        price: '₹650',
        sportsIcons: ['/assets/icons/basketball.png'],
    },
    {
        name: 'City Turf',
        address: 'Town Centre',
        distance: '1.1',
        rating: 4.4,
        reviews: 100,
        image: image,
        offer: 'Festival Discount',
        price: '₹1000',
        sportsIcons: ['/assets/icons/cricket.png', '/assets/icons/football.png'],
    },
    {
        name: 'Rally Zone',
        address: 'River View Road',
        distance: '2.6',
        rating: 4.6,
        reviews: 130,
       image: image,
        offer: 'Student Offer',
        price: '₹600',
        sportsIcons: ['/assets/icons/tennis.png'],
    },
    {
        name: 'The D Court',
        address: 'Liberty Lane',
        distance: '0.5',
        rating: 4.9,
        reviews: 310,
       image: image,
        offer: '50% Today Only',
        price: '₹1200',
        sportsIcons: ['/assets/icons/badminton.png'],
    },
    {
        name: 'Power Turf',
        address: 'Sunset Blvd',
        distance: '3.3',
        rating: 4.2,
        reviews: 90,
       image: image,
        offer: 'Combo Offer',
        price: '₹700',
        sportsIcons: ['/assets/icons/football.png'],
    },
    {
        name: 'CrickZone',
        address: 'Near School Ground',
        distance: '0.8',
        rating: 4.1,
        reviews: 77,
        image: image,
        offer: 'Flat 15%',
        price: '₹500',
        sportsIcons: ['/assets/icons/cricket.png'],
    },
    {
        name: 'Badminton Den',
        address: 'Yoga Enclave',
        distance: '1.9',
        rating: 4.4,
        reviews: 142,
        image: image,
        offer: 'Doubles 25% Off',
        price: '₹950',
        sportsIcons: ['/assets/icons/badminton.png'],
    },
    {
        name: 'MultiPlay Hub',
        address: 'Dream City',
        distance: '3.0',
        rating: 4.3,
        reviews: 187,
       image: image,
        offer: 'Group Bookings 30%',
        price: '₹1050',
        sportsIcons: ['/assets/icons/football.png', '/assets/icons/tennis.png'],
    },
    {
        name: 'Rink Central',
        address: 'Ice Ring Road',
        distance: '4.1',
        rating: 4.5,
        reviews: 200,
       image: image,
        offer: '20% on First Book',
        price: '₹1100',
        sportsIcons: ['/assets/icons/hockey.png'],
    },
    {
        name: 'Game On',
        address: 'Stadium Corner',
        distance: '2.0',
        rating: 4.0,
        reviews: 110,
        image: image,
        offer: 'Flash Sale!',
        price: '₹800',
        sportsIcons: ['/assets/icons/basketball.png'],
    },
    {
        name: 'Goal Ground',
        address: 'North Street',
        distance: '2.2',
        rating: 4.1,
        reviews: 80,
        image: image,
        offer: 'Flat 5%',
        price: '₹880',
        sportsIcons: ['/assets/icons/football.png'],
    },
    {
        name: 'Kickstart',
        address: 'Main Avenue',
        distance: '1.7',
        rating: 4.6,
        reviews: 222,
       image: image,
        offer: 'Opening Week Deal',
        price: '₹1050',
        sportsIcons: ['/assets/icons/football.png'],
    },
    {
        name: 'Arena Lite',
        address: 'Lake Road',
        distance: '3.1',
        rating: 4.3,
        reviews: 98,
        image: image,
        offer: 'Last Minute 20%',
        price: '₹720',
        sportsIcons: ['/assets/icons/tennis.png'],
    },
    {
        name: 'CourtSide',
        address: 'Elite Area',
        distance: '0.6',
        rating: 4.5,
        reviews: 150,
       image: image,
        offer: 'Night Game Offer',
        price: '₹990',
        sportsIcons: ['/assets/icons/badminton.png'],
    },
    {
        name: 'HitZone',
        address: 'Zirakpur Main',
        distance: '2.4',
        rating: 4.0,
        reviews: 65,
       image: image,
        offer: 'Evening Pass',
        price: '₹670',
        sportsIcons: ['/assets/icons/cricket.png'],
    },
    {
        name: 'Turf World',
        address: 'Block B, Industrial',
        distance: '1.4',
        rating: 4.7,
        reviews: 240,
       image: image,
        offer: 'Combo Discount',
        price: '₹890',
        sportsIcons: ['/assets/icons/football.png'],
    },
    {
        name: 'Playhouse',
        address: 'College Lane',
        distance: '2.9',
        rating: 3.8,
        reviews: 45,
      image: image,
        offer: 'Special Youth Offer',
        price: '₹610',
        sportsIcons: ['/assets/icons/basketball.png'],
    },
    {
        name: 'Gameport',
        address: 'Tech Park Zone',
        distance: '3.6',
        rating: 4.6,
        reviews: 180,
       image: image,
        offer: 'Flat ₹150 Off',
        price: '₹940',
        sportsIcons: ['/assets/icons/tennis.png'],
    },
   
];

export default VenueCardData;