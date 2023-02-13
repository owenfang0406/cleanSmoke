import React, { useEffect, useState, useRef } from 'react';
import styles from './PricingMenu.module.css';
import { AiOutlineDownload, AiOutlineLike } from "react-icons/ai";
import { RiShareForwardFill } from "react-icons/ri";
import { motion } from 'framer-motion';

function PricingMenu() {

    const [width, setWidth] = useState(0);
    const slider_wrapper = useRef();

    useEffect(() => {
        setWidth(slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth);
    }, [])
  return (
    <div className={styles.container}>
        <div className={styles.headings}>
            <h1 className={styles.h1s}>Moments of ups and downs</h1>
        </div>
        <motion.div className={styles.slider_wrapper} ref={slider_wrapper} whileTap={{cursor:"grabbing"}}>
            <motion.div className={styles.inner_carousel}
                drag="x"
                dragConstraints={{right:0, left:-width}}
            >

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>01</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card1.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>02</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card2.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>03</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card3.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>04</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card4.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>05</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card5.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>06</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card6.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>07</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card7.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>08</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card8.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>09</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card9.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

                <div className={styles.cards}>
                    <h2 className={styles.h2s}>10</h2>
                    <div className={styles.card_header}>
                        <div className={styles.title}>Birth</div>
                        <div className={styles.sub_title}>the advent of life</div>
                    </div>
                    <div className={styles.card_img}>
                        <img className={styles.imgs} src={require("./SliderImgs/Card10.JPG")}></img>
                    </div>
                    <div className={styles.card_footer}>
                        <AiOutlineDownload className={`${styles.fa} ${styles.fa_download}`}/>
                        <AiOutlineLike className={`${styles.fa} ${styles.fa_heart}`}></AiOutlineLike>
                        <RiShareForwardFill className={`${styles.fa} ${styles.fa_share}`}></RiShareForwardFill>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    </div>
  )
}

export default PricingMenu