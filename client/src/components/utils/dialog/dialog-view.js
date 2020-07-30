import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './dialog-view.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getProperties = variant => {
    switch(variant) {
        case 'horcruxify':
            return {
              title: 'Horcruxify', 
              uploadText: 'Upload a file', 
              submitText: 'Horcruxify',
              passwordLabel: 'Enter a strong password',
              passwordAlert: 'This password will be used as the key for encrypting the file. Do not forget it.',
              validationErrorText: 'You must give both password and a file to make it work!!!'
            };
        case 'de-horcruxify':
            return {
              title: 'De-Horcruxify', 
              uploadText: 'Upload all 7 horcrux files', 
              submitText: 'De-Horcruxify',
              passwordLabel: 'Enter the password',
              passwordAlert: 'The password you entered when you made the horcruxes. Wrong password won\'t retrieve the original file',
              validationErrorText: 'You must give both password and all 7 horcrux files to make it work!!!'
            };
        default:
            return {};
    }
}

const DialogView = (props) => {
  
  const {open, variant, onClose, onUpload} = props;

  const properties = getProperties(variant);
  const [selectedFile, setSelectedFile] = useState({selectedFile: null});
  const [password, setPassword] = useState(null);
  const [requiredFieldMissing, setRequiredFieldMissing] = useState(false);

  const onChangeHandler = event => {
    if(variant === 'horcruxify'){
      const file = event.target.files[0];
      setSelectedFile({selectedFile: file, loaded: 0});
    }
    else{
      setSelectedFile({selectedFile: event.target.files})
    }
  };

  const handleUpload = async () => {
    if(variant === 'horcruxify' && (!selectedFile.selectedFile || !password)){
      setRequiredFieldMissing(true);
      return;
    }
    if(variant === 'de-horcruxify' && (!selectedFile.selectedFile || selectedFile.selectedFile.length < 7 || !password)){
      setRequiredFieldMissing(true);
      return;
    }
    setRequiredFieldMissing(false);
    await onUpload(selectedFile, password, variant);
    handleClose();
  };

  const passwordOnChange = event => {
    const pass = event.target.value;
    setPassword(pass);
  }

  const handleUploadWrapperClick = (event) => {
    document.getElementById('hiddenFileInput').click();
  }

  const handleClose = () => {
    setRequiredFieldMissing(false);
    setSelectedFile({selectedFile: null});
    setPassword(null);
    onClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{backgroundColor: '#EEE9E9', color: '#330000'}}  id="alert-dialog-slide-title">{properties.title}</DialogTitle>
        <Divider />
        <DialogContent style={{backgroundColor: '#EEE9E9', color: '#330000'}}>
          {requiredFieldMissing && (
            <DialogContentText style={{color: 'red', fontStyle: 'bold', fontSize: '1rem'}}>
              {properties.validationErrorText}
            </DialogContentText>
          )}

          <Button variant="contained" color="primary" onClick={handleUploadWrapperClick}>{properties.uploadText}</Button>
          {variant === 'horcruxify' ? (
            <input id="hiddenFileInput" type="file" name="file" onChange={onChangeHandler} style={{display: 'none'}}/>
            ) : (
              <input id="hiddenFileInput" type="file" name="file" multiple onChange={onChangeHandler} style={{display: 'none'}}/>
            )
          }
          {variant === 'horcruxify' && selectedFile.selectedFile && (
            <span style={{marginLeft: '10px'}}>
              {selectedFile.selectedFile.name}
            </span>
          )}
          {variant === 'de-horcruxify' && selectedFile.selectedFile  && (
            <span style={{marginLeft: '10px'}}>
              {selectedFile.selectedFile.length} files
            </span>
          )}

          <div>
            <TextField id="standard-basic" margin="dense" label={properties.passwordLabel} type="password" fullWidth onChange={passwordOnChange} />
            <DialogContentText style={{color: 'red', fontStyle: 'italic', fontSize: '.8rem'}}>{properties.passwordAlert}</DialogContentText>
          </div>
          
        </DialogContent>
        <DialogActions style={{backgroundColor: '#EEE9E9', color: 'white'}}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="outlined" color="primary">
            {properties.submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogView
