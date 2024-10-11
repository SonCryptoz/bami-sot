import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { publicRoutes } from "@/routes";
import { DefaultLayout } from "@/layouts";

function App() {
    useEffect(() => {
        fetchAPI();
    }, []);
    const fetchAPI = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-products`);
        return res.data;
    };
    // const query = useQuery({ queryKey: ["todos"], queryFn: fetchAPI });
    // console.log(query);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
