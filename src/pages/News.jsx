import { useEffect, useState } from "react";
import { getNews } from "../services/newsService";

function News() {

    const [news, setNews] = useState([]);

    useEffect(() => {

        async function loadNews() {

            const data = await getNews();

            setNews(data);
        }

        loadNews();

    }, []);

    return (
        <div
            style={{
                padding: "40px",
                maxWidth: "1000px",
                margin: "0 auto"
            }}
        >
            <h1
                style={{
                    marginBottom: "40px",
                    textAlign: "center"
                }}
            >
                Today's Top Headlines
            </h1>

            {
                news.map((article) => (

                    <div
                        key={article.uuid}
                        style={{
                            background: "#111827",
                            padding: "25px",
                            marginBottom: "25px",
                            borderRadius: "15px",
                            border: "1px solid #333"
                        }}
                    >
                        <h2
                            style={{
                                marginBottom: "15px"
                            }}
                        >
                            {article.title}
                        </h2>

                        <p
                            style={{
                                color: "#9CA3AF",
                                lineHeight: "1.7"
                            }}
                        >
                            {article.description}
                        </p>

                        <p
                            style={{
                                marginTop: "20px",
                                color: "#00C853",
                                fontSize: "14px"
                            }}
                        >
                            {
                                new Date(
                                    article.published_at
                                ).toLocaleDateString()
                            }
                        </p>
                    </div>
                ))
            }
        </div>
    );
}

export default News;