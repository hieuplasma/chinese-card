import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { ImgBox, HandDisplay } from './component/ImgBox';
import { ICard, randomCard, randomCard2, sortCards } from './utils';
import Container from './component/Container';

function CardDetector() {
  const [imgCrop1, setImgCrop1] = useState<any>(false);

  const [hand1, setHand1] = useState<ICard[]>([]);
  const [remain, setRemain] = useState<ICard[]>([]);

  const [currentImg, setCurrentImg] = useState<any>(false);

  useEffect(() => {
    setImgCrop1(currentImg);
  }, [currentImg]);

  useEffect(() => {
    window.electron.ipcRenderer.on('take-img', async function (args: any) {
      console.log('imgggg moi');
      setCurrentImg(args);
    });
  }, []);

  const takePhoto = useCallback(() => {
    window.electron.ipcRenderer.sendMessage('key-shortcut', [1]);
  }, []);

  const refresh = useCallback(() => {
    setImgCrop1(false);
    setHand1([]);
    setRemain([]);
  }, []);

  const deleteImg = useCallback(() => {
    setImgCrop1(false);
  }, []);

  const onDetectCard = useCallback(async (cards: ICard[]) => {
    setHand1(cards);
  }, []);

  useEffect(() => {
    async function name() {
      if (imgCrop1) {
        let remainCard = await randomCard(hand1);
        setRemain(sortCards(remainCard));
      }
    }
    name();
  }, [hand1]);

  const sort = useCallback(async () => {
    let remainCard = await randomCard(hand1);
    setRemain(sortCards(remainCard));
  }, [remain]);

  return (
    <div className="container">
      <div className="left-container">
        {hand1.length > 0 ? (
          <HandDisplay hand1={hand1} />
        ) : (
          <div
            style={{
              display: 'flex',
              width: '400px',
              height: '200px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '5px',
            }}
          >
            <b style={{ fontSize: 20, color: 'purple' }}>
              Chưa có quân bài nào được phát hiện!
            </b>
          </div>
        )}
        <ImgBox
          source={imgCrop1}
          delImg={deleteImg}
          onChangeCard={onDetectCard}
          takePhoto={takePhoto}
        />
      </div>

      <div className="right-container">
        <div className="remain-container">
          <Container id="container">
            {remain.map((it) => (
              <img draggable key={it.label} src={it.img} style={styles.card} />
            ))}
          </Container>
          {remain.length > 0 ? (
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 10,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button type="button" onClick={sort}>
                <span role="img" aria-label="folded hands">
                  〽️{' '}
                </span>
                Sắp xếp
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="Hello" style={{ marginTop: 30 }}>
          <button type="button" onClick={() => takePhoto()}>
            <span role="img" aria-label="books">
              📸{' '}
            </span>
            Chụp hand bài
          </button>
          <button type="button" onClick={refresh}>
            <span role="img" aria-label="folded hands">
              🔄{' '}
            </span>
            Ván mới
          </button>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 15,
          bottom: 30,
          width: '334px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ textAlign: 'center', fontSize: 14 }}>
          Cards Detector - ver:1.0.2 ---
        </span>
        <span style={{ textAlign: 'center', fontSize: 14 }}>
          ©2023 All right reserved
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardDetector />} />
      </Routes>
    </Router>
  );
}

const styles = {
  card: {
    width: '100.24px',
    height: '140.25px',
    margin: '3px',
    display: 'block'
  }
};
