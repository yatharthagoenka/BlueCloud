import { Box, Typography, List, Button, Drawer } from '@mui/material';
import img1 from 'src/assets/images/backgrounds/rocket.png';
import logo from 'src/assets/images/logos/bc-logo.png';
import { useLocation } from 'react-router';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import {IconAperture, IconLayoutDashboard, IconSettings, IconUser} from '@tabler/icons';
import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/user/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Files',
    icon: IconAperture,
    href: '/user/files',
  },
  {
    navlabel: true,
    subheader: 'INFO',
  },
  {
    id: uniqueId(),
    title: 'Profile',
    icon: IconUser,
    href: '/user/profile',
  },
  {
    id: uniqueId(),
    title: 'Setttings',
    icon: IconSettings,
    href: '/user/settings',
  },
];

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '220px',
  overflow: 'hidden',
  display: 'block',
}));

const Sidebar = (props) => {

  const { pathname } = useLocation();
  const pathDirect = pathname;
  const sidebarWidth = '270px';

    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Box px={3}>
              <LinkStyled to="/user">
                <img src={logo} height={90} />
              </LinkStyled>
            </Box>
            <Box>
              <Box sx={{ px: 3 }}>
                <List sx={{ pt: 0 }} className="sidebarNav">
                  {Menuitems.map((item) => {
                    if (item.subheader) {
                      return <NavGroup item={item} key={item.subheader} />;
                      
                    } else {
                      return (
                        <NavItem item={item} key={item.id} pathDirect={pathDirect} />
                        );
                      }
                    })}
                </List>
              </Box>
              <Box
                    display={'flex'}
                    alignItems="center"
                    gap={2}
                    sx={{ m: 3, p: 3, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
                >
                <>
                    <Box>
                        <Typography variant="h6" mb={1}>Unlimited storage</Typography>
                        <Button color="primary" target="_blank" variant="contained" aria-label="logout" size="small">
                            Upgrade
                        </Button>
                    </Box>
                    <Box mt="-35px">
                        <img alt="Remy Sharp" src={img1} width={100} />
                    </Box>
                </>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
};

export default Sidebar;
