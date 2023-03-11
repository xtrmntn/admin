import { FC, useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MdArtTrack, MdCategory, MdListAlt, MdShoppingCart,
} from 'react-icons/md';
import {
  Box, Grid, GridItem, Image,
} from '@chakra-ui/react';
import logo from '@/assets/img/logo.png';
import Sidebar from './Sidebar';
import Header from './Header';

const menu = [
  { text: 'Товары', link: '/products', icon: MdShoppingCart },
  { text: 'Категории', link: '/categories', icon: MdCategory },
  { text: 'Характеристики', link: '/properties', icon: MdArtTrack },
  { text: 'Заказы', link: '/orders', icon: MdListAlt },
];

const Layout: FC = () => {
  const location = useLocation();
  const title = useMemo(() => (
    menu.find((item) => location.pathname.includes(item.link))?.text
  ), [location]);

  return (
    <Grid
      gridTemplateColumns="200px 1fr"
      gridTemplateRows="auto 1fr"
      minHeight="100vh"
      columnGap="40px"
      rowGap="20px"
      padding="20px 30px"
    >
      <GridItem>
        <Link to="/">
          <Image src={logo} alt={import.meta.env.VITE_COMPANY_NAME} />
        </Link>
      </GridItem>

      <GridItem>
        <Header title={title} />
      </GridItem>

      <GridItem>
        <Sidebar items={menu} active={title} />
      </GridItem>

      <GridItem>
        <Box
          as="main"
          height="100%"
          backgroundColor="white"
          borderRadius="15px"
          padding="30px"
        >
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
