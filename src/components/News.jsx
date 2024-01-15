import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

function News(props) {
    let [articles, setarticles] = useState([]);
    let [loading, setloading] = useState(true);
    let [page, setpage] = useState(1);
    let [totalResults, settotalResults] = useState(0);
    let capitalFirstLatter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(10);
        let url = `http://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parseData = await data.json();
        props.setProgress(70);
        setarticles(parseData.articles);
        settotalResults(parseData.totalResults);
        setloading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalFirstLatter(props.category)} - Free NewsApp`;
        updateNews();
        // eslint-disable-next-line
    }, []);
    let fetchMoreData = async () => {
        let url = `http://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setpage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setarticles(articles.concat(parseData.articles));
        settotalResults(parseData.totalResults);
    };
    return (
        <>
            <h1 className='text-center' style={{ marginTop: "90px" }}>NewsApp : Top {capitalFirstLatter(props.category)} Headlines</h1>
            {loading && <Spinner />};
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                scrollableTarget="row"
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title === null ? "" : element.title}
                                    description={element.description === null ? "" : element.description}
                                    imageUrl={element.urlToImage} newsUrl={element.url}
                                    author={element.author === null ? "Unknown" : element.author}
                                    date={element.publishedAt}
                                    source={element.source.name} alt="No pic" />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News
