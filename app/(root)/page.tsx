import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const Homepage = () => {
  return ( 
    <>
    <ProductList 
    data={sampleData.products}
    title="Newest arrival"
    limit={4}
    />
    </>
   );
}
 
export default Homepage;

// import ProductList from '@/components/shared/product/product-list';
// import {
//   getLatestProducts,
//   getFeaturedProducts,
// } from '@/lib/actions/product.actions';
// import ProductCarousel from '@/components/shared/product/product-carousel';
// import ViewAllProductsButton from '@/components/view-all-products-button';
// import IconBoxes from '@/components/icon-boxes';
// import DealCountdown from '@/components/deal-countdown';

// const Homepage = async () => {
//   const latestProducts = await getLatestProducts();
//   const featuredProducts = await getFeaturedProducts();

//   const mappedFeaturedProducts = featuredProducts.map(p => ({
//   ...p,
//   images: p.image ?? [], // rename dynamically
// }));

// const mappedLatestProducts = latestProducts.map(p => ({
//   ...p,
//   images: p.image ?? [], // rename dynamically
// }));



//   return (
//     <>
//       {featuredProducts.length > 0 && (
//         <ProductCarousel data={mappedFeaturedProducts} />
//       )}
//       <ProductList data={mappedLatestProducts} title='Newest Arrivals' limit={4} />
//       <ViewAllProductsButton />
//       <DealCountdown />
//       <IconBoxes />
//     </>
//   );
// };

// export default Homepage;