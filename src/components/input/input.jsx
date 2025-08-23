import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({className, width, ...props}, ref) => {

	return (
		<input className={className} {...props} ref={ref}/>
	);
});

export const Input = styled(InputContainer)`
	width: ${({width = '100%'}) => width};
	height: 40px;
	font-size: 18px;
	margin: 0 0 10px;
	padding: ${({padding = '0'}) => padding};
	border: 1px solid #000;
	border-radius: 5px;
`;