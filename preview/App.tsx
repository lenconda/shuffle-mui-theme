import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import AlarmIcon from '@mui/icons-material/Alarm';
import theme from '../src';
import './App.css';
import HorizontalTabs from './components/Tabs/Horizontal';
import VerticalTabs from './components/Tabs/Vertical';
import BasicDatePicker from './components/DatePickers/Basic';
import DatePicker from './components/DatePickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const App: React.FC = () => {
    const [checkedState, setCheckedState] = useState([false, false]);
    const [dialogState, setDialogState] = useState([false]);

    const generateDialogState = (stateList: boolean[], index: number, state: boolean) => {
        const newStateList = Array.from(stateList);
        newStateList.splice(index, 1, state);
        return newStateList;
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst={true}>
                <div style={{ padding: 10 }}>
                    <h3>Buttons</h3>
                    <Button variant="contained">Contained</Button>&nbsp;
                    <Button variant="outlined">Outlined</Button>&nbsp;
                    <Button variant="text">Text</Button>
                    <br />
                    <br />
                    <Button disabled={true} variant="contained">Contained</Button>&nbsp;
                    <Button disabled={true} variant="outlined">Outlined</Button>&nbsp;
                    <Button disabled={true} variant="text">Text</Button>
                    <br /><br />
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup variant="text" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                    <br /><br />
                    <ButtonGroup disabled={true} variant="contained" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup disabled={true} variant="outlined" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup disabled={true} variant="text" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                    <br /><br />
                    <IconButton>
                        <AlarmIcon />
                    </IconButton>&nbsp;
                    <IconButton disabled={true}>
                        <AlarmIcon />
                    </IconButton>
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Tabs</h3>
                    <HorizontalTabs />
                    <VerticalTabs />
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Date Pickers</h3>
                    <BasicDatePicker />
                    <br /><br />
                    <DatePicker />
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Text Fields</h3>
                    <TextField placeholder="Text Field" id="outlined-basic" variant="outlined" />
                    <br /><br />
                    <TextField placeholder="Text Field" disabled={true} id="outlined-basic" variant="outlined" />
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Checkboxes</h3>
                    <FormControlLabel
                        label="Parent"
                        control={
                            <Checkbox
                                checked={checkedState[0] && checkedState[1]}
                                indeterminate={checkedState[0] !== checkedState[1]}
                                onChange={(event) => setCheckedState([event.target.checked, event.target.checked])}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Child 1"
                        control={
                            <Checkbox
                                checked={checkedState[0]}
                                onChange={(event) => setCheckedState([event.target.checked, checkedState[1]])}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Child 2"
                        control={
                            <Checkbox
                                checked={checkedState[1]}
                                onChange={(event) => setCheckedState([checkedState[0], event.target.checked])}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Child 3"
                        control={
                            <Checkbox disabled={true} />
                        }
                    />
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Radios</h3>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} disabled={true} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Switches</h3>
                    <Switch size="small" />
                    <Switch size="small" disabled={true} checked={true} />
                    <Switch size="small" disabled={true} checked={false} />
                    <br /><br />
                    <Switch />
                    <Switch disabled={true} checked={true} />
                    <Switch disabled={true} checked={false} />
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Dialogs</h3>
                    <div>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setDialogState(generateDialogState(dialogState, 0, true));
                            }}
                        >
                            Open alert dialog
                        </Button>
                        <Dialog
                            open={dialogState[0]}
                            onClose={() => {
                                setDialogState(generateDialogState(dialogState, 0, false));
                            }}
                            scroll="paper"
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Use Google&lsquo;s location service?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {
                                        new Array(100).fill(null).map((value, index) => {
                                            return 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.';
                                        })
                                    }
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => {
                                        setDialogState(generateDialogState(dialogState, 0, false));
                                    }}
                                >
                                    Disagree
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDialogState(generateDialogState(dialogState, 0, false));
                                    }}
                                    autoFocus={true}
                                    variant="contained"
                                >
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </StyledEngineProvider>
        </ThemeProvider>
    );
};

export default App;
