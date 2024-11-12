import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import ResidentsList from './ResidentsList';
import Search from './Search';
import './Card.css';

function Card() {
	const [location, setLocation, loading, error] = useFetch();
	const [locationId, setLocationId] = useState(1);

	useEffect(() => {
		setLocation(`https://rickandmortyapi.com/api/location/${locationId}`);
	}, [locationId]);
	return (
		<div className="container">
			{loading ? (
				<div>
					<img src="/load-rym.gif" alt="loadrym" className="load__rym" />
				</div>
			) : error ? (
				<h2 className="err__rym">
					<img className="imgerr__rym" src="/err-rym.webp" alt="errrym" />
					<p className="texterr">{error}</p>
				</h2>
			) : (
				<>
					<Search setLocationId={setLocationId} />
					<InfoCard location={location} />
					<ResidentsList residents={location?.residents} />
				</>
			)}
		</div>
	);
}

export default Card;
