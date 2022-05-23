import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAssetsSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssets } from './slice/selectors';

import Button from '@mui/material/Button';

import TablePagination from '@mui/material/TablePagination';

import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Notification } from './../../components/Notification';
import { ConfirmationDialog } from './../../components/ConfirmationDialog';
import { FormDialog } from './../../components/FormDialog';
import { List } from './../../components/List';
import { IUpdateAsset } from './slice/types';

const defaultLimit: number = 10;
const defaultOffset: number = 0;
const defaultAsset: IUpdateAsset = {
  id: 0,
  type: '',
  serial: '',
  color: '',
};

export function AssetsList() {
  const [page, setPage] = useState<number>(0);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState<boolean>(false);
  const [openFormDialog, setOpenFormDialog] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>('#ff0000');
  const [assetBeingProcessed, setAssetBeingProcessed] =
    React.useState<IUpdateAsset>(defaultAsset);
  const [limit, setLimit] = React.useState<number>(defaultLimit);
  const [offset, setOffset] = React.useState<number>(defaultOffset);

  const handleNotificationClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    dispatch(actions.removeNotification());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const onSubmit = (data?) => {
    data.color = color;
    if (assetBeingProcessed && assetBeingProcessed.id > 0) {
      let dirty = false;
      for (let field in data) {
        if (data[field] !== assetBeingProcessed[field]) {
          dirty = true;
        }
      }
      if (!dirty) {
        dispatch(actions.showErrorNotification('Asset data is not changed'));
        return;
      }
      data.id = assetBeingProcessed.id;
      dispatch(actions.updateAssetById(data));
      return;
    }
    dispatch(actions.addAsset(data));
  };

  const dispatch = useDispatch();
  const { actions } = useAssetsSlice();
  const {
    assets,
    count,
    showErrorNotification,
    showSuccessNotification,
    notificationMessage,
  } = useSelector(selectAssets);

  const getAssets = (
    limitParam: number | null = null,
    offsetParam: number | null = null,
  ) => {
    const parameters = {
      limit: limitParam === null ? limit : limitParam,
      offset: offsetParam === null ? offset : offsetParam,
    };
    dispatch(actions.getAssets(parameters));
  };

  useEffect(() => {
    getAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, actions, offset, limit]);

  useEffect(() => {
    if (showSuccessNotification) {
      resetForm();
      handleFormDialogClose();
      setAssetBeingProcessed(defaultAsset);
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationMessage]);

  const resetPage = () => {
    if (offset === defaultOffset) {
      getAssets(limit, 0);
      return;
    }
    setOffset(defaultOffset);
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    setOffset(newPage * limit);
  };

  const resetForm = () => {
    setColor('#ff0000');
    reset();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setLimit(newRowsPerPage);
    setOffset(0);
    setPage(0);
  };

  const handleConfirmationDialogOpen = (id: number) => {
    setOpenConfirmationDialog(true);
    const targetAsset = assets.filter(asset => id === asset.id);
    if (targetAsset && targetAsset.length > 0) {
      setAssetBeingProcessed(targetAsset[0]);
    }
  };

  const handleConfirmationDialogClose = (newValue?: boolean) => {
    setOpenConfirmationDialog(false);

    if (newValue) {
      dispatch(actions.deleteAssetById({ id: assetBeingProcessed.id }));
    }
  };

  const handleFormDialogOpen = (id?: number) => {
    setOpenFormDialog(true);
    if (id) {
      const targetAsset = assets.filter(asset => id === asset.id);
      if (!targetAsset || targetAsset.length < 1) {
        return;
      }
      setAssetBeingProcessed(targetAsset[0]);
      setValue('type', targetAsset[0].type);
      setValue('serial', targetAsset[0].serial);
      setValue('color', targetAsset[0].color);
      setColor(targetAsset[0].color);
    }
  };

  const handleFormDialogClose = () => {
    setOpenFormDialog(false);
    setAssetBeingProcessed(defaultAsset);
    resetForm();
  };

  return (
    <>
      <Helmet>
        <title>Assets</title>
        <meta
          name="description"
          content="An assets manager application homepage"
        />
      </Helmet>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{
            mb: 0,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          Assets Management
        </Typography>
        <Button
          variant="text"
          sx={{ p: 2 }}
          onClick={() => handleFormDialogOpen()}
        >
          <AddIcon />
          New Asset
        </Button>
      </Box>

      <List
        assets={assets}
        handleEdit={handleFormDialogOpen}
        handleDelete={handleConfirmationDialogOpen}
      />

      {!assets || assets.length < 1 ? null : (
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      <ConfirmationDialog
        id="asset-delete-confirmation"
        keepMounted
        open={openConfirmationDialog}
        onClose={handleConfirmationDialogClose}
        title="Are you sure?"
        content="Do you want to delete the asset?"
        option1="No"
        option2="Yes"
      />

      <FormDialog
        open={openFormDialog}
        onClose={handleFormDialogClose}
        setColor={setColor}
        color={color}
        id={assetBeingProcessed.id}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />

      <Notification
        openSuccessNotification={showSuccessNotification}
        openErrorNotification={showErrorNotification}
        notificationMessage={notificationMessage}
        handleNotificationClose={handleNotificationClose}
      />
    </>
  );
}
