import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';

export default function PopoverPopupState (props) {
    return (<PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (<div>
                    <Button size="small" color="primary" {...bindTrigger(popupState)}>
                        En savoir plus...
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top', horizontal: 'center',
                        }}
                        style={{maxWidth:700}}
                    >
                        <Box p={2}>
                            <Typography>{props.content}</Typography>
                        </Box>
                    </Popover>
                </div>)}
        </PopupState>);
}
