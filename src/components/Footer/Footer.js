import { Link } from 'react-router-dom'; 

import styles from './Footer.module.css';  

export const Footer = () => {
    return (
        <footer id={styles["footer"]}>
            <Link to={'/'} className={styles["nav-link logo"]}><h4>Travel</h4></Link>
            <ul className={styles["contact-links"]} role="list">
                <li><Link to={'/'}>Tour packages</Link></li>
                <li><Link to={'/'}>Personalized offers</Link></li>
                <li><Link to={'/'}>Special deals</Link></li>
                <li><Link to={'/'}>Summer holiday</Link></li>
            </ul>
            <ul className={styles["contact-links"]} role="list">
                <li><Link to={'/'}>About us</Link></li>
                <li><Link to={'/'}>FAQ</Link></li>
                <li><Link to={'/'}>Terms and conditions</Link></li>
                <li><Link to={'/'}>Contact</Link></li>
            </ul>
            <div className={styles["follow"]}>
                <h3>Follow us on</h3>
                <ul role="list">
                    <li><Link to={'/'}><i className="fa-brands fa-instagram"></i></Link></li>
                    <li><Link to={'/'}><i className="fa-brands fa-facebook-f"></i></Link></li>
                    <li><Link to={'/'}><i className="fa-brands fa-twitter"></i></Link></li>
                </ul>
            </div>
        </footer>
    );
};