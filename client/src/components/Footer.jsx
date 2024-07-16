// footer component 

function Footer(){

    const icons = 
    [
        { name: 'fab fa-instagram icon', link: 'https://www.instagram.com/', color: '#E4405F' },
        { name: 'fab fa-facebook icon', link: 'https://www.facebook.com/', color: '#1877F2' },
        { name: 'fab fa-twitter icon', link: 'https://twitter.com/', color: '#1DA1F2' }
    ];

    return(
        <footer className='flex-row'>
            {icons.map(icon => (
                <a href={icon.link} key={icon.name} target="_blank" rel="noopener noreferrer">
                    <i className={`${icon.name} fa-1x`} style={{ color: icon.color }}></i>
                </a>
            ))}
        </footer>
    )
}

export default Footer;
