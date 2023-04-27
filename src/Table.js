import React, { useState } from 'react';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';

export default ({ payments, className }) => {

  const [searchTerm, setSearchTerm] = useState("");

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


  return (
 <>
    <InputGroup className="mb-3" style={{"width" : "40rem"}}>
        <Form.Control
          placeholder="Search"
          onChange={e => setSearchTerm(e.target.value)}
        />
    </InputGroup>
    <Table striped bordered hover style={{"width" : "40rem"}}>
        <thead>
          <tr>
            <th>Years</th>
            <th>Interest</th>
            <th>Overpayment</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
        {output.rows.filter(data => {
          if(searchTerm!=="" && data.find(key => key === parseInt(searchTerm))){
            return data;
          }
          else if(searchTerm==="") return data
        }).map((row, index) => (
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
