import Home from '../components/Home';
import Categories from "../components/categories";
import Cards from "../components/cards"
import Pagination from "../components/pagination"
const Page = async () => {
  // Server-side code here

  return (
    <div>
   
      <Home></Home> {/* Client Component */}
     <Categories />
        <Cards/>
       <Pagination/>  
    </div>
  );
};

export default Page;
