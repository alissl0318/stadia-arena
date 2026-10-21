import { cn } from "../lib/utils";
import styles from "./3d-button.module.css";

export const OkeyAuthButton = ({ onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (typeof window.toggleAuthDropdown === 'function') {
      window.toggleAuthDropdown();
    } else {
      const target = document.getElementById('auth-section') || document.getElementById('auth-bolumu');
      if (target) {
        if (window.lenis) {
          window.lenis.scrollTo(target, { duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button">
      <div className={styles.bg} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 342 208"
        height={208}
        width={342}
        className={styles.splash}
      >
        <path strokeLinecap="round" strokeWidth={3} d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362" />
        <path strokeLinecap="round" strokeWidth={3} d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893" />
        <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272" />
        <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449" />
        <path strokeLinecap="round" strokeWidth={3} d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998" />
        <path strokeLinecap="round" strokeWidth={3} d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976" />
        <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227" />
        <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924" />
        <path strokeLinecap="round" strokeWidth={3} d="M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998" />
        <path strokeLinecap="round" strokeWidth={3} d="M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976" />
        <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272" />
        <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.7159 174.449" />
      </svg>
      <div className={styles.wrap}>
        <div className={styles.outline} />
        <div className={styles.content}>
          <span className={cn(styles.char, styles["state-1"])}>
            <span data-label="G" style={{ "--i": 1 }}>G</span>
            <span data-label="İ" style={{ "--i": 2 }}>İ</span>
            <span data-label="R" style={{ "--i": 3 }}>R</span>
            <span data-label="İ" style={{ "--i": 4 }}>İ</span>
            <span style={{ "--i": 5 }} data-label="Ş">Ş</span>
            <span data-label=" " style={{ "--i": 6 }}>&nbsp;</span>
            <span data-label="Y" style={{ "--i": 7 }}>Y</span>
            <span data-label="A" style={{ "--i": 8 }}>A</span>
            <span data-label="P" style={{ "--i": 9 }}>P</span>
          </span>
          <div className={styles.icon}>
            <div />
          </div>
          <span className={cn(styles.char, styles["state-2"])}>
            <span data-label="K" style={{ "--i": 1 }}>K</span>
            <span data-label="A" style={{ "--i": 2 }}>A</span>
            <span data-label="Y" style={{ "--i": 3 }}>Y</span>
            <span data-label="D" style={{ "--i": 4 }}>D</span>
            <span data-label="O" style={{ "--i": 5 }}>O</span>
            <span data-label="L" style={{ "--i": 6 }}>L</span>
          </span>
        </div>
      </div>
    </button>
  );
};

export default OkeyAuthButton;
