import { Box, Container } from '@mui/material';
import { FC } from 'react';

interface AppHeaderProps {
    user: {
        name: string;
        surname: string;
    };
}

const AppHeader: FC<AppHeaderProps> = () => {
    return (
        <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    )
};

export default AppHeader;