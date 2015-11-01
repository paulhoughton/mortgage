import React from 'react';

const border="#428bca solid 1px";

export default ({headings, rows, totals})=> (
	<table>
		<thead>
			<tr style={{borderBottom:border}}>
				{headings.map((d,i)=><th key={i}>{d}</th>)}
			</tr>
		</thead>
		<tbody>
			{rows.map((row,index)=>{
				return (<tr key={index}>
					{row.map((d,i)=><td key={i}>{d}</td>)}
				</tr>)})
			}
			<tr style={{borderTop:border}}>
				{totals.map((d,i)=><td key={i}>{d}</td>)}
			</tr>
		</tbody>
	</table>
);
