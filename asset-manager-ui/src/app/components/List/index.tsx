/**
 *
 * List
 *
 */
import React, { memo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IAsset } from './../../pages/AssetsList/slice/types';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  assets: IAsset[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export interface EditPropsInterface {
  handleDialogOpen: () => void;
}

const Edit = (props: EditPropsInterface) => {
  return (
    <IconButton onClick={props.handleDialogOpen}>
      <EditIcon color="primary" />
    </IconButton>
  );
};

export interface DeletePropsInterface {
  id: number;
  handleConfirmationDialogOpen: (id: number) => void;
}

const Delete = (props: DeletePropsInterface) => {
  return (
    <IconButton onClick={e => props.handleConfirmationDialogOpen(props.id)}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};

export const List = memo((props: Props) => {
  const { assets, handleEdit, handleDelete } = props;

  if (!assets || assets.length < 1) {
    return <h2>Assets List is empty</h2>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Serial</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map(asset => (
            <TableRow
              key={asset.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {asset.type}
              </TableCell>
              <TableCell align="right">{asset.color}</TableCell>
              <TableCell align="right">{asset.serial}</TableCell>
              <TableCell align="right">
                <Edit handleDialogOpen={() => handleEdit(asset.id)} />
                <Delete
                  handleConfirmationDialogOpen={id => handleDelete(id)}
                  id={asset.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
