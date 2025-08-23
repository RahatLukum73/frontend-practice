import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({searchFrase, className, onChange}) => {
	return (
		<div className={className}>
			<Input
			value={searchFrase}
			onChange={onChange}
			placeholder="Поиск по заголовкам..."
			padding="0 35px 0 10px"
			/>
			<Icon
			inactive={true}
			id="fa-search"
			margin="1px 0 0 -30px"
			size="22px"
			/>
		</div>
	)
};

export const Search = styled(SearchContainer)`
	display: flex;
	width: 340px;
	height: 40px;
	margin:40px auto 0;
	position: relative;

`;