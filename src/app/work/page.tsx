import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import styles from './work.module.css';

export const metadata: Metadata = {
  title: 'Paul Harrer | Editing & Social Video Work',
  description: 'Selected short-form editing and storytelling work: pacing, hooks and platform-native cuts across cycling and athletics.',
};

export default function WorkPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.header}>
        <a href="/" className={styles.back}>&larr; Back to portfolio</a>
        <span className={styles.kicker}>Showreel</span>
        <h1 className={styles.title}>Editing, hooks &amp; short-form storytelling.</h1>
        <p className={styles.intro}>
          A selection of edits built to show the craft: spotting the moment, cutting for pace,
          writing the hook. The pieces below are self-initiated concept work &mdash; not
          commissioned by the brands or federations shown &mdash; built on real broadcast and
          archive footage to demonstrate how I&apos;d edit for their channels.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.wide}`}>
          <div className={`${styles.videoWrap} ${styles.vertical}`}>
            <video controls preload="metadata" playsInline>
              <source src="/work/ef-tdf-victory.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <span className={styles.cardTitle}>EF Pro Cycling &mdash; Tour de France stage win</span>
              <span className={styles.badge}>Concept &middot; spec work</span>
            </div>
            <p className={styles.cardText}>
              Post-stage interview cut into a vertical story arc: the raw reaction, the broadcast
              graphics, the finish-line embrace. Built from Tour de France footage to show how I&apos;d
              edit a WorldTour team&apos;s biggest moments for social.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.videoWrap}>
            <video controls preload="metadata" playsInline>
              <source src="/work/wa-hodgkinson.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <span className={styles.cardTitle}>World Athletics &mdash; Keely Hodgkinson</span>
              <span className={styles.badge}>Concept &middot; spec work</span>
            </div>
            <p className={styles.cardText}>
              A record-breaking 800m indoors, framed with the stat that makes it shareable: the
              record she beat was set the day she was born.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.videoWrap}>
            <video controls preload="metadata" playsInline>
              <source src="/work/wa-mclaughlin.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardTop}>
              <span className={styles.cardTitle}>World Athletics &mdash; Sydney McLaughlin-Levrone</span>
              <span className={styles.badge}>Concept &middot; spec work</span>
            </div>
            <p className={styles.cardText}>
              A 400m world title distilled to the one comparison that gives it scale: only a
              40-year-old world record has ever gone faster.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>
          More context on request &mdash; day rate, turnaround and full case studies available.
          Reach me at <a href="mailto:paulharrer@hotmail.com">paulharrer@hotmail.com</a>.
        </p>
      </div>
    </main>
  );
}
