import { NavigationHome } from '../Navigation/NavigationHome';
import styles from './HomeNavigation.module.css';
import { Link } from 'react-router-dom'; 
import { CatalogPage } from '../CatalogPage/CatalogPage';

export const HomePage = () => {

    return (
        <>
        <div className={styles["header-spacer"]}></div>
        <header className={styles["header"]}>

            <img className={styles["bg-img"]} src="images/landing-photo.jpg" alt='bg-home'/>

                <NavigationHome />

                <div className={styles["main__block"]}>
                    <h1 className={styles["main__title"]}>Book an exclusive</h1>
                    <h3 className={styles["main__sub-title"]}>home for your personal travel</h3>
                    <p className={styles["main__desc"]}>Each property is hand-picked,</p>
                    <p className={styles["main__desc"]}>personally visited and cannot be found elsewhere.</p>
                    <Link to={'/catalog'} className='btn-me main__btn'>Explore homes</Link>
                </div>

                

        </header>
        
        <CatalogPage  />
        </>
    );
};