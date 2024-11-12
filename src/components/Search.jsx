import { useRef, useState } from 'react';
import './Search.css';

function Search({ setLocationId }) {
	const [error, setError] = useState('');
	const inputRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();

		const id = parseInt(inputRef.current.value);

		if (isNaN(id)) {
			setError('You must provide a valid number 🥺');
			setTimeout(() => {
				setError('');
			}, 4000);
			return;
		}

		if (id < 1 || id > 126) {
			setError('Hey! You must provide a number from 1 to 126 🥺');
			setTimeout(() => {
				setError('');
			}, 4000);
			return;
		}

		setLocationId(id);
		e.target.reset();
	};
	return (
		<>
			<form onSubmit={onSubmit} className="search">
				<input ref={inputRef} type="text" className="search__input" />
				<button className="search__btn">Search</button>
			</form>
			<p className="message__error"> {error && error}</p>
		</>
	);
}

export default Search;
