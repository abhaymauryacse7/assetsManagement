/**
 *
 * FormDialog
 *
 */
import React, { memo } from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { SketchPicker, Color } from 'react-color';

import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  onClose: () => void;
  errors: { [x: string]: any };
  setColor: (color: string) => void;
  color: string;
  id: number;
  register: (name: string, RegisterOptions?) => void;
  onSubmit: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

export const FormDialog = memo((props: Props) => {
  const {
    open,
    onClose,
    setColor,
    color,
    id,
    register,
    errors,
    onSubmit,
    handleSubmit,
  } = props;

  const changeColor = (color: Color) => {
    if (!color.hex) {
      return;
    }
    setColor(color.hex);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{id ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="type"
            label="Type"
            type="text"
            fullWidth
            variant="standard"
            {...register('type', { required: 'Type is required.' })}
            error={Boolean(errors.type)}
            helperText={errors.type?.message}
          />
          <TextField
            margin="dense"
            id="serial"
            label="Serial"
            type="text"
            fullWidth
            variant="standard"
            {...register('serial', { required: 'Serial is required.' })}
            error={Boolean(errors.serial)}
            helperText={errors.serial?.message}
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            variant="standard"
            {...register('color', { required: 'Color is required.' })}
            error={Boolean(errors.color)}
            helperText={errors.color?.message}
            InputProps={{
              readOnly: true,
            }}
            value={color}
          />
          <SketchPicker
            color={color}
            onChangeComplete={changeColor}
            disableAlpha={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">{id ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
