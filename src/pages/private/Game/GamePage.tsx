import { useNavigate, useParams } from "react-router-dom";
import styles from "./css/GamePage.module.css";
import { useState } from "react";
import ErrorBoundary from "../../../components/common/ErrorBoundary/ErrorBoundary";
import { AnimatePresence, cubicBezier, easeIn, motion } from "motion/react";
import { GameHeader } from "./components/GameHeader/GameHeader";
import { GameStats } from "./components/GameStats/GameStats";
import { GameTabs } from "./components/GameTabs/GameTabs";
import { AchievementGrid } from "./components/AchievementGrid/AchivmentGrid";
import type { Achievement } from "../../../models";

const customEase = cubicBezier(0.25, 0.46, 0.45, 0.94);
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: customEase,
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easeIn
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"achievements" | "stats">(
    "achievements"
  );
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const handleBack = () => {
    navigate('/library');
  };

  return (
    <ErrorBoundary fallback={<></>}>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        className={styles.gamePage}
      >
        <motion.div
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className={styles.gamePage__backButton}
          aria-label="Go back to library"
        >
          ← Back to Library
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className={styles.gamePage__content}
        >
          <GameHeader />

          <GameStats />

          <GameTabs />

          <AnimatePresence mode="wait">
            {activeTab === "achievements" && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AchievementGrid />
              </motion.div>
            )}

            {activeTab === "stats" && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.statsContent}>
                  <h3>Detailed Statistics</h3>
                  <p>Advanced game statistics will be displayed here.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {}
        </AnimatePresence>
      </motion.div>
    </ErrorBoundary>
  );
};
