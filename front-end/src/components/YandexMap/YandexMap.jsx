import { useEffect, useState} from "react";
import style from "./YandexMap.module.css";
import init from "../YandexMap/ymaps";

const YandexMap = () => {
  useEffect(() => {
    window.ymaps.ready(init);
  }, []);
  return (
    <div id="map" className={style.ymap}> 

    </div>
  )
}

export default YandexMap;