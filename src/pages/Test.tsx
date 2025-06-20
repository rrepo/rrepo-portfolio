import { useRef, useEffect } from "react";
import "../styles/test.css";

export default function Test() {
  return (
    <>
      <div className="card-two-container">
        <figure className="card">
          <a className="card-image" href="https://solfuw.herokuapp.com/">
            <img
              src="https://i.gyazo.com/4dbc4b907018b6c9e669a97adb4e2d67.png"
              alt=""
            ></img>
          </a>
          <figcaption className="card-caption">
            <p className="card-caption-title">
              solfuwという不登校児向け掲示板サイトです。herokuの無料枠廃止に伴い終了しました。
            </p>
            <p className="card-caption-info">html/css/ruby/rails/mysql</p>
            <p className="card-caption-url"></p>
          </figcaption>
        </figure>

        <figure className="card">
          <a
            className="card-image"
            href="https://hanpencult.herokuapp.com/"
            data-size="980x668"
          >
            <img
              src="https://i.gyazo.com/ea4b8d6f96daf7f4b483203645e1288a.png"
              alt=""
            ></img>
          </a>
          <figcaption className="card-caption">
            <p className="card-caption-title">
              はんぺん教という架空の宗教サイトです。herokuの無料枠廃止に伴い終了しました。
            </p>
            <p className="card-caption-info">html/css/ruby/rails/mysql</p>
            <p className="card-caption-url"></p>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
