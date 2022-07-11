import React from 'react';
import crashRunning from '../Images/crash-bandicoot-running.gif';
import loading from '../Images/loadingGears.gif';
import style from '../Styles/Loading.module.css';

export default function Loading() {
  return (
    <div className={style.content}>
      <img src={crashRunning} alt="crash running" />
      <img src={loading} alt="loading" />
    </div>
  );
}
