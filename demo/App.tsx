import React, {
    useEffect,
    useState,
} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {
    StyledEngineProvider,
    Theme,
} from '@mui/material/styles';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import { createShuffleTheme } from '../src';
import './App.css';
import HorizontalTabs from './components/Tabs/Horizontal';
import VerticalTabs from './components/Tabs/Vertical';
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
import AdvancedTransferList from './components/TransferList/Advanced';
import ToggleButtons from './components/ToggleButtons';
import Select from './components/Select';
import List from './components/List';
import Menu from './components/Menu';
import TreeView from './components/TreeView';

const App: React.FC = () => {
    const [checkedState, setCheckedState] = useState([false, false]);
    const [dialogState, setDialogState] = useState([false]);
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [theme, setTheme] = useState<Theme>(createShuffleTheme({
        muiTheme: {
            palette: {
                mode,
            },
        },
    }));

    useEffect(() => {
        setTheme(createShuffleTheme({
            muiTheme: {
                palette: {
                    mode,
                },
            },
        }));
    }, [mode]);

    const generateDialogState = (stateList: boolean[], index: number, state: boolean) => {
        const newStateList = Array.from(stateList);
        newStateList.splice(index, 1, state);
        return newStateList;
    };

    return (
        <div
            style={{
                boxSizing: 'border-box',
                padding: 20,
                backgroundColor: mode === 'dark' ? 'black' : 'white',
            }}
        >
            <ThemeProvider theme={theme}>
                <StyledEngineProvider injectFirst={true}>
                    <div style={{ padding: '20px 0' }}>
                        <FormControlLabel
                            label="Dark Mode"
                            control={
                                <Checkbox
                                    checked={mode === 'dark'}
                                    onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
                                />
                            }
                        />
                    </div>
                    <h3>Buttons</h3>
                    {
                        [
                            'primary',
                            'secondary',
                            'info',
                            'success',
                            'warning',
                            'error',
                        ].map((color: any, index) => {
                            return (
                                <div style={{ padding: 10 }} key={index}>
                                    <Button color={color} variant="contained">Contained</Button>&nbsp;
                                    <Button color={color} variant="outlined">Outlined</Button>&nbsp;
                                    <Button color={color} variant="text">Text</Button>
                                    <br />
                                    <br />
                                    <ButtonGroup color={color} variant="contained" aria-label="outlined primary button group">
                                        <Button color={color}>One</Button>
                                        <Button color={color}>Two</Button>
                                        <Button color={color}>Three</Button>
                                    </ButtonGroup>&nbsp;
                                    <ButtonGroup color={color} variant="outlined" aria-label="outlined primary button group">
                                        <Button color={color}>One</Button>
                                        <Button color={color}>Two</Button>
                                        <Button color={color}>Three</Button>
                                    </ButtonGroup>&nbsp;
                                    <ButtonGroup color={color} variant="text" aria-label="outlined primary button group">
                                        <Button color={color}>One</Button>
                                        <Button color={color}>Two</Button>
                                        <Button color={color}>Three</Button>
                                    </ButtonGroup>
                                </div>
                            );
                        })
                    }
                    <br /><br />
                    <Button disabled={true} variant="contained">Contained</Button>&nbsp;
                    <Button disabled={true} variant="outlined">Outlined</Button>&nbsp;
                    <Button disabled={true} variant="text">Text</Button>
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
                    {
                        [
                            'primary',
                            'secondary',
                            'info',
                            'success',
                            'warning',
                            'error',
                        ].map((color: any, index) => {
                            return (
                                <IconButton key={index} color={color}>
                                    <AlarmTwoToneIcon />
                                </IconButton>
                            );
                        })
                    }
                    <IconButton disabled={true}>
                        <AlarmTwoToneIcon />
                    </IconButton>
                    <div style={{ padding: 10 }}>
                        <h3>Toggle Buttons</h3>
                        <ToggleButtons />
                    </div>
                    <div style={{ padding: 10 }}>
                        <h3>Tabs</h3>
                        <HorizontalTabs />
                        <VerticalTabs />
                    </div>
                    <div style={{ padding: 10 }}>
                        <h3>Text Fields</h3>
                        <TextField size="small" placeholder="Text Field" id="outlined-basic" variant="outlined" />
                        <br /><br />
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
                        /><br />
                        <FormControlLabel
                            label="Child 1"
                            control={
                                <Checkbox
                                    checked={checkedState[0]}
                                    onChange={(event) => setCheckedState([event.target.checked, checkedState[1]])}
                                />
                            }
                        /><br />
                        <FormControlLabel
                            label="Child 2"
                            control={
                                <Checkbox
                                    checked={checkedState[1]}
                                    onChange={(event) => setCheckedState([checkedState[0], event.target.checked])}
                                />
                            }
                        /><br />
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
                                        color="primary"
                                    >
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    <div style={{ padding: 10 }}>
                        <h3>Transfer Lists</h3>
                        <AdvancedTransferList />
                    </div>
                    <div style={{ padding: 10 }}>
                        <h3>Select</h3>
                        <Select />
                    </div>
                    <div style={{ padding: 10 }}>
                        <h3>List</h3>
                        <List />
                    </div>
                    <div style={{ padding: 10 }}>
                        <h3>Menu</h3>
                        <Menu />
                    </div>
                    <div style={{ padding: 10 }}>
                        <h3>Tree View</h3>
                        <TreeView />
                    </div>
                </StyledEngineProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
