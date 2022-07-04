import React from 'react';
import Card from './Card';
// import style from '../Styles/Cards.css'

export default function Cards() {

  let mock = [
    {
      id: 1,
      name: "lala",
      genre: ["genero1", "genero2"],
      image: "urlImagenlala"
    },
    {
      id: 2,
      name: "pepe",
      genre: ["genero3", "genero4"],
      image: "urlImagenpepe"
    }
]

  return (
    <div>
      {
        mock && mock?.map(elem=>
          <Card
            name= {elem.name}
            genre= {elem.genre}
            image= {elem.image}
            key= {elem.id}
          />
        )
      }
    </div>
  )
}
