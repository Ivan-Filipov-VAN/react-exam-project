import styles from './Footer.module.css';  

export const Footer = () => {
    return (
        <footer id={styles["footer"]}>
            <a className={styles["nav-link logo"]}   href="#"><h4>Travel</h4></a>
            <ul className={styles["contact-links"]} role="list">
                <li><a href="#">Tour packages</a></li>
                <li><a href="#">Personalized offers</a></li>
                <li><a href="#">Special deals</a></li>
                <li><a href="#">Summer holiday</a></li>
            </ul>
            <ul className={styles["contact-links"]} role="list">
                <li><a href="#">About us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Terms and conditions</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <div className={styles["follow"]}>
                <h3>Follow us on</h3>
                <ul role="list">
                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                </ul>
            </div>
        </footer>
    );
};