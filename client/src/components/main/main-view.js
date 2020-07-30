import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../voldemort.png';
import '../../App.css';
import './main-view.css';
import DialogView from '../utils/dialog';

const Main = (props) => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState('horcruxify');


  const handleOpenHorcruxify = () => {
    setVariant('horcruxify');
    setOpen(true);
  }

  const handleOpenDeHorcruxify = () => {
    setVariant('de-horcruxify');
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
        <div class="container">
            <img src={logo} alt="logo" className="App-logo" />
            <div class="button-container">
                <span class="base-button">
                  <Button style={{backgroundColor:'#253814'}} variant="contained" color="primary" onClick={handleOpenHorcruxify}>Horcruxify</Button>
                </span>
                <span>
                  <Button style={{backgroundColor:'#253814'}} variant="contained" color="primary" onClick={handleOpenDeHorcruxify}>De-Horcruxify</Button>
                </span>
                

                <DialogView 
                    onClose={handleClose}
                    {...{open, variant}}
                />
            </div>
            
        </div>
    );
};

export default Main;