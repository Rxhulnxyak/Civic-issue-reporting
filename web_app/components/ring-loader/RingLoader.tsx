import styles from './RingLoader.module.css';

const RingLoader = () => (
  <div className={styles.loaderWrapper}>
    <svg className={styles.pl} viewBox="0 0 32 32" width="32px" height="32px">
      <clipPath id="ring-clip">
        <polygon points="0 0,32 0,32 32,0 32,0 30,14 16.1,0 16.1" />
      </clipPath>
      <g fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(90,16,16)">
        <g opacity="0.2">
          <circle r="3" cx="6.5" cy="16" strokeDasharray="14.737 4.712" />
          <circle r="9.5" cx="19" cy="16" clipPath="url(#ring-clip)" />
        </g>
        <g strokeLinecap="round">
          <circle className={styles.worm1} r="3" cx="6.5" cy="16" strokeDasharray="14.137 64.4" />
          <circle className={styles.worm2} r="9.5" cx="19" cy="16" strokeDasharray="14.137 64.4" strokeDashoffset="14.137" transform="rotate(180,19,16)" />
        </g>
      </g>
    </svg>
  </div>
);

export default RingLoader;
