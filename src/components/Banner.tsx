import styles from "../styles/board.module.css";
import { useAppSelector } from "../libs/hooks";
import { selectIsGameOver } from "../libs/stores/gameStatus";

type Props = {
  recentlySunkShip?: string | undefined;
};

export default function Banner({ recentlySunkShip }: Props) {
  const gameOver = useAppSelector(selectIsGameOver);

  return (
    <>
      {recentlySunkShip ? (
        <div className={`${styles.messageBanner} ${styles.sunkBanner}`}>
          <h3>{`${recentlySunkShip} sunk!`}</h3>
        </div>
      ) : (
        gameOver && (
          <div className={`${styles.messageBanner} ${styles.gameOverBanner}`}>
            <h3>{"GAME OVER"}</h3>
          </div>
        )
      )}
    </>
  );
}
