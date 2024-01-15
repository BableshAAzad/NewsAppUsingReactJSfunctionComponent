import React from 'react'
import { Link } from 'react-router-dom';

function NewsItem(props) {
   let pic = require("./../picFolder/noPicture.jpg")
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <section style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </section>
                    <img src={imageUrl === null ? pic : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text" style={{ fontSize: "15px" }}><small className="text-muted">By: {author}, On: {new Date(date).toGMTString()}</small></p>
                        <Link to={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</Link>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
