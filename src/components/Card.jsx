import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import ResidentsList from './ResidentsList';
import Search from './Search';
import './Card.css';

function Card() {
	const [location, setLocation] = useFetch();
	const [locationId, setLocationId] = useState(1);

	useEffect(() => {
		setLocation(`https://rickandmortyapi.com/api/location/${locationId}`);
	}, [locationId]);
	return (
		<div className="container">
			<Search setLocationId={setLocationId} />
			<InfoCard location={location} />
			<ResidentsList residents={location?.residents} />
		</div>
	);
}

export default Card;
