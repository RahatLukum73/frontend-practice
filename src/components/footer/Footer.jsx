import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Temperature = styled.div`
display: inline-block;
background-color: #bbb;
color: #fff;
padding:0 5px;
border: 1px solid #999;
border-radius: 5px;

`;

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=Ulyanovsk&units=metric&lang=ru&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{temperature}°, {weather}
				</div>
				<div>
					<Temperature>{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}</Temperature>{' '}
					{city}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	font-weight: bold;
	height: 120px;
	box-shadow: 0 0 10px #000;
	align-items: center;
	padding: 20px 40px;
`;
