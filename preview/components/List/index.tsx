import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

export default function NestedList() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Card style={{ width: 360 }}>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    boxSizing: 'border-box',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton>
                    <ListItemIcon>
                        <SendTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItemButton>
                <ListItemButton selected={true}>
                    <ListItemIcon>
                        <DraftsTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <MoveToInboxTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={open} unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Card>
    );
}
