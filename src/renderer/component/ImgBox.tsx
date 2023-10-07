import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { DataURIToBlob, ICard, getCardFromBox } from 'renderer/utils';

interface ImgBoxProps {
  source: string;
  delImg: () => void;
  onChangeCard: (data: ICard[]) => void;
  takePhoto: () => void;
}

const TRUE_CARDS = 39;

export const ImgBox = React.memo(
  ({ source, delImg, onChangeCard, takePhoto }: ImgBoxProps) => {
    const [hand, setHand] = useState([]);
    const [err, setErr] = useState<any>(false);

    const getHand = useCallback(async (imgSource: any) => {
      console.log(imgSource.uri);
      let bodyFormData = new FormData();
      const file = DataURIToBlob(imgSource);
      bodyFormData.append('image_file', file, 'image.png');
      await axios({
        method: 'post',
        url: 'http://localhost:2327/detect-split4',
        // url: 'http://172.16.6.112:7860/img_object_detection_to_json',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(async function (response) {
          //handle success
          let newHand: ICard[] = [];
          const boxes = response.data.data.boxes;
          let minLength = boxes[0].length;
          for (const element of boxes) {
            if (element.length < minLength) minLength = element.length;
          }
          for (const element of boxes) {
            if (element.length <= minLength) continue;
            const tmp = getCardFromBox(element);
            newHand = newHand.concat(tmp);
          }

          setHand(newHand);
          onChangeCard(newHand);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          alert('Có lỗi xảy ra, vui lòng chụp lại ảnh!');
        });
    }, []);

    useEffect(() => {
      if (!source) {
        setHand([]);
        return;
      } else {
        getHand(source);
      }
    }, [source]);

    useEffect(() => {
      if (source) {
        setErr(`Phát hiện được ${hand.length} quân bài!`);
        setTimeout(() => setErr(false), 2000);
      }
    }, [hand]);

    return (
      <div
        className="boxImg"
        onClick={takePhoto}
        style={{
          borderColor: hand.length != TRUE_CARDS && source ? 'red' : 'white',
          borderWidth: 2,
        }}
      >
        {source ? <img src={source} style={styles.boxImg} /> : <Instruct />}
        {source ? <LineCross /> : <></>}
        {err && (
          //@ts-ignore
          <div style={styles.toast}>
            <b style={{ textAlign: 'center', color: 'yellow' }}>{err}</b>
          </div>
        )}
      </div>
    );
  }
);

const Instruct = () => {
  return (
    <kbd style={{ margin: '10px 10px 10px 10px', lineHeight: '25px' }}>
      Nhấn vào ô ảnh hoặc tổ hợp phím
      <kbd style={styles.btnKeyboard}>Alt</kbd>+
      <kbd style={styles.btnKeyboard}>Ctrl</kbd>+
      <kbd style={styles.btnKeyboard}>I</kbd>
      để chụp ảnh hand bài
    </kbd>
  );
};

const CardLabel = React.memo(({ card }: any) => {
  return (
    <span
      style={{
        margin: 2,
        color:
          card.label.includes('S') || card.label.includes('C')
            ? 'black'
            : 'red',
      }}
    >
      {card.txt}
    </span>
  );
});

const LineCross = React.memo(() => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: 2,
          height: '400px',
          top: 0,
          left: '199px',
          backgroundColor: 'red',
        }}
      />
      <div
        style={{
          position: 'absolute',
          height: 2,
          width: '400px',
          top: '199px',
          left: 0,
          backgroundColor: 'red',
        }}
      />
    </>
  );
});

export const HandDisplay = React.memo(({ hand1 }: any) => {
  return (
    <div className="label-container">
      <div style={{ width: '180px' }}>
        <div>
          {' '}
          {hand1.slice(0, 3).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
        <div>
          {' '}
          {hand1.slice(3, 8).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
        <div>
          {' '}
          {hand1.slice(8, 13).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
      </div>
      <div
        style={{
          width: 1,
          height: '80px',
          backgroundColor: hand1.length > 13 ? 'white' : 'transparent',
          marginRight: '5px',
        }}
      />
      <div style={{ width: '180px' }}>
        <div>
          {' '}
          {hand1.slice(13, 16).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
        <div>
          {' '}
          {hand1.slice(16, 21).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
        <div>
          {' '}
          {hand1.slice(21, 26).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
      </div>
      <div
        style={{
          width: 1,
          height: '80px',
          backgroundColor: hand1.length > 26 ? 'white' : 'transparent',
          marginRight: '5px',
        }}
      />
      <div style={{ width: '180px' }}>
        <div>
          {' '}
          {hand1.slice(26, 29).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
        <div>
          {' '}
          {hand1.slice(29, 34).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
        <div>
          {' '}
          {hand1.slice(34, 39).map((it: ICard) => (
            <CardLabel key={it.label} card={it} />
          ))}
        </div>
      </div>
    </div>
  );
});

const IMG_SIZE = 400;
const styles = {
  boxImg: { width: IMG_SIZE, height: IMG_SIZE, borderRadius: 10 },
  btnKeyboard: {
    backgroundColor: '#4a4a8c',
    padding: 4,
    borderRadius: 5,
    margin: 5,
  },
  toast: {
    width: '240px',
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '250px',
    left: '165px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
};
