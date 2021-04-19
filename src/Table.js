import React from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';

export default ({ payments, className }) => {
  const { actualTable } = useFlags();

  let output = payments
    .filter((year, i) => i > 0 && (year.balance > 0 || year.interestYearly > 0))
    .reduce(
      (acc, year, index) => ({
        interestTotal: acc.interestTotal + year.interestYearly,
        overpaymentTotal: acc.overpaymentTotal + year.overpayment,
        rows: actualTable ? 
        [
          ...acc.rows,
          [
            year.partial ? year.partial + 'm' : index + 1,
            Math.round(year.interestYearly || 0),
            Math.round(year.overpayment),
            Math.round(year.actual || 0), 
            Math.round(year.balance)
          ]
        ] :
        [
          ...acc.rows,
          [
            year.partial ? year.partial + 'm' : index + 1,
            Math.round(year.interestYearly || 0),
            Math.round(year.overpayment), 
            Math.round(year.balance)
          ]
        ]
      }),
      { interestTotal: 0, overpaymentTotal: 0, rows: [] }
    );

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>Years</th>
          <th>Interest</th>
          <th>Overpayment</th>
          { actualTable ? <th>Actual</th> : null}
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {output.rows.map((row, index) => (
          <tr key={index}>
            {row.map((d, i) => (
              <td key={i}>{d.toLocaleString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>
            {Math.round(output.interestTotal).toLocaleString()}
          </td>
          <td>{Math.round(output.overpaymentTotal).toLocaleString()}</td>
          <td />
        </tr>
      </tfoot>
    </table>
  );
};
