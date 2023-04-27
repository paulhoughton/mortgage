import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const mortageTable = ({ payments, className }) => {

  let output = payments
    .filter((year, i) => i > 0 && (year.balance > 0 || year.interestYearly > 0))
    .reduce(
      (acc, year, index) => ({
        interestTotal: acc.interestTotal + year.interestYearly,
        overpaymentTotal: acc.overpaymentTotal + year.overpayment,
        rows: [
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

  console.log(output)

  const [searchTerm, setSearchTerm] = useState("");

//   const filteredData = output.filter(
//     (data) =>
//       data.years
//         .toString()
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       data.interest
//         .toString()
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       data.overpayment
//         .toString()
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       data.balance
//         .toString()
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Years</th>
            <th>Interest</th>
            <th>Overpayment</th>
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
      </Table>
    </>
  );
};

export default mortageTable;
