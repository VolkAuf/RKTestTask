import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import CustomCheckbox from "../customCheckbox";
import CustomButton from "../customButton";
import { TheCatAPI } from "@thatapicompany/thecatapi";
const theCatAPI = new TheCatAPI(import.meta.env.API_KEY);

type TheCatApiImageRequest = {
  id: string;
  url: string;
  width: number;
  height: number;
} | null;

function CatContent() {
  const DELAY = 5000;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [canAutoRefresh, setCanAutoRefresh] = useState(false);
  const [catImageUrl, setCatImageUrl] = useState<TheCatApiImageRequest>(null);

  async function getRandomImage() {
    const image = await theCatAPI.images.getRandomImage({
      hasBreeds: true,
    });
    console.log(image);
    return image;
  }

  useEffect(() => {
    if (!canAutoRefresh) return;

    const interval = setInterval(() => {
      getRandomImage().then((img) => setCatImageUrl(img));
    }, DELAY);
    return () => clearInterval(interval);
  });

  const handleEnableCheckboxClick = (isCheck: boolean) => {
    setIsButtonDisabled(!isCheck);
  };
  const handleRefreshCheckboxClick = (isCheck: boolean) => {
    setCanAutoRefresh(isCheck);
  };

  const handleGenerateButtonClick = () => {
    getRandomImage().then((img) => setCatImageUrl(img));
  };

  return (
    <div className={styles.mainContainer}>
      <CustomCheckbox
        label="Enabled"
        defaultValue={true}
        onChange={handleEnableCheckboxClick}
      />
      <CustomCheckbox
        label="Auto-refresh every 5 seconds"
        defaultValue={false}
        onChange={handleRefreshCheckboxClick}
      />
      <div className={styles.bottomContainer}>
        <CustomButton
          disabled={isButtonDisabled}
          onClick={handleGenerateButtonClick}
        >
          Get cat
        </CustomButton>
        {catImageUrl && <img src={catImageUrl.url} alt="catImageUrl" />}
      </div>
    </div>
  );
}

export default CatContent;
