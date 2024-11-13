import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import ResidentsList from './ResidentsList';
import Search from './Search';
import './Card.css';

function Card() {
	const [location, setLocation, loading, error] = useFetch();
	const [locationId, setLocationId] = useState(1);

	const [page, setPage] = useState(1);
	const itemsPerPage = 8;
	const totalItems = location ? location?.residents.length : 0;
	const maxPage = Math.ceil(totalItems / itemsPerPage);

	useEffect(() => {
		setLocation(`https://rickandmortyapi.com/api/location/${locationId}`);
	}, [locationId]);

	const onPrev = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const onNext = () => {
		if (page < maxPage) {
			setPage(page + 1);
		}
	};

	const onClickPage = (newPage) => {
		setPage(newPage);
	};

	const items = [];

	for (let i = 1; i <= maxPage; i++) {
		items.push(i);
	}

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
					<div className="btns">
						<button onClick={onPrev} disabled={page === 1}>
							Previous
						</button>
						{items.map((item, index) => (
							<button
								key={index}
								onClick={() => onClickPage(item)}
								disabled={page === item}
							>
								{item}
							</button>
						))}
						<button onClick={onNext} disabled={page === maxPage}>
							Next
						</button>
					</div>
					<p className="btns__info">
						{page} / {maxPage}
					</p>
					<br></br>
					<ResidentsList
						residents={location?.residents}
						page={page}
						itemsPerPage={itemsPerPage}
					/>
				</>
			)}
		</div>
	);
}

export default Card;
