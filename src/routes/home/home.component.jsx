import { Outlet } from 'react-router-dom';
import CategoryMenu from '../../components/category-menu/category-menu.component';

const Home = () => {
  return (
    <div>
        <Outlet/>
        <CategoryMenu/>
    </div>
  );
};

export default Home;
