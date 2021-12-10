import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import Typography from "@mui/material/Typography";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
  //  visible:boolean
  title: string;
  handleCloseFn?: any;
  actionFn?: any;
  task?: any;
}
const Modal: React.FC<ModalProps> = (props) => {
  const { title, task, handleCloseFn, actionFn } = props;
  const [open, setOpen] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  React.useEffect(() => {});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseFn(false);
  };
  const handleComplete = () => {
    console.log("lert-dialog-slide-des", task);
    setSuccess(true);
    actionFn(task);
  };
  return (
    <div key={`${title}+"div"`}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
        <Typography gutterBottom variant="h2" component="div">
                Task 
              </Typography>
              taskID: {task.UUiD}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {task.Title}
            {success && (
              <Typography gutterBottom variant="h2" component="div">
                Task Completed!
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleComplete}>Mark Completed</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
