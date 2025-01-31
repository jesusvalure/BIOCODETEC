export function DoctorCard ( {nombre, especialidad} ) {
    
    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                className= 'tw-followCard-avatar'
                alt= "El avatar de Pedrito" 
                src= {`https://unavatar.io/${fuente}/${userName}`} />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-infoUserName'> @{userName} </span>
                </div>
            </header>   

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    {text}
                </button>
            </aside>
        </article>
    )
}
