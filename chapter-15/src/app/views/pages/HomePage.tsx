import React from 'react';
import { Box, Container, Typography, useMediaQuery } from '@material-ui/core';
import Page from 'app/components/page';

const Main = () => {
  const mobileDevice = useMediaQuery('(max-width:650px)');

  return (
    <Page title="Home">
      <Container>
        <Box
          height={mobileDevice ? '50vh' : '100vh'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={mobileDevice ? 'h4' : 'h1'}>
            Welcome to Online Shop 🛍️
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default Main;
