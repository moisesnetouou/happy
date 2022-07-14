/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import mapMarkerImg from '../assets/images/map-marker.svg';

import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import '../styles/pages/orphanage.css';
import { api } from "../services/api";
import { useParams } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  opening_on_weekends: string;
  images: [{
    id: number;
    url: string;
  }];
}

export function Orphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const {id} = useParams();

  useEffect(()=> {
    api.get(`orphanages/${id}`).then(response => {
      setOrphanage(response.data);

      console.log(response.data)
    })
  }, [id])

  if(!orphanage){
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  onClick={()=> {
                    setActiveImageIndex(index)
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>
              {orphanage.about}
            </p>

            <div className="map-container">
              <Map 
                interactive={false}
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
              >
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]}  />
              </Map>

              <footer>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank"
                  rel="noppener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>
              {orphanage.instructions}
            </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              
              {orphanage.opening_on_weekends 
                ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                ) 
                : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>
                )
              }
            </div>

            <PrimaryButton type="button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}