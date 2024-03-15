// import { getRecords } from '@/lib/airtable';
// import { get } from 'http';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const Company = ({ company: any }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{company.Company}</h1>
//       {company}
//     </div>
//   );
// };

// export async function getServerSideProps({ params: any }) {
//   const { company } = params;

  
  
//   // Fetch data for the specific post using slug
//   let interactions = await getRecords("2024 Hiring Fair - Companies");
// //   const response = await fetch(`https://api.example.com/posts/${slug}`);
// //   const post = await response.json();

//   return {
//     props: { interactions },
//   };
// }

// export default Company;