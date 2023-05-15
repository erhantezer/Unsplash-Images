

const Photo = ({
urls: {regular},
alt_description,
likes,
user: {
    name,
    portfolio_url,
    profile_image: { medium },
    location
},

}) => {
    return (
        <article className='photo'>
            <img className='photo-grid' src={regular} alt={alt_description} />
            <div className='photo-info'>
                <div>
                    <h4>{name}</h4>
                    <p>{likes} likes</p>
                    
                </div>
                <div>
                    <p>{location}</p>
                </div>
                <a href={portfolio_url}>
                    <img src={medium} alt='' className='user-img' />
                </a>
            </div>
        </article>
    )
}

export default Photo