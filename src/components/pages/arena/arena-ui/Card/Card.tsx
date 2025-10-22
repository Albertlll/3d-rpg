'use client'

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import { cn } from "../../../../../lib/utils";

import heart from "./icons/heart-icon.png"
import shield from "./icons/shield-icon.png"
import sword from "./icons/sword-icon.png"
import bow from "./icons/bow-icon.png"

interface CardProps {
    className?: string,
}

const Card: React.FC<CardProps> = ({className}) => {

    const [isHovered, setIsHovered] = useState<boolean>(false);



    return (

    <motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} whileTap={{scale: 0.9}} whileHover={{ y: -150, scale: 1.2, zIndex: 10, rotate: -15}} className={ cn("w-[200px] h-[300px] relative rounded-[20px] border-slate-600 border-[2px] flex overflow-hidden bg-slate-500/30", className)}>


        <img src={bow} alt="character" className="  w-full h-full object-contain p-5" />


<AnimatePresence initial={false}>


        {
            isHovered &&

            // <motion.div className="w-full h-full absolute" exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>

                <motion.div className=" absolute left-auto right-0  h-full justify-around w-1/3 flex bg-black/70 flex-col" transition={{type: "tween"}} exit={{x: 300}} initial={{x: 300 }} animate={{x: 0}}>


                    <div className=" flex w-full gap-0.5 items-center flex-col">
                        <img alt="heart icon" src={heart} className="w-full px-2"/>

                        <div className=" text-white text-[15px]">
                            100
                        </div>
                    </div>




                    <div className=" flex w-full gap-0.5 items-center flex-col">
                    <img alt="shield icon" className="w-full px-2" src={shield}/>

                        <div className=" text-white text-[15px]">
                            100
                        </div>
                    </div>




                    <div className=" flex w-full gap-0.5 items-center flex-col">
                    <img alt="sword icon" className="w-full px-2" src={sword}/>

                        <div className=" text-white text-[15px]">
                            100
                        </div>
                    </div>



                        

                {/* </motion.div> */}



            </motion.div>





        }
</AnimatePresence>



    </motion.div>
    
);
}

export default Card;