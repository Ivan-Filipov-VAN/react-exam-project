import styles from '../HomePage/HomeNavigation.module.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


export const NavigationHome = () => {

    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <div className={styles['nav-main']}>
            <label className={styles['hamburger-menu']} htmlFor={styles['menu-toggle']}>
            
                <Link className={styles['nav-link']} to={'/'}>
                    <h4>Travel</h4>
                </Link>

                <input type="checkbox" id={styles['menu-toggle']} />
                
                    <i className={(`${styles['nav-icon']} fa-solid fa-bars`)}></i>

                    <nav className={styles['nav']}>
                        <ul className={styles["nav-items"]} role="list">
                            <li className={styles["nav-item"]}><Link to={'/catalog'} className={styles["nav-link"]} >Explore places</Link></li>

                            {!isAuthenticated && <>
                            <li className={styles["nav-item"]}><Link className={styles['nav-link']} to={'/login'}>Login</Link></li>
                            <li className={styles["nav-item"]}><Link className={styles['nav-link']} to={'/register'}>Register</Link></li>
                            </>}

                            {isAuthenticated && <>
                            <li className={styles["nav-item"]}><Link className={styles['nav-link']} to={'/create'}>Create Route</Link></li>
                            <li className={styles["nav-item"]}><Link className={styles['nav-link']} to={'/logout'}>Logout</Link></li>
                            <li className={styles["nav-item"]}><Link className={styles['nav-link']} to={'/profile'}>{userEmail}</Link></li>
                            </>}


                            <li className={styles["nav-item"]}><a className={styles['nav-link']} href="#">About</a></li>
                        </ul>
                    </nav>

            </label>
        </div >

    );
}