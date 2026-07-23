import { useEffect, useState } from "react";
import {
    getMutualFundNews,
    getStockNews,
    getBusinessNews
} from "../services/newsService";

function News() {


    const [mutualNews, setMutualNews] = useState([]);
    const [stockNews, setStockNews] = useState([]);
    const [businessNews, setBusinessNews] = useState([]);

    useEffect(() => {

    async function loadNews() {

        const [
        mutual,
        stock,
        business
    ] = await Promise.all([
        getMutualFundNews(),
        getStockNews(),
        getBusinessNews()
    ]);

        setMutualNews(mutual);
        setStockNews(stock);
        setBusinessNews(business);
    }

    loadNews();

}, []);

    return (
        <div
            style={{
                padding: "40px"
            }}
        >
            <h1>
                Market Updates
            </h1>

            <>
    <h2>Mutual Fund News</h2>

    {
        mutualNews.map((article) => (
            <div
                key={article.uuid}
                style={{
                    background: "#111827",
                    padding: "20px",
                    marginTop: "20px",
                    borderRadius: "15px"
                }}
            >
                <h2>{article.title}</h2>

                <p>{article.description}</p>
            </div>
        ))
    }

    <h2
        style={{
            marginTop: "50px"
        }}
    >
        Stock Market News
    </h2>

    {
        stockNews.map((article) => (
            <div
                key={article.uuid}
                style={{
                    background: "#111827",
                    padding: "20px",
                    marginTop: "20px",
                    borderRadius: "15px"
                }}
            >
                <h2>{article.title}</h2>

                <p>{article.description}</p>
            </div>
        ))
    }

    <h2
        style={{
            marginTop: "50px"
        }}
    >
        Business News
    </h2>

    {
        businessNews.map((article) => (
            <div
                key={article.uuid}
                style={{
                    background: "#111827",
                    padding: "20px",
                    marginTop: "20px",
                    borderRadius: "15px"
                }}
            >
                <h2>{article.title}</h2>

                <p>{article.description}</p>
            </div>
        ))
    }
</>
        </div>
    );
}

export default News;