'use client';
import styles from './page.module.css';
import Controller from '@/components/Controller';
import Playground from '@/components/Playground';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Home() {
  const isMobileDevice = useIsMobile();

  return (
    <main className={styles.main}>
      {isMobileDevice ? <Controller /> : <Playground />}
    </main>
  );
}
