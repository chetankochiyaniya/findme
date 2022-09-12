import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
 const queryClient = new QueryClient()
 
 export default function App() {
   return (
     <QueryClientProvider client={queryClient}>
       <GetGeo />
     </QueryClientProvider>
   )
 }
 
 function GetGeo() {
   const { isLoading, error, data } = useQuery('geoData', () =>
     fetch('https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572').then(res =>
       res.json()
     )
   )
 
   if (isLoading) return <h1>Loading...</h1>
 
   if (error) return 'An error has occurred: ' + error.message
 
   return (
    <div className="row">
    <div className="col text-center">
        <h2>Find my IP and Location</h2>
        <p className="mt-3">

            <div className="row justify-content-center mt-3">
                <div className="col-lg-6 text-center text-dark">
                    {data && (
                        <ul className="list-group">
                            <li className="list-group-item">
                                Location :{" "}
                                {`${data.city}, ${data.country_name}(${data.country_code})`}
                            </li>
                            <li className="list-group-item">
                                IP: {data.IPv4}
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </p>
    </div>
</div>
   )
 }
