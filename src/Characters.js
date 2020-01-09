import React from 'react';
import Char from './Char';

const Characters = ({ actors }) =>{
	return (
		<div>
		{
			actors.map((act,i) => {
				return (
					<Char 
						key={i} 
						id={act.name} 
						name={act.name} 
						height={act.height}
					/>
				);
			})
		}	
		</div>
	);
}

export default Characters;