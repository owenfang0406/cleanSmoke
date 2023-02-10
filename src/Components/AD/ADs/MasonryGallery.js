import React, { useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import styles from "./MasonryGallery.module.css";
import styled from '@emotion/styled'
import { BiChevronLeft, BiChevronRight } from"react-icons/bi";
import { IoMdClose } from "react-icons/io";

const ArrowLeft = styled.div`
  width: 30px;
  height: 30px;
  color: white;
  border-radius: 5px;
`
const images = [
  "https://picsum.photos/2000/2000",
  "https://picsum.photos/3000/2000",
  "https://picsum.photos/2000/1500",
  "https://picsum.photos/3000/1500",
  "https://picsum.photos/1000/2000",
  "https://picsum.photos/1500/2000",
  "https://picsum.photos/2000/2000",
  "https://picsum.photos/3000/2000",
  "https://picsum.photos/2000/1500",
  "https://picsum.photos/3000/1500",
  "https://picsum.photos/1000/2000",
  "https://picsum.photos/1500/2000",
]

function MasonryGallery() {
  const [data, setData] = useState({
    img: '',
    i: 0
  })
  const viewImage = (img, i) => {
    setData({img, i})
  }
  const imgAction = (action) => {
    let i = data.i;
    if (action === 'next-img') {
          setData({img: images[i  + 1], i: i + 1});
    }

    if (action === 'previous-img') {
          setData({img: images[i - 1], i: i - 1});
    }
    if (!action) {
          setData({img: '', i: 0});
    } 
  }

  
    return (

      <>
        {data.img &&
              <div 
              className={styles.mainCon}>
                <div className={styles.imgCon}>
                  <IoMdClose className={styles.closeBtn} onClick={() => imgAction()}></IoMdClose>
                  <BiChevronLeft className={styles.arrows} onClick={() => imgAction('previous-img')}>↼</BiChevronLeft>
                  <img src={data.img} className={styles.imgs}>
                  </img>
                  <BiChevronRight className={styles.arrows} onClick={() => imgAction('next-img')}></BiChevronRight>
                </div>
                <div className={styles.commentCon}>

                </div>
              </div>

        }

        <div className={styles.wrapper}>
          <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
          >
              <Masonry gutter='20px'>
                  {images.map((image, i) => (
                      <img
                          key={i}
                          src={image}
                          style={{width: "100%", display: "block", cursor: "pointer"}}
                          alt=""
                          onClick={()=> viewImage(image, i)}
                      />
                  ))}
              </Masonry>
          </ResponsiveMasonry>
        </div>
      </>
    )
}

export default MasonryGallery