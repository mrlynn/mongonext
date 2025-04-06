'use client';

/**
 * Modal component for displaying dialogs and popups
 * 
 * @param {object} props - Component props
 * @param {boolean} props.open - Controls whether the modal is visible
 * @param {function} props.onClose - Handler called when the modal should close
 * @param {string} [props.title] - Optional title shown in the modal header
 * @param {React.ReactNode} props.children - Content to display in the modal
 * @param {React.ReactNode} [props.actions] - Buttons or actions to show in the footer
 * @param {string} [props.maxWidth='sm'] - Controls the maximum width of the modal
 * @param {boolean} [props.fullWidth=true] - If true, the modal takes up the full width of its container
 * @param {boolean} [props.hideCloseIcon=false] - If true, hides the close icon in the header
 * @param {boolean} [props.preventBackdropClose=false] - If true, prevents closing when clicking the backdrop
 */

import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton, 
  Typography, 
  Box, 
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/*
Usage Example:

import Modal from '@/components/ui/Modal';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </>
        }
      >
        <Typography>Modal content goes here</Typography>
      </Modal>
    </>
  );
}
*/

const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  hideCloseIcon = false,
  preventBackdropClose = false,
  titleProps = {},
  contentProps = {},
  actionsProps = {}
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Handler for backdrop clicks
  const handleBackdropClick = (event) => {
    if (preventBackdropClose) {
      event.stopPropagation();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={preventBackdropClose ? undefined : onClose}
      onClick={handleBackdropClick}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      aria-labelledby={title ? 'modal-title' : undefined}
      PaperProps={{
        elevation: 3,
        sx: { borderRadius: 2 }
      }}
    >
      {title && (
        <DialogTitle
          id="modal-title"
          {...titleProps}
          sx={{ 
            pl: 3, 
            pr: 1, 
            py: 2,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...titleProps?.sx 
          }}
        >
          <Box component="span">{title}</Box>
          {!hideCloseIcon && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      
      <DialogContent 
        dividers 
        {...contentProps} 
        sx={{ 
          px: 3, 
          py: 2, 
          ...contentProps?.sx 
        }}
      >
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions 
          {...actionsProps} 
          sx={{ 
            px: 3, 
            py: 2, 
            ...actionsProps?.sx 
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;