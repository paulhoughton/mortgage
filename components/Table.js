export default ({headings, rows, totals, className})=> (
	<table className={className}>
		<thead>
			<tr>
				{headings.map((d,i)=><th key={i}>{d}</th>)}
			</tr>
		</thead>
		<tbody>
			{rows.map((row,index)=>(
					<tr key={index}>
						{row.map((d,i)=><td key={i}>{d.toLocaleString()}</td>)}
					</tr>)
				)
			}
		</tbody>
		<tfoot>
			<tr>
				{totals.map((d,i)=><td key={i}>{d.toLocaleString()}</td>)}
			</tr>
		</tfoot>
	</table>
);
