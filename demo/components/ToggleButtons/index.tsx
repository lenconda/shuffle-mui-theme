import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            {
                [
                    'standard',
                    'primary',
                    'secondary',
                    'info',
                    'success',
                    'warning',
                    'error',
                ].map((color: any, index) => {
                    return <div key={color}>
                        {
                            index === 0 && (
                                <>
                                    <ToggleButtonGroup
                                        value={alignment}
                                        exclusive={true}
                                        color={color}
                                        size="small"
                                        onChange={handleAlignment}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton value="left" aria-label="left aligned">
                                            Option 1
                                        </ToggleButton>
                                        <ToggleButton value="center" aria-label="centered">
                                            Option 2
                                        </ToggleButton>
                                        <ToggleButton value="right" aria-label="right aligned">
                                            Option 3
                                        </ToggleButton>
                                        <ToggleButton value="justify" aria-label="justified" disabled>
                                            Option 4
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                    <br />
                                    <br />
                                </>
                            )
                        }

                        <ToggleButtonGroup
                            value={alignment}
                            exclusive={true}
                            color={color}
                            onChange={handleAlignment}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="left" aria-label="left aligned">
                                Option 1
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                Option 2
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
                                Option 3
                            </ToggleButton>
                            <ToggleButton value="justify" aria-label="justified" disabled>
                                Option 4
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <br />
                        <br />
                        {
                            index === 0 && (
                                <>
                                    <ToggleButtonGroup
                                        value={alignment}
                                        exclusive={true}
                                        color={color}
                                        size="large"
                                        onChange={handleAlignment}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton value="left" aria-label="left aligned">
                                            Option 1
                                        </ToggleButton>
                                        <ToggleButton value="center" aria-label="centered">
                                            Option 2
                                        </ToggleButton>
                                        <ToggleButton value="right" aria-label="right aligned">
                                            Option 3
                                        </ToggleButton>
                                        <ToggleButton value="justify" aria-label="justified" disabled>
                                            Option 4
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                    <br />
                                    <br />
                                </>
                            )
                        }
                    </div>;
                })
            }
        </>
    );
}
