import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, Link, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import NextLink from 'next/link';

export const OverviewFiles = (props) => {
  const { sx, fileCount } = props;

  return (
    <Card sx={sx}>
      <Link
        component={NextLink}
        href="/files"
        sx={{textDecoration: 'none', color: 'black'}}
      >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Your Files
            </Typography>
            <Typography variant="h4">
              {fileCount}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
      </Link>
    </Card>
  );
};