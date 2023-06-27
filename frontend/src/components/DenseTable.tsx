import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DenseTable({rows, columns}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            { columns.map((col, colIndex)=> (
              <TableCell key={colIndex} align={col.align ?? 'inherit'}>{col.text ?? col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              { columns.map((col, colIndex) => (
                <React.Fragment key={colIndex}>
                    {colIndex ? (
                        <td align={col.align ?? 'inherit'}>{col.text ?? col}</td>
                    ) : (
                        <th scope="row" align={col.align ?? 'inherit'}>{col.text ?? col}</th>
                    )}
                </React.Fragment>
            // <TableCell key={colIndex} align={col.align ?? 'inherit'} component={colIndex ? undefined : 'th'} scope={colIndex ? '' : 'row'}>
            //       {row[col.prop]}
            //     </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}