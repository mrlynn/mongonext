import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Typography, Box } from '@mui/material';

export default {
  title: 'Components/UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    maxWidth: {
      control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    },
    fullWidth: { control: 'boolean' },
    hideCloseIcon: { control: 'boolean' },
    preventBackdropClose: { control: 'boolean' },
  },
};

// Basic Modal
export const Default = (args) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>Submit</Button>
          </>
        }
      >
        <Typography>This is a basic modal example</Typography>
      </Modal>
    </>
  );
};

// Form Modal
export const FormModal = (args) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Form Modal
      </Button>
      
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title="Registration Form"
        maxWidth="md"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>Submit</Button>
          </>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1">
            Form fields would go here. This demonstrates a larger modal with a form layout.
          </Typography>
          {/* Form fields would go here */}
        </Box>
      </Modal>
    </>
  );
};